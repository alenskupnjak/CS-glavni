using API.CommonLayer.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using API.DataAccessLayer;
using API.CommonLayer.Zaba;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UploadFileController : ControllerBase
  {
    public readonly IUploadFileDL _uploadFileDL;
    public UploadFileController(IUploadFileDL uploadFileDL)
    {
      _uploadFileDL = uploadFileDL;
    }

    //
    // UPLOAD EXCEL
    [HttpPost]
    [Route("UploadExcelFile")]
    public async Task<IActionResult> UploadExcelFile([FromForm] ExcelRequest request)
    {
      ExcelResponse response = new ExcelResponse();
      string path = "UploadFileFolder/" + request.File.FileName;
      try
      {
        using (FileStream stream = new FileStream(path, FileMode.CreateNew))
        {
          await request.File.CopyToAsync(stream);
        }
        response = await _uploadFileDL.UploadExcelFile(request, path);
        string[] files = Directory.GetFiles("UploadFileFolder/");
        foreach (string file in files)
        {
          System.IO.File.Delete(file);
          Console.WriteLine($"{file} is deleted.");
        }
      }
      catch (Exception ex)
      {
        response.IsSuccess = false;
        response.Message = ex.Message;
      }
      return Ok(response);
    }

    //
    // Upload CVS
    [HttpPost]
    [Route("UploadCSVFile")]
    public async Task<IActionResult> UploadCSVFile([FromForm] CSVFileRequest request)
    {
      CSVFileResponse response = new CSVFileResponse();
      string path = "UploadFileFolder/" + request.File.FileName;
      try
      {
        using (FileStream stream = new FileStream(path, FileMode.CreateNew))
        {
          await request.File.CopyToAsync(stream);
        }
        response = await _uploadFileDL.UploadCSVFile(request, path);
        string[] files = Directory.GetFiles("UploadFileFolder/");
        foreach (string file in files)
        {
          System.IO.File.Delete(file);
          Console.WriteLine($"{file} is deleted.");
        }
      }
      catch (Exception ex)
      {
        response.IsSuccess = false;
        response.Message = ex.Message;
        response.Poruka = "Napredijem";
      }
      return Ok(response);
    }

    //
    // Upload ZabaFile
    [HttpPost]
    [Route("UploadZabaFile")]
    public async Task<IActionResult> UploadZabaFile([FromForm] ExcelZabaRequest request)
    {
      ExcelZabaResponse response = new ExcelZabaResponse();
      string path = "UploadFileFolder/" + request.File.FileName;
      try
      {
        using (FileStream stream = new FileStream(path, FileMode.CreateNew))
        {
          await request.File.CopyToAsync(stream);
        }
        response = await _uploadFileDL.UploadZabaFile(request, path);
        string[] files = Directory.GetFiles("UploadFileFolder/");
        foreach (string file in files)
        {
          System.IO.File.Delete(file);
          Console.WriteLine($"{file} is deleted.");
        }
      }
      catch (Exception ex)
      {
        response.IsSuccess = false;
        response.Message = ex.Message;
      }
      return Ok(response);
    }


    //
    // READ READ READ record..
    [HttpPost]
    [Route("ReadRecord")]
    public async Task<IActionResult> ReadRecord(ReadRequest request)
    {
      ReadResponse response = new ReadResponse();
      try
      {
        response = await _uploadFileDL.ReadRecord(request);
      }
      catch (Exception ex)
      {
        response.IsSuccess = false;
        response.Message = ex.Message;
      }
      return Ok(response);
    }

    ///
    // DELETE CVS DELETE CVS DELETE CVS
    [HttpDelete]
    [Route("DeleteRecord")]
    public async Task<IActionResult> DeleteRecord(DeleteRequest request)
    {
      DeleteResponse response = new DeleteResponse();
      try
      {
        response = await _uploadFileDL.DeleteRecord(request);
      }
      catch (Exception ex)
      {
        response.IsSuccess = false;
        response.Message = ex.Message;
      }
      return Ok(response);
    }

    //
    // READ READ READ record..
    [HttpPost]
    [Route("ReadZaba")]
    public async Task<IActionResult> ReadZaba(ZabaReadRequest request)
    {
      ZabaReadResponse response = new();
      try
      {
        response = await _uploadFileDL.ReadZaba(request);
      }
      catch (Exception ex)
      {
        response.IsSuccess = false;
        response.Message = ex.Message;
      }
      return Ok(response);
    }

    ///
    // DELETE ZABA DELETE ZABA DELETE ZABA
    [HttpDelete]
    [Route("DeleteZabaRecord")]
    public async Task<IActionResult> DeleteZabaRecord(DeleteZabaRequest request)
    {
      DeleteZabaResponse response = new DeleteZabaResponse();
      try
      {
        response = await _uploadFileDL.DeleteZabaRecord(request);
      }
      catch (Exception ex)
      {
        response.IsSuccess = false;
        response.Message = ex.Message;
      }
      return Ok(response);
    }
  }
}
