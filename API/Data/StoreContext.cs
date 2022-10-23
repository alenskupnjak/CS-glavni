﻿
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : DbContext
  {
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> ProductsTBL { get; set; }
    public DbSet<Basket> BasketsTBL { get; set; }
  }
}