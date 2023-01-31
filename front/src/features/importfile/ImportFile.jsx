import React, { Component } from 'react';
import { Close, Delete, Update } from '@mui/icons-material';
import { Box, Button, Grid, Modal, Pagination, Typography } from '@mui/material';
import './ImportFile.css';
import { toast } from 'react-toastify';
import _ from 'lodash-es';

// import CrudServices from './CrudServices';
import ReactFileReader from 'react-file-reader';
import agent from '../../app/api/agent';
import { dateFormat } from '../../app/util/util';
import ZabaDataForm from './ZabaDataForm';

// const service = new CrudServices();

export default class ImportFile extends Component {
	constructor() {
		super();
		this.state = {
			File: new FormData(),
			UploadFile: false,
			FileExtension: null,
			DataRecord: [],
			ZabaRecord: [],
			ZabaKategorije: [],
			RecordPerPage: 15,
			PageNumber: 1,
			currentPage: 1,
			totalRecords: 0,
			totalPages: 0,
			dataText: null,
			switch: false,
			modalOpen: false,
			modalData: null,
		};
		this.ReadRecord(this.state.PageNumber);
		this.style = {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: 600,
			bgcolor: 'background.paper',
			border: '2px solid #000',
			boxShadow: 24,
			p: 4,
		};
		this.podaciGraph = 0;
	}

	// READ READ READ
	async ReadRecord(CurrentPage) {
		let data = {
			recordPerPage: this.state.RecordPerPage,
			pageNumber: CurrentPage,
			allRecords: false,
		};
		let dataAll = {
			recordPerPage: 10,
			pageNumber: 1,
			allRecords: true,
		};
		if (this.state.switch === true) {
			const response = await agent.ReadWriteDatabase.ReadRecord(data);

			this.setState({ totalRecords: response.totalRecords });
			this.setState({ totalPages: response.totalPages });
			this.setState({ DataRecord: response.readRecord });
		} else {
			const response = await agent.ReadWriteDatabase.ReadZaba(data);

			this.setState({ totalRecords: response.totalRecords });
			this.setState({ totalPages: response.totalPages });
			this.setState({ ZabaRecord: response.zabaReadRecord });

			const responseAll = await agent.ReadWriteDatabase.ReadZaba(dataAll);
			const ZabaKategorije = _.chain(responseAll.zabaReadRecord)
				.groupBy('kategorija')
				.map((value, key) => {
					return { key: key };
				})
				.value();
			const propertyKey = Object.keys(ZabaKategorije);
			console.log('%c 5 ', 'color:green', propertyKey);
			const propertyValues = Object.values(ZabaKategorije).map(data => data.key);
			console.log('%c 10 ', 'color:green', propertyValues);
			const entries = Object.entries(ZabaKategorije);
			console.log('%c 20 ', 'color:green', entries);

			this.setState({ ZabaKategorije: [...propertyValues] });
		}
	}

	snimiUBazu = async event => {
		event.preventDefault();
		if (this.state.FileExtension !== '') {
			const data = new FormData();
			data.append('file', this.state.File);
			if (this.state.FileExtension.toLowerCase() === 'csv') {
				const response = await agent.ReadWriteDatabase.InsertCsvRecord(data);
				console.log('%c 00 ', 'color:red', response);
				this.ReadRecord(this.state.PageNumber);
			} else if (this.state.FileExtension.toLowerCase() === 'xlsx') {
				const response = await agent.ReadWriteDatabase.InsertExcelRecord(data);
				console.log('%c 00 ', 'color:red', response);
				this.ReadRecord(this.state.PageNumber);
			} else {
				console.log('Invalid File');
			}
		}
	};

	snimiZabaBazu = async event => {
		event.preventDefault();
		if (this.state.FileExtension !== '') {
			const data = new FormData();
			data.append('file', this.state.File);

			if (this.state.FileExtension.toLowerCase() === 'csv') {
				await agent.ReadWriteDatabase.InsertCsvRecord(data);
				this.ReadRecord(this.state.PageNumber);
			} else if (
				this.state.FileExtension.toLowerCase() === 'xlsx' ||
				this.state.FileExtension.toLowerCase() === 'xls'
			) {
				const response = await agent.ReadWriteDatabase.InsertZabaExcelRecord(data);
				console.log('%c 00 Ajmooo', 'color:red', response);
				this.ReadRecord(this.state.PageNumber);
			} else {
				console.log('Invalid File');
			}
		}
	};

	toggle = async () => {
		await this.setState(state => ({
			switch: !state.switch,
		}));
		this.ReadRecord(this.state.PageNumber);
	};

	handleUpdate = async data => {
		console.log('%c 00 ', 'color:red', data);
		await this.setState(state => ({
			modalData: data,
		}));
		await this.setState(state => ({
			modalOpen: true,
		}));
	};

	handleClose = async () => {
		await this.setState(state => ({
			modalOpen: false,
		}));
	};

	handleFiles = files => {
		console.log('FiLES=', files);
		console.log('FiLES=', files.base64);
		let reader = new FileReader();

		// reader.addEventListener(
		// 	'load',
		// 	() => {
		// 		// this will then display a text file
		// 		console.log('%c 00', 'color:green', reader.result);
		// 		console.log('%c 01', 'color:red', JSON.stringify(reader.result));

		// 		let dataText = reader.result.split('\r\n');

		// 		// dataText = dataText.map(item => JSON.stringify(item));

		// 		dataText = Object.assign({}, dataText);
		// 		console.log('%c 02', 'color:green', dataText);
		// 		console.log('%c typeof', 'color:green', typeof dataText);

		// 		this.setState({ dataText: dataText });

		// 		// content.innerText = reader.result;
		// 	},
		// 	false
		// );
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
		this.ReadRecord(value);
	};

	handleDelete = async data => {
		if (this.state.switch) {
			const response = await agent.ReadWriteDatabase.DeleteRecord(data.userId);
			toast.success(response.message);
			this.ReadRecord(this.state.PageNumber);
		} else {
			console.log('Delete Body Id-----------------: ', data);
			const response = await agent.ReadWriteDatabase.DeleteZabaRecord(data.referencija);
			toast.success(response.message);
			this.ReadRecord(this.state.PageNumber);
		}
	};

	render() {
		return (
			<Grid container spacing={2}>
				<Grid item xs={8} sx={{ ml: 40 }}>
					<div className="MainContainer">
						<div className="SubContainer">
							<div className="Box1">
								<div className="Input-Container">
									<div className="flex-Container">
										<div className="Header">Excel & Csv Bulk Data Upload Total records= {this.state.totalRecords}</div>
										<div className="sub-flex-Container">
											<div className="FileName">{this.state.File !== null ? this.state.File.name : ''}</div>
											<div className="UploadButton">
												<ReactFileReader
													handleFiles={this.handleFiles}
													fileTypes={'.xlsx, .csv, .xls'}
													className="Upload"
												>
													<Button fullWidth variant="contained" color="primary" component="span">
														Ucitaj sa racunala
													</Button>
												</ReactFileReader>
											</div>
										</div>
									</div>
									<div className="flex-button">
										{this.state.switch ? (
											<Button variant="contained" color="secondary" onClick={this.snimiUBazu}>
												Usnimi u CVS bazu
											</Button>
										) : (
											<Button variant="contained" color="secondary" onClick={this.snimiZabaBazu}>
												Usnimi u Zabu bazu
											</Button>
										)}
										<Button variant="contained" color="success" onClick={this.toggle}>
											Zabu/CVS
										</Button>
									</div>
								</div>
							</div>
							<div className="Box2">
								{this.state.switch && (
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
								)}
								{!this.state.switch && (
									<div className="data-flex" style={{ color: 'red' }}>
										<div className="datum">Datum</div>
										<div className="opis">Opis</div>
										<div className="uplata">Uplata</div>
										<div className="isplata">Isplata</div>
										<div className="kategorija">Kategorija</div>
										<div className="delete">Delete</div>
										<div className="update">Update</div>
									</div>
								)}
								{this.state.switch && Array.isArray(this.state.DataRecord) && this.state.DataRecord.length > 0
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
								{!this.state.switch &&
									this.state.ZabaRecord &&
									this.state.ZabaRecord.map((data, index) => {
										return (
											<div key={index} className="data-flex">
												<div className="datum">{dateFormat(data.datum)}</div>
												<div className="opis">{data.opis}</div>
												<div className="uplata">{data.uplata}</div>
												<div className="isplata">{data.isplata}</div>
												<div
													className="kategorija"
													style={{ color: `${data.kategorija === 'Nedefinirano' ? 'red' : ''}` }}
												>
													{data.kategorija}
												</div>
												<div className="delete">
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
												<div className="update">
													<Button
														variant="outlined"
														color="success"
														onClick={() => {
															this.handleUpdate(data);
														}}
													>
														<Update />
													</Button>
												</div>
											</div>
										);
									})}
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
						<Modal
							open={this.state.modalOpen}
							onClose={this.handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={this.style}>
								<Button variant="outlined" color="error" onClick={this.handleClose}>
									<Close />
								</Button>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Text in a modal
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
								</Typography>
								<ZabaDataForm state={this.state} handleClose={this.handleClose} />
							</Box>
						</Modal>
					</div>
				</Grid>
			</Grid>
		);
	}
}
