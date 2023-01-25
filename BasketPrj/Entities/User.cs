using Microsoft.AspNetCore.Identity;

namespace BasketPrj.Entities
{
  public class User : IdentityUser<int>
  {
    public UserAddress Address { get; set; }
  }
}