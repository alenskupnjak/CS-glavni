
using BasketPrj.Entities;
using BasketPrj.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : IdentityDbContext<User, Role, int>
  {
    public StoreContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Product> ProductsTBL { get; set; }
    public DbSet<Basket> BasketsTBL { get; set; }
    public DbSet<Order> OrdersTBL { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<User>()
        .HasOne(a => a.Address)
        .WithOne()
        .HasForeignKey<UserAddress>(a => a.Id)
        .OnDelete(DeleteBehavior.Cascade);


      // Dodaje Role na bazu....
      builder.Entity<Role>()
          .HasData(
              new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
              new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
          );
    }
  }
}