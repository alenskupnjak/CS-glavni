using System;
using System.Collections.Generic;

namespace API.CommonLayer.Zaba
{
  public class ZabaReadRequest
  {
    public int RecordPerPage { get; set; }
    public int PageNumber { get; set; }
  }

  public class ZabaReadResponse
  {
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public int CurrentPage { get; set; }
    public double TotalRecords { get; set; }
    public int TotalPages { get; set; }
    public List<ZabaReadRecord> ZabaReadRecord { get; set; }
    public object NewData { get; set; }
  }

  public class ZabaReadRecord
  {
    public DateTime Datum { get; set; }
    public string Referencija { get; set; }
    public string Opis { get; set; }

    //The float data type in SQL maps to the double type in C#. !!!!!!!
    public double Uplata { get; set; }
    public double Isplata { get; set; }
    public string Kategorija { get; set; }
  }
}
