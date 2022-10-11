using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace API
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();
      // koristenje usinga cistimo memoriju....
      using var scope = host.Services.CreateScope();
      var context = scope.ServiceProvider.GetRequiredService<StoreContext>();

      // za greške, socificira se naziv klase vezano za gresku...
      var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
      try
      {
        context.Database.Migrate();
        DbInitializer.Initialize(context);
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Problem migrating data. Nesto nije u redu.");
      }

      host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
