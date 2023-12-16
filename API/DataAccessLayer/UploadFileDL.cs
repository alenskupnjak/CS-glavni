using BasketPrj.CommonLayer.Model;
using BasketPrj.CommonLayer.Zaba;
using ExcelDataReader;
using LumenWorks.Framework.IO.Csv;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


namespace API.DataAccessLayer
{
	public class UploadFileDL : IUploadFileDL
	{
		public readonly IConfiguration _configuration;
		public readonly SqlConnection _connectMSSQL;

		public UploadFileDL(IConfiguration configuration)
		{
			_configuration = configuration;
			_connectMSSQL = new SqlConnection(_configuration["ConnectionStrings:MSSQL"]);
		}

		// DELETE CVS DELETE CVS DELETE CVS
		public async Task<DeleteResponse> DeleteRecord(DeleteRequest request)
		{
			DeleteResponse response = new DeleteResponse();
			response.IsSuccess = true;
			response.Message = "Obrisano";
			try
			{   //  spajanje na bazu
				using SqlConnection connection = new SqlConnection(_configuration["ConnectionStrings:MSSQL"]);
				string queryMSSQL = @"DELETE FROM dbo.BulkuploadTable WHERE UserID = @UserID";
				connection.Open();
				SqlCommand command = new SqlCommand(queryMSSQL, connection);
				command.Parameters.AddWithValue("@UserID", request.UserID);
				int Status = await command.ExecuteNonQueryAsync();
				if (Status <= 0)
				{
					response.IsSuccess = false;
					response.Message = "Delete Query Not Executed";
					return response;
				}
				connection.Close();
			}
			catch (Exception ex)
			{
				response.IsSuccess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		// READ RECORD BulkUploadTable READ RECORD BulkUploadTable
		public async Task<ReadResponse> ReadRecord(ReadRequest request)
		{
			ReadResponse response = new ReadResponse();
			response.IsSuccess = true;
			response.Message = "Successful";
			int Count = 0;

			//set the connection 
			using (SqlConnection conn = new SqlConnection(_configuration["ConnectionStrings:MSSQL"]))
				try
				{
					if (_connectMSSQL.State != ConnectionState.Open)
					{
						await _connectMSSQL.OpenAsync();
					}
					string queryMSSQL = @"SELECT DISTINCT UserId,UserName,EmailID,MobileNumber,Gender,Age,Salary,IsActive
                                 FROM dbo.BulkUploadTable
                                 ORDER BY UserId
                                 OFFSET @Offset ROWS
                                 FETCH NEXT @RecordPerPage ROWS ONLY;";
					SqlCommand sqlCommand = new SqlCommand(queryMSSQL, conn);
					conn.Open();
					// Ocitavam koliko je Ukupno zapisa
					SqlCommand countSQL = new SqlCommand("SELECT COUNT(*) FROM dbo.BulkuploadTable", conn);
					Int32 count = (int)countSQL.ExecuteScalar();

					int OffsetRow = (request.PageNumber - 1) * request.RecordPerPage;
					sqlCommand.Parameters.AddWithValue("@Offset", OffsetRow);
					sqlCommand.Parameters.AddWithValue("@RecordPerPage", request.RecordPerPage);
					SqlDataReader dr = sqlCommand.ExecuteReader();
					if (dr.HasRows)
					{
						response.ReadRecord = new List<ReadRecord>();
						while (dr.Read())
						{
							ReadRecord getdata = new ReadRecord
							{
								UserId = dr.GetInt32(0),
								UserName = dr.GetString(1),
								EmailID = dr.GetString(2),
								MobileNumber = dr.GetString(3),
								Gender = dr.GetString(4),
								Age = dr.GetInt32(5),
								Salary = dr.GetInt32(6),
							};
							if (Count == 0)
							{
								Count++;
								response.TotalRecords = count;
								response.TotalPages = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(response.TotalRecords / request.RecordPerPage)));
								response.CurrentPage = request.PageNumber;
							}
							response.ReadRecord.Add(getdata);
						}
					}
				}
				catch (Exception ex)
				{
					response.IsSuccess = false;
					response.Message = ex.Message;
				}
			return response;
		}

		// SNIMI CSV U BAZU ...
		public async Task<CSVFileResponse> UploadCSVFile(CSVFileRequest request, string Path)
		{
			CSVFileResponse response = new CSVFileResponse();
			List<UploadParameter> Parameters = new List<UploadParameter>();
			response.IsSuccess = true;
			response.Message = "Successful";
			try
			{
				if (request.File.FileName.ToLower().Contains(".csv"))
				{
					// Opceniti dio ucitavanja FILE
					DataTable value = new DataTable();
					// Install Library : LumenWorksCsvReader 
					using (CsvReader csvReader = new CsvReader(new StreamReader(File.OpenRead(Path)), true))
					{
						value.Load(csvReader);
					};
					for (int i = 0; i < value.Rows.Count; i++)
					{
						UploadParameter readData = new UploadParameter();
						readData.UserName = value.Rows[i][0] != null ? Convert.ToString(value.Rows[i][0]) : "-1";
						readData.EmailID = value.Rows[i][1] != null ? Convert.ToString(value.Rows[i][1]) : "-1";
						readData.MobileNumber = value.Rows[i][2] != null ? Convert.ToString(value.Rows[i][2]) : "-1";
						readData.Age = value.Rows[i][3] != null ? Convert.ToInt32(value.Rows[i][3]) : -1;
						readData.Salary = value.Rows[i][4] != null ? Convert.ToInt32(value.Rows[i][4]) : -1;
						readData.Gender = value.Rows[i][5] != null ? Convert.ToString(value.Rows[i][5]) : "-1";
						Parameters.Add(readData);
					}

					// Kod ovisno o kojoj se bazi radi -  MSSQL MSSQL MSSQL MSSQL MSSQL
					if (Parameters.Count > 0)
					{
						string queryMSSQL = @"INSERT INTO dbo.BulkuploadTable (UserName,EmailID,MobileNumber,Gender,Age,Salary,IsActive) 
                                  VALUES(@UserName,@EmailID,@MobileNumber,@Gender,@Age,@Salary,@IsActive)";
						foreach (UploadParameter rows in Parameters)
						{
							SqlCommand commandMSSQL = new SqlCommand(queryMSSQL, _connectMSSQL);
							commandMSSQL.Parameters.AddWithValue("@UserName", rows.UserName);
							commandMSSQL.Parameters.AddWithValue("@EmailID", rows.EmailID);
							commandMSSQL.Parameters.AddWithValue("@MobileNumber", rows.MobileNumber);
							commandMSSQL.Parameters.AddWithValue("@Gender", rows.Gender);
							commandMSSQL.Parameters.AddWithValue("@Age", rows.Age);
							commandMSSQL.Parameters.AddWithValue("@Salary", rows.Salary);
							commandMSSQL.Parameters.AddWithValue("@IsActive", "5");
							_connectMSSQL.Open();
							int StatusMSSQL = await commandMSSQL.ExecuteNonQueryAsync();
							if (StatusMSSQL <= 0)
							{
								response.IsSuccess = false;
								response.Message = "MSSQL Query Not Executed";
								return response;
							}
							_connectMSSQL.Close();
						}
					}
				}
				else
				{
					response.IsSuccess = false;
					response.Message = "InValid File";
				}
			}
			catch (Exception ex)
			{
				response.IsSuccess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		// SNIMI EXCEL U BAZU
		public async Task<ExcelResponse> UploadExcelFile(ExcelRequest request, string path)
		{
			ExcelResponse response = new ExcelResponse();
			List<UploadParameter> Parameters = new List<UploadParameter>();
			response.IsSuccess = true;
			response.Message = "Successful";
			try
			{
				if (request.File.FileName.ToLower().Contains(".xlsx"))
				{
					// opčeniti dio Očitavanja EXcel file
					FileStream stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
					System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
					IExcelDataReader reader = ExcelReaderFactory.CreateReader(stream);  // Nuget paket ExcelDataReader

					DataSet dataSet = reader.AsDataSet(
							new ExcelDataSetConfiguration()  // Nuget paket ExcelDataReader.DataSet
							{
								UseColumnDataType = false,
								ConfigureDataTable = (tableReader) => new ExcelDataTableConfiguration()
								{
									UseHeaderRow = true
								}
							});

					for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
					{
						UploadParameter rows = new UploadParameter();
						rows.UserName = dataSet.Tables[0].Rows[i].ItemArray[0] != null ? Convert.ToString(dataSet.Tables[0].Rows[i].ItemArray[0]) : "-1";
						rows.EmailID = dataSet.Tables[0].Rows[i].ItemArray[1] != null ? Convert.ToString(dataSet.Tables[0].Rows[i].ItemArray[1]) : "-1";
						rows.MobileNumber = dataSet.Tables[0].Rows[i].ItemArray[2] != null ? Convert.ToString(dataSet.Tables[0].Rows[i].ItemArray[2]) : "-1";
						rows.Age = dataSet.Tables[0].Rows[i].ItemArray[3] != null ? Convert.ToInt32(dataSet.Tables[0].Rows[i].ItemArray[3]) : -1;
						rows.Salary = dataSet.Tables[0].Rows[i].ItemArray[4] != null ? Convert.ToInt32(dataSet.Tables[0].Rows[i].ItemArray[4]) : -1;
						rows.Gender = dataSet.Tables[0].Rows[i].ItemArray[5] != null ? Convert.ToString(dataSet.Tables[0].Rows[i].ItemArray[5]) : "-1";
						Parameters.Add(rows);
					}
					stream.Close();

					// Pocetak punjenja baze
					if (Parameters.Count > 0)
					{
						string queryMSSQL = @"INSERT INTO dbo.BulkuploadTable (UserName,EmailID,MobileNumber,Gender,Age,Salary,IsActive) 
                                  VALUES(@UserName,@EmailID,@MobileNumber,@Gender,@Age,@Salary,@IsActive)";
						foreach (UploadParameter rows in Parameters)
						{
							SqlCommand commandMSSQL = new SqlCommand(queryMSSQL, _connectMSSQL);
							commandMSSQL.Parameters.AddWithValue("@UserName", rows.UserName);
							commandMSSQL.Parameters.AddWithValue("@EmailID", rows.EmailID);
							commandMSSQL.Parameters.AddWithValue("@MobileNumber", rows.MobileNumber);
							commandMSSQL.Parameters.AddWithValue("@Gender", rows.Gender);
							commandMSSQL.Parameters.AddWithValue("@Age", rows.Age);
							commandMSSQL.Parameters.AddWithValue("@Salary", rows.Salary);
							commandMSSQL.Parameters.AddWithValue("@IsActive", "5");
							_connectMSSQL.Open();
							int StatusMSSQL = await commandMSSQL.ExecuteNonQueryAsync();
							if (StatusMSSQL <= 0)
							{
								response.IsSuccess = false;
								response.Message = "MSSQL Query Not Executed";
								return response;
							}
							_connectMSSQL.Close();
						}
					}
				}
				else
				{
					response.IsSuccess = false;
					response.Message = "Invalid File";
				}
			}
			catch (Exception ex)
			{
				response.IsSuccess = false;
				response.Message = ex.Message;
			}
			return response;
		}


		// SNIMI ZABA ZABA EXCEL U BAZU
		public async Task<ExcelZabaResponse> UploadZabaFile(ExcelZabaRequest request, string path)
		{
			ExcelZabaResponse response = new ExcelZabaResponse();
			List<UploadZabaParameter> Parameters = new List<UploadZabaParameter>();
			object[] podaciDupli = new object[1000];
			object[] podaciUbaceni = new object[1000];
			response.IsSuccess = true;
			response.Message = "Successful";
			response.NewData = "Start";
			response.Dupli = "Start";
			try
			{
				if (request.File.FileName.ToLower().Contains(".xlsx") || request.File.FileName.ToLower().Contains(".xls"))
				{
					// opčeniti dio Očitavanja EXcel file
					FileStream stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
					System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
					IExcelDataReader reader = ExcelReaderFactory.CreateReader(stream);  // Nuget paket ExcelDataReader

					DataSet ds = reader.AsDataSet(
							new ExcelDataSetConfiguration()  // Nuget paket ExcelDataReader.DataSet
							{
								UseColumnDataType = false,
								ConfigureDataTable = (tableReader) => new ExcelDataTableConfiguration()
								{
									UseHeaderRow = true
								}
							});

					for (int i = 4; i < ds.Tables[0].Rows.Count; i++)
					{

						UploadZabaParameter rows = new UploadZabaParameter();
						rows.Datum = ds.Tables[0].Rows[i].ItemArray[0] != null ? Convert.ToDateTime(ds.Tables[0].Rows[i].ItemArray[0]) : new DateTime();
						rows.Referencija = ds.Tables[0].Rows[i].ItemArray[1] != null ? Convert.ToString(ds.Tables[0].Rows[i].ItemArray[1]) : "-1";
						rows.Opis = ds.Tables[0].Rows[i].ItemArray[2] != null ? Convert.ToString(ds.Tables[0].Rows[i].ItemArray[2]) : "-1";
						object data = ds.Tables[0].Rows[i].ItemArray[3];
						rows.Uplata = (float)(data != null ? Convert.ToDouble(data) : 0);
						rows.Isplata = (float)(ds.Tables[0].Rows[i].ItemArray[4] != null ? Convert.ToDouble(ds.Tables[0].Rows[i].ItemArray[4]) : 0);
						// pozovi funkciju
						string podatak = DefinirajGrupu(Convert.ToString(ds.Tables[0].Rows[i].ItemArray[2]));
						rows.Kategorija = podatak;
						Parameters.Add(rows);
					}
					stream.Close();

					// Pocetak punjenja baze
					if (Parameters.Count > 0)
					{
						string queryMSSQL = @"INSERT INTO dbo.ZabaTBL (Datum,Referencija,Opis,Uplata,Isplata,Kategorija,IsActive) 
                                  VALUES(@Datum,@Referencija,@Opis,@Uplata,@Isplata,@Kategorija,@IsActive)";
						int i = -1;
						foreach (UploadZabaParameter rows in Parameters)
						{
							i++;
							string NadiZapisMSSQL = @"SELECT * FROM dbo.ZabaTBL WHERE ([Referencija] = '" + rows.Referencija + "')";
							SqlCommand provjeraDaliZapisPostoji = new SqlCommand(NadiZapisMSSQL, _connectMSSQL);
							SqlCommand zabaMSSQL = new SqlCommand(queryMSSQL, _connectMSSQL);
							zabaMSSQL.Parameters.AddWithValue("@Datum", rows.Datum);
							zabaMSSQL.Parameters.AddWithValue("@Referencija", rows.Referencija);
							zabaMSSQL.Parameters.AddWithValue("@Opis", rows.Opis);
							zabaMSSQL.Parameters.AddWithValue("@Uplata", Math.Round(rows.Uplata, 2));
							zabaMSSQL.Parameters.AddWithValue("@Isplata", Math.Round(rows.Isplata, 2));
							zabaMSSQL.Parameters.AddWithValue("@Kategorija", rows.Kategorija);
							zabaMSSQL.Parameters.AddWithValue("@IsActive", true);
							_connectMSSQL.Open();
							SqlDataReader Provjera = provjeraDaliZapisPostoji.ExecuteReader();
							if (Provjera.HasRows)
							{
								response.IsSuccess = false;
								response.Message = "Naso sam ga";
								podaciDupli[i] = rows;
								response.Dupli = podaciDupli;
								Provjera.Close();
							}
							else
							{
								Provjera.Close();
								int StatusMSSQL = await zabaMSSQL.ExecuteNonQueryAsync();
								if (StatusMSSQL <= 0)
								{
									response.IsSuccess = false;
									response.Message = "MSSQL Query Not Executed";
									return response;
								}
								podaciUbaceni[i] = rows;
								response.NewData = podaciUbaceni;
							}
							_connectMSSQL.Close();
						}
					}
				}
				else
				{
					response.IsSuccess = false;
					response.Message = "Invalid File";
				}
			}
			catch (Exception ex)
			{
				response.IsSuccess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		// READ ZABA RECORD ** READ ZABA RECORD
		public async Task<ZabaReadResponse> ReadZaba(ZabaReadRequest request)
		{
			ZabaReadResponse response = new ZabaReadResponse();
			response.IsSuccess = true;
			response.Message = "Successful";
			int Count = 0;

			// set the connection 
			using (SqlConnection conn = new SqlConnection(_configuration["ConnectionStrings:MSSQL"]))
				try
				{
					if (_connectMSSQL.State != ConnectionState.Open)
					{
						await _connectMSSQL.OpenAsync();
					}
					string queryMSSQL = @"SELECT DISTINCT Datum,Referencija,Opis,Uplata,Isplata,Kategorija,IsActive
                                 FROM dbo.ZabaTBL
	                               WHERE IsActive='1' OR IsActive=@IsActive
                                 ORDER BY Datum
                                 OFFSET @Offset ROWS
                                 FETCH NEXT @RecordPerPage ROWS ONLY;";
					SqlCommand sqlCommand = new SqlCommand(queryMSSQL, conn);
					conn.Open();
					// Ocitavam koliko je Ukupno zapisa
					SqlCommand countSQL = new("SELECT COUNT(*) FROM dbo.ZabaTBL", conn);
					Int32 count = (int)countSQL.ExecuteScalar();

					if (request.AllRecords)
					{
						//int OffsetRow = (1 - 1) * request.RecordPerPage;
						sqlCommand.Parameters.AddWithValue("@Offset", 0);
						sqlCommand.Parameters.AddWithValue("@RecordPerPage", count);
						sqlCommand.Parameters.AddWithValue("@IsActive", '1');
					}
					else
					{
						int OffsetRow = (request.PageNumber - 1) * request.RecordPerPage;
						sqlCommand.Parameters.AddWithValue("@Offset", OffsetRow);
						sqlCommand.Parameters.AddWithValue("@RecordPerPage", request.RecordPerPage);
						sqlCommand.Parameters.AddWithValue("@IsActive", '0');
					}


					SqlDataReader dr = sqlCommand.ExecuteReader();
					if (dr.HasRows)
					{
						response.ZabaReadRecord = new List<ZabaReadRecord>();
						var countGraph = 0;
						while (dr.Read())
						{
							countGraph++;
							ZabaReadRecord getdata = new()
							{
								Datum = dr.GetDateTime(0),
								Referencija = dr.GetString(1),
								Opis = dr.GetString(2),
								Uplata = dr.GetDouble(3),
								Isplata = dr.GetDouble(4),
								Kategorija = dr.GetString(5),
								IsActive = dr.GetBoolean(6)

							};
							if (Count == 0)
							{
								Count++;
								response.TotalRecords = count;
								response.TotalPages = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(response.TotalRecords / request.RecordPerPage)));
								response.CurrentPage = request.PageNumber;
							}
							response.ZabaReadRecord.Add(getdata);

						}
						response.NewData = countGraph;
					}
				}
				catch (Exception ex)
				{
					response.IsSuccess = false;
					response.Message = ex.Message;
				}
			return response;
		}

		// DELETE ZABA DELETE ZABA DELETE ZABA
		public async Task<DeleteZabaResponse> DeleteZabaRecord(DeleteZabaRequest request)
		{
			DeleteZabaResponse response = new DeleteZabaResponse();
			response.IsSuccess = true;
			response.Message = "Obrisano";
			try
			{   //  spajanje na bazu
				using SqlConnection connection = new SqlConnection(_configuration["ConnectionStrings:MSSQL"]);
				string queryMSSQL = @"DELETE FROM dbo.ZabaTBL WHERE Referencija = @Referencija";
				connection.Open();
				SqlCommand command = new SqlCommand(queryMSSQL, connection);
				command.Parameters.AddWithValue("@Referencija", request.Referencija);
				int Status = await command.ExecuteNonQueryAsync();
				if (Status <= 0)
				{
					response.IsSuccess = false;
					response.Message = "Delete Query Not Executed";
					return response;
				}
				connection.Close();
			}
			catch (Exception ex)
			{
				response.IsSuccess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		// UPLOAD ZABA RECORD UPLOAD ZABA UPLOAD ZABA RECORD
		public async Task<UpdateZabaRecordResponse> UpdateZabaRecord(UpdateZabaRecord request)
		{
			UpdateZabaRecordResponse response = new UpdateZabaRecordResponse();
			response.IsSuccess = true;
			response.Message = "Uspjesno UPDATE";
			try
			{   //  spajanje na bazu
				using SqlConnection connection = new SqlConnection(_configuration["ConnectionStrings:MSSQL"]);
				string queryMSSQL = @"UPDATE dbo.ZabaTBL 
                              SET Datum=@Datum, Opis=@Opis, IsActive=@IsActive, Kategorija=@Kategorija
                              WHERE Referencija = @Referencija";
				connection.Open();
				SqlCommand command = new SqlCommand(queryMSSQL, connection);
				command.Parameters.AddWithValue("@Datum", request.Datum);
				command.Parameters.AddWithValue("@Opis", request.Opis);
				command.Parameters.AddWithValue("@Uplata", request.Uplata);
				command.Parameters.AddWithValue("@Isplata", request.Isplata);
				command.Parameters.AddWithValue("@Kategorija", request.Kategorija);
				command.Parameters.AddWithValue("@IsActive", request.IsActive);
				command.Parameters.AddWithValue("@Referencija", request.Referencija);
				int Status = await command.ExecuteNonQueryAsync();
				if (Status <= 0)
				{
					response.IsSuccess = false;
					response.Message = "Update Query Not Executed";
					return response;
				}
				connection.Close();
			}
			catch (Exception ex)
			{
				response.IsSuccess = false;
				response.Message = ex.Message;
			}
			return response;
		}


		//
		//
		private static string DefinirajGrupu(string opis)
		{
			var kategorija = "Nedefinirano";
			Regex regex = new Regex(@"Podizanje gotovog novca");
			if (regex.Match(opis).Success)
			{
				kategorija = NadiRijecNaOpisu("Podizanje gotovog novca", opis, "Financije-Bankomat");
			}

			regex = new Regex(@"kaufland");
			Match match = regex.Match(opis);
			if (match.Success)
			{
				kategorija = NadiRijecNaOpisu("kaufland", opis, "Hrana-Doma");
			}

			regex = new Regex(@"terme");
			if (regex.Match(opis).Success)
			{
				kategorija = NadiRijecNaOpisu("terme", opis, "Ostalo:Slobodno-vrijeme");
			}

			regex = new Regex(@"mesnica");
			if (regex.Match(opis).Success)
			{
				kategorija = NadiRijecNaOpisu("mesnica", opis, "Hrana-Doma");
			}

			regex = new Regex(@"Kupovina zaba kuhinjica");
			if (regex.Match(opis).Success)
			{
				kategorija = NadiRijecNaOpisu("Kupovina zaba kuhinjica", opis, "Hrana-Posao");
			}

			regex = new Regex(@"hrvatska radiotelevizija");
			if (regex.Match(opis).Success)
			{
				kategorija = NadiRijecNaOpisu("hrvatska radiotelevizija", opis, "Rezije-HTV");
			}

			regex = new Regex(@"hrvatski telekom d.d.- mobilna");
			if (regex.Match(opis).Success)
			{
				kategorija = NadiRijecNaOpisu("hrvatski telekom d.d.- mobilna", opis, "Rezije-Mobitel");
			}

			regex = new Regex(@"holding d.o.o");
			if (regex.Match(opis).Success)
			{
				kategorija = NadiRijecNaOpisu("holding d.o.o", opis, "Rezije-holding");
			}



			regex = new Regex(@"revolut");
			if (regex.Match(opis).Success)
			{
				kategorija = "Financije-kartica";
			}

			regex = new Regex(@"Naplata obroka");
			if (regex.Match(opis).Success)
			{
				kategorija = "Financije-rate";
			}

			regex = new Regex(@"zabavljak");
			if (regex.Match(opis).Success)
			{
				kategorija = "Hrana-Posao";
			}

			regex = new Regex(@"pbztpetrolbp");
			if (regex.Match(opis).Success)
			{
				kategorija = "Auto";
			}

			regex = new Regex(@"konzum");
			if (regex.Match(opis).Success)
			{
				kategorija = "Hrana-Doma";
			}

			regex = new Regex(@"mastercard");
			if (regex.Match(opis).Success)
			{
				kategorija = "Financije-mastercard";
			}

			regex = new Regex(@"hep");
			if (regex.Match(opis).Success)
			{
				kategorija = "Rezije-Struja";
			}

			regex = new Regex(@"trajnog naloga");
			if (regex.Match(opis).Success)
			{
				kategorija = "Rezije-Trajni nalog";
			}

			regex = new Regex(@"Naknada");
			if (regex.Match(opis).Success)
			{
				kategorija = "Financije-naknada";
			}

			regex = new Regex(@"zajednička pričuva");
			if (regex.Match(opis).Success)
			{
				kategorija = "Rezije-Trajni nalog";
			}

			regex = new Regex(@"zdravstveno osiguranje");
			if (regex.Match(opis).Success)
			{
				kategorija = "Rezije-Trajni nalog";
			}

			regex = new Regex(@"hrvatski telekom");
			if (regex.Match(opis).Success)
			{
				kategorija = "Rezije-Trajni nalog";
			}

			regex = new Regex(@"kudelic");
			if (regex.Match(opis).Success)
			{
				kategorija = "Hrana-Doma";
			}

			regex = new Regex(@"poliklinika");
			if (regex.Match(opis).Success)
			{
				kategorija = "Osobno-Zdravlje";
			}

			regex = new Regex(@"eventim");
			if (regex.Match(opis).Success)
			{
				kategorija = "Osobno-Zabava";
			}

			regex = new Regex(@"lesnina");
			if (regex.Match(opis).Success)
			{
				kategorija = "Osobno-Uredenje doma";
			}

			regex = new Regex(@"ljekarni");
			if (regex.Match(opis).Success)
			{
				kategorija = "Osobno-Zdravlje";
			}

			regex = new Regex(@"videoteka");
			if (regex.Match(opis).Success)
			{
				kategorija = "Osobno-Cigarete";
			}

			regex = new Regex(@"donacija");
			if (regex.Match(opis).Success)
			{
				kategorija = "Osobno-Donacije";
			}

			return kategorija;
		}

		private static string NadiRijecNaOpisu(string opis, string obrada, string kategorija)
		{
			var kat = "";
			Regex regex = new Regex(@opis);
			Match match = regex.Match(obrada);
			if (match.Success)
			{
				kat = kategorija;

			}
			return kat;
		}


	}
}
