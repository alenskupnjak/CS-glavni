﻿using Microsoft.AspNetCore.Http;

namespace API.CommonLayer.Model
{
  public class ExcelRequest
  {
    public IFormFile File { get; set; }
  }

  public class ExcelResponse
  {
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
  }

  public class UploadParameter
  {
    public string UserName { get; set; }
    public string EmailID { get; set; }
    public string MobileNumber { get; set; }
    public int Age { get; set; }
    public int Salary { get; set; }
    public string Gender { get; set; }
  }
}
