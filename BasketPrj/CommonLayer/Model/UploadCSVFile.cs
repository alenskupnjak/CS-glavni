using Microsoft.AspNetCore.Http;

namespace BasketPrj.CommonLayer.Model
{
	public class CSVFileRequest
	{
		public IFormFile File { get; set; }
	}

	public class CSVFileResponse
	{
		public bool IsSuccess { get; set; }
		public string Message { get; set; }
		public string Poruka { get; set; }
	}
}
