


namespace API.CommonLayer.Zaba
{
  public class DeleteZabaRequest
  {
    public string Referencija { get; set; }
  }

  public class DeleteZabaResponse
  {
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
  }
}
