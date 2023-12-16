


namespace BasketPrj.CommonLayer.Model
{
	public class DeleteRequest
	{
		public int UserID { get; set; }
	}

	public class DeleteResponse
	{
		public bool IsSuccess { get; set; }
		public string Message { get; set; }
	}
}
