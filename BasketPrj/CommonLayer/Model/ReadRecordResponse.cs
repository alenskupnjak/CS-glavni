using System.Collections.Generic;

namespace BasketPrj.CommonLayer.Model
{
  public class ReadRequest
  {
    public int RecordPerPage { get; set; }
    public int PageNumber { get; set; }
  }

  public class ReadResponse
  {
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public int CurrentPage { get; set; }
    public double TotalRecords { get; set; }
    public int TotalPages { get; set; }
    public List<ReadRecord> ReadRecord { get; set; }
  }

  public class ReadRecord
  {
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string EmailID { get; set; }
    public string MobileNumber { get; set; }
    public int Age { get; set; }
    public int Salary { get; set; }
    public string Gender { get; set; }
  }
}
