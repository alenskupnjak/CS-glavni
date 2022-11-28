using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
    {
      _imageService = imageService;
      _mapper = mapper;
      _context = context;
    }

    [HttpGet]
    // podaci dolaze u formi promjena format unosa Swagger-a
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

    [HttpGet("{id}", Name = "GetProduct")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _context.ProductsTBL.FindAsync(id);

      if (product == null) return NotFound();

      return product;
    }

    // FILTER 
    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
      var brands = await _context.ProductsTBL.Select(p => p.Brand).Distinct().ToListAsync();
      var types = await _context.ProductsTBL.Select(p => p.Type).Distinct().ToListAsync();

      return Ok(new { brands, types });
    }

    // CREATE CREATE CREATE CREATE CREATE CREATE
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
    {
      //  productDto --->Product
      var product = _mapper.Map<Product>(productDto);

      if (productDto.File != null)
      {
        var imageResult = await _imageService.AddImageAsync(productDto.File);
        if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
        product.PictureUrl = imageResult.SecureUrl.ToString();
        product.PublicId = imageResult.PublicId;
      }

      _context.ProductsTBL.Add(product);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

      return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
    }


    // UPDATE UPDATE UPDATE UPDATE
    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto productDto)
    {
      var product = await _context.ProductsTBL.FindAsync(productDto.Id);

      if (product == null) return NotFound();

      _mapper.Map(productDto, product);

      if (productDto.File != null)
      {
        var imageResult = await _imageService.AddImageAsync(productDto.File);
        if (imageResult.Error != null)
          return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
        if (!string.IsNullOrEmpty(product.PublicId))
          await _imageService.DeleteImageAsync(product.PublicId);
        product.PictureUrl = imageResult.SecureUrl.ToString();
        product.PublicId = imageResult.PublicId;
      }

      var result = await _context.SaveChangesAsync() > 0;
      if (result) return Ok(product);
      return BadRequest(new ProblemDetails { Title = "Problem updating product" });
    }

    // DELETE DELETE DELETE
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
      var product = await _context.ProductsTBL.FindAsync(id);

      if (product == null) return NotFound();

      if (!string.IsNullOrEmpty(product.PublicId))
        await _imageService.DeleteImageAsync(product.PublicId);

      _context.ProductsTBL.Remove(product);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return Ok();

      return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
    }

  }
}