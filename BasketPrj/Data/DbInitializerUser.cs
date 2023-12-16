using System.Linq;
using System.Threading.Tasks;
using BasketPrj.Entities;
using Microsoft.AspNetCore.Identity;

namespace BasketPrj.Data
{
  public static class DbInitializerUser
  {
    public static async Task Initialize(UserManager<User> userManager)
    {

      // user  for test
      if (!userManager.Users.Any())
      {
        var user = new User
        {
          UserName = "bob",
          Email = "bob@test.com"
        };
        await userManager.CreateAsync(user, "Pa$$w0rd");
        await userManager.AddToRoleAsync(user, "Member");

        var userA = new User
        {
          UserName = "max",
          Email = "max@test.com"
        };
        await userManager.CreateAsync(userA, "Pa$$w0rd");
        await userManager.AddToRoleAsync(userA, "Member");

        // user Admin
        var admin = new User
        {
          UserName = "admin",
          Email = "admin@test.com"
        };
        await userManager.CreateAsync(admin, "Pa$$w0rd");
        // dodaje Admina u Role
        await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
      }
    }
  }
}