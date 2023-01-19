import React, { Component } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, Pagination } from '@mui/material';
import './ImportFile.css';
import { toast } from 'react-toastify';

// import CrudServices from './CrudServices';
import ReactFileReader from 'react-file-reader';
import agent from '../../app/api/agent';

// const service = new CrudServices();

export default class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			File: new FormData(),
			UploadFile: false,
			FileExtension: '',
			DataRecord: [],
			RecordPerPage: 10,
			PageNumber: 1,
			currentPage: 1,
			totalRecords: 0,
			totalPages: 0,
			dataText: null,
		};
		// this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount() {
		console.log('Component Will Mount Calling');
		this.ReadRecord(this.state.PageNumber);
	}

	// READ READ READ
	async ReadRecord(CurrentPage) {
		let data = {
			recordPerPage: this.state.RecordPerPage,
			pageNumber: CurrentPage,
		};
		const response = await agent.ReadWriteDatabase.ReadRecord(data);
		this.setState({ totalRecords: response.totalRecords });
		this.setState({ totalPages: response.totalPages });
		this.setState({ DataRecord: response.readRecord });

		// service
		// 	.ReadRecord(data)
		// 	.then(data => {
		// 		console.log('%c 00 data ', 'color:red', data);
		// 		console.log(data.data.readRecord);
		// 		this.setState({ totalRecords: data.data.totalRecords });
		// 		this.setState({ totalPages: data.data.totalPages });
		// 		this.setState({ DataRecord: data.data.readRecord });
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
	}

	snimiUBazu = async event => {
		event.preventDefault();
		if (this.state.FileExtension !== '') {
			const data = new FormData();
			data.append('file', this.state.File);

			if (this.state.FileExtension.toLowerCase() === 'csv') {
				// service
				// 	.InsertCsvRecord(data)
				// 	.then(data => {
				// 		console.log(data);
				// 		this.ReadRecord(this.state.PageNumber);
				// 	})
				// 	.catch(error => {
				// 		console.log(error);
				// 		this.ReadRecord(this.state.PageNumber);
				// 	});
				const response = await agent.ReadWriteDatabase.InsertCsvRecord(data);
				console.log('%c 00 ', 'color:red', response);
				this.ReadRecord(this.state.PageNumber);
			} else if (this.state.FileExtension.toLowerCase() === 'xlsx') {
				// service
				// 	.InsertExcelRecord(data)
				// 	.then(data => {
				// 		console.log(data);
				// 		this.ReadRecord(this.state.PageNumber);
				// 	})
				// 	.catch(error => {
				// 		console.log(error);
				// 		this.ReadRecord(this.state.PageNumber);
				// 	});
				const response = await agent.ReadWriteDatabase.InsertExcelRecord(data);
				console.log('%c 00 ', 'color:red', response);
				this.ReadRecord(this.state.PageNumber);
			} else {
				console.log('Invalid File');
			}
		}
	};

	handleFiles = files => {
		console.log('FiLES=', files);
		console.log('FiLES=', files.base64);
		var reader = new FileReader();

		reader.addEventListener(
			'load',
			() => {
				// this will then display a text file
				console.log('%c 00', 'color:green', reader.result);
				console.log('%c 01', 'color:red', JSON.stringify(reader.result));

				let dataText = reader.result.split('\r\n');

				// dataText = dataText.map(item => JSON.stringify(item));

				dataText = Object.assign({}, dataText);
				console.log('%c 02', 'color:green', dataText);
				console.log('%c typeof', 'color:green', typeof dataText);

				this.setState({ dataText: dataText });

				// content.innerText = reader.result;
			},
			false
		);
		reader.readAsText(files[0], 'UTF-8');

		console.log('%c 00', 'color:green', reader);

		this.setState({ File: files[0] });

		this.setState({ UploadFile: true });
		this.setState({
			FileExtension: files[0].name.split('.').pop(),
		});
		console.log('State=', this.state);
	};

	handlePaging = (event, value) => {
		this.setState({ PageNumber: value });
		console.log('value : ', value);
		this.ReadRecord(value);
	};

	handleDelete = async data => {
		console.log('Delete Body Id-----------------: ', data);
		// service
		// 	.DeleteRecord(datas.userId)
		// 	.then(data => {
		// 		console.log(data);
		// 		this.ReadRecord(this.state.PageNumber);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 		this.ReadRecord(this.state.PageNumber);
		// 	});

		const response = await agent.ReadWriteDatabase.DeleteRecord(data.userId);
		toast.success(response.message);
		this.ReadRecord(this.state.PageNumber);
	};

	render() {
		return (
			<div className="MainContainer">
				<div className="SubContainer">
					<div className="Box1">
						<div className="Input-Container">
							<div className="flex-Container">
								<div className="Header">Excel & Csv Bulk Data Upload Total records= {this.state.totalRecords}</div>
								<div className="sub-flex-Container">
									<div className="FileName">{this.state.File !== null ? this.state.File.name : ''}</div>
									<div className="UploadButton">
										<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.xlsx, .csv'} className="Upload">
											<Button variant="contained" color="primary" component="span">
												Submit
											</Button>
										</ReactFileReader>
									</div>
								</div>
							</div>
							<div className="flex-button">
								<Button variant="contained" color="secondary" onClick={this.snimiUBazu}>
									Usnimu u bazu
								</Button>
							</div>
						</div>
					</div>
					<div className="Box2">
						<div className="data-flex" style={{ color: 'red' }}>
							<div className="UserId">UserId</div>
							<div className="UserName">UserName</div>
							<div className="EmailID">EmailID</div>
							<div className="MobileNumber">MobileNo.</div>
							<div className="Salary">Salary</div>
							<div className="Gender">Gender</div>
							<div className="Age">Age</div>
							<div className="Delete"></div>
						</div>
						{Array.isArray(this.state.DataRecord) && this.state.DataRecord.length > 0
							? this.state.DataRecord.map((data, index) => {
									return (
										<div key={index} className="data-flex">
											<div className="UserId">{data.userId}</div>
											<div className="UserName">{data.userName}</div>
											<div className="EmailID">{data.emailID}</div>
											<div className="MobileNumber">{data.mobileNumber}</div>
											<div className="Salary">{data.salary}</div>
											<div className="Gender">{data.gender}</div>
											<div className="Age">{data.age}</div>
											<div className="Delete">
												<Button
													variant="outlined"
													color="error"
													onClick={e => {
														this.handleDelete(data);
													}}
												>
													<Delete />
												</Button>
											</div>
										</div>
									);
							  })
							: null}
					</div>
				</div>
				<Pagination
					count={this.state.totalPages}
					page={this.state.PageNumber}
					onChange={this.handlePaging}
					variant="outlined"
					shape="rounded"
					color="secondary"
				/>
			</div>
		);
	}
}
