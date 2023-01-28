using System;
using System.Linq;
using System.Threading.Tasks;
using BasketPrj.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using BasketPrj.DTOs;
using BasketPrj.Entities;

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
      var basket = await RetrieveBasket(GetBuyerId());

      if (basket == null) return NotFound();

      // extension primjer  API.Extensions
      return basket.MapBasketToDto();
    }

    // POST POST POST POST
    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
      var basket = await RetrieveBasket(GetBuyerId());

      if (basket == null) basket = CreateBasket();

      var product = await _context.ProductsTBL.FindAsync(productId);

      if (product == null) return NotFound();

      basket.AddItem(product, quantity);

      var result = await _context.SaveChangesAsync() > 0;

      //if (result) return StatusCode(201);

      if (result) return CreatedAtRoute("GetBasket", MapBasketToDtoLOCAL(basket));

      return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    /// DELETE
    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      var basket = await RetrieveBasket(GetBuyerId());

      if (basket == null) return NotFound();

      basket.RemoveItem(productId, quantity);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return Ok();

      return BadRequest(new ProblemDetails { Title = "Problem BRISANJA item from the basket" });
    }

    private async Task<Basket> RetrieveBasket(string buyerId)
    {
      if (string.IsNullOrEmpty(buyerId))
      {
        Response.Cookies.Delete("buyerId");
        return null;
      }

      return await _context.BasketsTBL
          .Include(i => i.Items)
          .ThenInclude(p => p.Product)
          .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }

    private Basket CreateBasket()
    {
      var buyerId = User.Identity?.Name;
      if (string.IsNullOrEmpty(buyerId))
      {
        buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
      }
      var basket = new Basket { BuyerId = buyerId };
      _context.BasketsTBL.Add(basket);
      return basket;
    }

    // identicna funkcija ovo je lokalna za primjer...
    private BasketDto MapBasketToDtoLOCAL(Basket basket)
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

    private string GetBuyerId()
    {
      return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }
  }
}