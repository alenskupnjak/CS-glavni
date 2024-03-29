﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BasketPrj.Data;
using API.DTOs;
using API.Extensions;
using BasketPrj.DTOs;
using BasketPrj.Entities;
using BasketPrj.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class OrdersController : ControllerBase
  {
    private readonly StoreContext _context;
    public OrdersController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
      return await _context.OrdersTBL
         //.Include(o => o.OrderItems)
         .ProjectOrderToOrderDto()
         .Where(x => x.BuyerId == User.Identity.Name)
         .ToListAsync();
    }

    [HttpGet("{id}", Name = "GetOrder")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
      return await _context.OrdersTBL
          //.Include(o => o.OrderItems)
          .ProjectOrderToOrderDto()
          .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
          .FirstOrDefaultAsync();
    }

    // kreiram Narudbu
    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
    {
      var basket = await _context.BasketsTBL
          .RetrieveBasketWithItems(User.Identity.Name)
          .FirstOrDefaultAsync();

      if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });

      // kreiram praznu listu
      var items = new List<OrderItem>();

      foreach (var item in basket.Items)
      {
        var productItem = await _context.ProductsTBL.FindAsync(item.ProductId);
        var itemOrdered = new ProductItemOrdered
        {
          ProductId = productItem.Id,
          Name = productItem.Name,
          PictureUrl = productItem.PictureUrl
        };

        var orderItem = new OrderItem
        {
          ItemOrdered = itemOrdered,
          Price = productItem.Price,
          Quantity = item.Quantity
        };
        items.Add(orderItem);
        productItem.QuantityInStock -= item.Quantity;
      }

      var subtotal = items.Sum(item => item.Price * item.Quantity);
      var deliveryFee = subtotal > 10000 ? 0 : 500;

      var order = new Order
      {
        OrderItems = items,
        BuyerId = User.Identity.Name,
        ShippingAddress = orderDto.ShippingAddress,
        Subtotal = subtotal,
        DeliveryFee = deliveryFee,
        PaymentIntentId = basket.PaymentIntentId
      };

      _context.OrdersTBL.Add(order);
      _context.BasketsTBL.Remove(basket);

      if (orderDto.SaveAddress)
      {
        var user = await _context.Users
            .Include(a => a.Address)
            .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

        var address = new UserAddress
        {
          FullName = orderDto.ShippingAddress.FullName,
          Address1 = orderDto.ShippingAddress.Address1,
          Address2 = orderDto.ShippingAddress.Address2,
          City = orderDto.ShippingAddress.City,
          State = orderDto.ShippingAddress.State,
          Zip = orderDto.ShippingAddress.Zip,
          Country = orderDto.ShippingAddress.Country
        };
        user.Address = address;

        // nepotrabno
        //_context.Update(user);
      }


      var result = await _context.SaveChangesAsync() > 0;

      if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

      return BadRequest(new ProblemDetails { Title = "Problem creating order" });
    }
  }
}