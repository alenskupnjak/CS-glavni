using System.ComponentModel.DataAnnotations;

namespace BasketPrj.CommonLayer.CVS
{

	//  UserId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	//UserName varchar(255),
	//	EmailID varchar(255),
	//    MobileNumber varchar(10) default '0',
	//    Gender varchar(10),
	//    Age int,
	//    Salary int,
	//    IsActive bit default 1

	public class CVSReadRecord

	{

		private int _isActive;


		[Key]
		public int UserId { get; set; }
		public string UserName { get; set; }
		public string EmailID { get; set; }
		public string MobileNumber { get; set; }
		public string Gender { get; set; }
		public int Age { get; set; }
		public int Salary { get; set; }
		public int IsActive
		{
			get
			{
				return _isActive;
			}

			set { _isActive = 1; }
		}
	}
}
