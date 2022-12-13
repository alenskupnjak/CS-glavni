using API.CommonLayer.Model;
using System.Threading.Tasks;


namespace API.DataAccessLayer
{
  public interface IUploadFileDL
  {
    public Task<ExcelResponse> UploadExcelFile(ExcelRequest request, string Path);
    public Task<CSVFileResponse> UploadCSVFile(CSVFileRequest request, string Path);
    public Task<ReadResponse> ReadRecord(ReadRequest request);
    public Task<DeleteResponse> DeleteRecord(DeleteRequest request);
  }
}
