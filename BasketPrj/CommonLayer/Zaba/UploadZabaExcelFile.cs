using Microsoft.AspNetCore.Http;
using System;

namespace BasketPrj.CommonLayer.Zaba
{
  public class ExcelZabaRequest
  {
    public IFormFile File { get; set; }
  }

  public class ExcelZabaResponse
  {
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public object NewData { get; set; }
    public object Dupli { get; set; }
  }

  public class UploadZabaParameter
  {
    public DateTime Datum { get; set; }
    public string Referencija { get; set; }
    public string Opis { get; set; }
    public float Uplata { get; set; }
    public float Isplata { get; set; }
    public string Kategorija { get; set; }

  }
}
