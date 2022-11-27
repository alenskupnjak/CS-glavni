namespace API.Entities
{
  public class Product
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public long Price { get; set; }
    public string PictureUrl { get; set; }
    public string Type { get; set; }
    public string Brand { get; set; }
    public int QuantityInStock { get; set; }

    // Cloudinary daje ovaj ID
    // zbog ovog dodatka moramo obrisati i kreirati bazu ponovno
    public string PublicId { get; set; }

  }
}