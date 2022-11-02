
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : IdentityDbContext<User>
  {
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> ProductsTBL { get; set; }
    public DbSet<Basket> BasketsTBL { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);


      // Dodaje Role na bazu....
      builder.Entity<IdentityRole>()
          .HasData(
              new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
              new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
          );
    }
  }
}