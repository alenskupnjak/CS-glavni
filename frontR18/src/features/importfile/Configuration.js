module.exports = {
	InsertExcelRecord: `${process.env.REACT_APP_API_URL}UploadFile/UploadExcelFile`,
	GetRecord: 'http://localhost:5030/api/UploadFile/ReadRecord',
	InsertCsvRecord: 'http://localhost:5030/api/UploadFile/UploadCSVFile',
	DeleteRecord: 'http://localhost:5030/api/UploadFile/DeleteRecord',
};
