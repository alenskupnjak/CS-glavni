
namespace API.Data
{
  public class StoreContext : Microsoft.EntityFrameworkCore.DbContext
  {
    public StoreContext(Microsoft.EntityFrameworkCore.DbContextOptions options) : base(options)
    {
    }

    public Microsoft.EntityFrameworkCore.DbSet<API.Entities.Product> ProductsTBL { get; set; }
  }
}