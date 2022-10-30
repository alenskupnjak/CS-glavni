using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;
    public ProductsController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
    {
      // ovo vraca sve podatke je u bazi bez sortiranja
      //return await _context.ProductsTBL.ToListAsync();

      var query = _context.ProductsTBL
        .Sort(productParams.OrderBy)
        .Search(productParams.SearchTerm)
        .Filter(productParams.Brands, productParams.Types)
        .AsQueryable();

      //query = orderBy switch
      //{
      //  "price" => query.OrderBy(p => p.Price),
      //  "priceDesc" => query.OrderByDescending(p => p.Price),
      //  _ => query.OrderBy(p => p.Name)
      //};

      //return await query.ToListAsync();

      var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);



      //Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));

      Response.AddPaginationHeader(products.MetaData);

      return products;


    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _context.ProductsTBL.FindAsync(id);

      if (product == null) return NotFound();

      return product;
    }
  }
}