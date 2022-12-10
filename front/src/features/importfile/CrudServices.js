import Configuration from './Configuration';
import Axios from './AxiosServices';

const axiosFile = new Axios();
//const Config = new Configuration()

export default class CrudServices {
	InsertExcelRecord(data) {
		console.log('data : ', data, ' Url : ', Configuration.InsertExcelRecord);
		return axiosFile.post(Configuration.InsertExcelRecord, data, false);
	}

	InsertCsvRecord(data) {
		console.log('InsertCsvRecord : ', data, ' Url : ', Configuration.InsertCsvRecord);
		return axiosFile.post(Configuration.InsertCsvRecord, data, false);
	}

	ReadRecord(data) {
		console.log('Url : ', Configuration.GetRecord, 'Data : ', data);
		return axiosFile.post(Configuration.GetRecord, data, false);
	}

	DeleteRecord(userId) {
		console.log('Url : ', Configuration.DeleteRecord);
		return axiosFile.delete(Configuration.DeleteRecord, { data: { userID: userId } }, false);
	}
}
