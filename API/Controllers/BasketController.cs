﻿using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController : BaseApiController
  {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
      var basket = await RetrieveBasket();

      if (basket == null) return NotFound();

      return MapBasketToDto(basket);
    }

    // POST POST
    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
      var basket = await RetrieveBasket();

      if (basket == null) basket = CreateBasket();

      var product = await _context.ProductsTBL.FindAsync(productId);

      if (product == null) return NotFound();

      basket.AddItem(product, quantity);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return StatusCode(201);

      if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

      return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    /// DELETE
    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      var basket = await RetrieveBasket();

      if (basket == null) return NotFound();

      basket.RemoveItem(productId, quantity);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return Ok();

      return BadRequest(new ProblemDetails { Title = "Problem BRISANJA item from the basket" });
    }

    private async Task<Basket> RetrieveBasket()
    {
      return await _context.BasketsTBL
          .Include(i => i.Items)
          .ThenInclude(p => p.Product)
          .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
    }

    private Basket CreateBasket()
    {
      var buyerId = Guid.NewGuid().ToString();
      var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
      Response.Cookies.Append("buyerId", buyerId, cookieOptions);
      var basket = new Basket { BuyerId = buyerId };
      _context.BasketsTBL.Add(basket);
      return basket;
    }

    private BasketDto MapBasketToDto(Basket basket)
    {
      return new BasketDto
      {
        Id = basket.Id,
        BuyerId = basket.BuyerId,
        Items = basket.Items.Select(item => new BasketItemDto
        {
          ProductId = item.ProductId,
          Name = item.Product.Name,
          Price = item.Product.Price,
          PictureUrl = item.Product.PictureUrl,
          Type = item.Product.Type,
          Brand = item.Product.Brand,
          Quantity = item.Quantity
        }).ToList()
      };
    }
  }
}