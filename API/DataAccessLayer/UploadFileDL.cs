using API.CommonLayer.Model;
using ExcelDataReader;
using LumenWorks.Framework.IO.Csv;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
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

    // DELETE DELETE DELETE
    public async Task<DeleteResponse> DeleteRecord(DeleteRequest request)
    {
      DeleteResponse response = new DeleteResponse();
      response.IsSuccess = true;
      response.Message = "Obrisano";
      try
      {   //  spajanje na bazu
        using SqlConnection connection = new SqlConnection(_configuration["ConnectionStrings:MSSQL"]);
        string queryMSSQL = @"DELETE FROM dbo.bulkuploadtable WHERE UserID = @UserID";
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

    // READ RECORD READ RECORD
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
          SqlCommand countSQL = new SqlCommand("SELECT COUNT(*) FROM dbo.bulkuploadtable", conn);
          Int32 count = (int) countSQL.ExecuteScalar();

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
            string queryMSSQL = @"INSERT INTO dbo.bulkuploadtable (UserName,EmailID,MobileNumber,Gender,Age,Salary,IsActive) 
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
            string queryMSSQL = @"INSERT INTO dbo.bulkuploadtable (UserName,EmailID,MobileNumber,Gender,Age,Salary,IsActive) 
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
  }
}
