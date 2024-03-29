using BasketPrj.Data;
using BasketPrj.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace API
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();
      // koristenje usinga cistimo memoriju....
      using var scope = host.Services.CreateScope();
      var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
      var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

      // za gre�ke, socificira se naziv klase vezano za gresku...
      var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
      try
      {
        await context.Database.MigrateAsync();
        await DbInitializer.Initialize(context);
        await DbInitializerUser.Initialize(userManager);
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Problem migrating data. Nesto nije u redu.");
      }

      await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
      //https://www.youtube.com/watch?v=ydR2jd3ZaEA&list=PL6n9fhu94yhVkdrusLaQsfERmL_Jh4XmU&index=6&ab_channel=kudvenkat
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
