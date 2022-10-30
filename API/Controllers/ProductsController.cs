using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
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
    public async Task<ActionResult<List<Product>>> GetProducts(string orderBy, string searchTerm)
    {
      // ovo vraca onako kako je u bazi bez sortiranja
      //return await _context.ProductsTBL.ToListAsync();

      var query = _context.ProductsTBL
        .Sort(orderBy)
        .Search(searchTerm)
        .AsQueryable();

      //query = orderBy switch
      //{
      //  "price" => query.OrderBy(p => p.Price),
      //  "priceDesc" => query.OrderByDescending(p => p.Price),
      //  _ => query.OrderBy(p => p.Name)
      //};

      return await query.ToListAsync();
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