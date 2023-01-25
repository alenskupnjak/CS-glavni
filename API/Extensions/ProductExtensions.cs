using System.Collections.Generic;
using System.Linq;
using BasketPrj.Entities;

namespace API.Extensions
{
  public static class ProductExtensions
  {
    // SORT SORT SORT
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
    {
      // ako je orderBy prazan
      if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);
      query = orderBy switch
      {
        "price" => query.OrderBy(p => p.Price),
        "priceDesc" => query.OrderByDescending(p => p.Price),
        // ako nema 'price' niti 'priceDesc' onda sortira po 'Name'
        _ => query.OrderBy(p => p.Name)
      };

      return query;
    }

    // SEARCH SEARCH SEARCH
    public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
    {
      if (string.IsNullOrEmpty(searchTerm)) return query;

      var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

      return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    // FILTER FILTER FILTER
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
    {
      var brandList = new List<string>();
      var typeList = new List<string>();

      if (!string.IsNullOrEmpty(brands))
        brandList.AddRange(brands.ToLower().Split(",").ToList());

      if (!string.IsNullOrEmpty(types))
        typeList.AddRange(types.ToLower().Split(",").ToList());

      if (brands != "All")
        query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));

      if (types != "All")
        query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

      return query;
    }
  }
}