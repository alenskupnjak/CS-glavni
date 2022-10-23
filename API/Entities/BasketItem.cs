using System.ComponentModel.DataAnnotations.Schema;
namespace API.Entities
{
  [Table("BasketItems")]
  public class BasketItem
  {
    public int Id { get; set; }
    public int Quantity { get; set; }
    // navigation properties
    public int ProductId { get; set; }
    public Product Product { get; set; }


    //Relationships
    // https://learn.microsoft.com/en-us/ef/core/modeling/relationships?tabs=fluent-api%2Cfluent-api-simple-key%2Csimple-key
    public int BasketId { get; set; }
    public Basket Basket { get; set; }
  }
}