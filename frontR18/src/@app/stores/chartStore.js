import { makeAutoObservable, runInAction } from 'mobx';
import _ from 'lodash-es';
import agent from '../../app/api/agent';

export default class ChartStore {
	// dataLabels = [];
	trosakUkupno = 0;
	dataChart = [];
	constructor() {
		makeAutoObservable(this);
		console.log('%c ***************************', 'color:red');

		// this.loadAllData();
	}

	//  Usnimavanje svih podataka
	loadAllData = async () => {
		const labels = [];
		const dataLabelsNum = [];
		try {
			let data = {
				recordPerPage: 10,
				pageNumber: 1,
				allRecords: true,
			};

			const responseAll = await agent.ReadWriteDatabase.ReadZaba(data);
			let sumaUkupno = 0;
			responseAll.zabaReadRecord.forEach(data => {
				sumaUkupno = sumaUkupno + data.isplata;
			});

			this.trosakUkupno = Math.round(sumaUkupno * 100) / 100;
			this.dataTemp = _.chain(responseAll.zabaReadRecord)
				.groupBy('kategorija')
				.map((value, key) => {
					return { kat: key.split('-')[0], podKat: key.split('-')[1] || 'Nema', podaci: value };
				})
				.groupBy('kat')
				.map((value, key) => {
					let sumaKat = 0;
					value.forEach(pod => {
						let sumPodkategorije = 0;
						pod.podaci.forEach(dt => {
							if (dt.isplata > 0) {
								sumaKat = sumaKat + dt.isplata;
								sumPodkategorije = sumPodkategorije + dt.isplata;
							}
						});
						pod.sumPodKat = Math.round(sumPodkategorije * 100) / 100;
					});
					return {
						kat: key.split('-')[0],
						// podKat: key.split('-')[1],
						podaci: value,
						sumaKat: sumaKat,
					};
				})
				.value();

			this.dataTemp.forEach(el => {
				el.sumaKat = Math.round((el.sumaKat / sumaUkupno) * 100 * 10) / 10;
				labels.push(el.kat);
				dataLabelsNum.push(el.sumaKat.toString());
			});

			this.dataChart = [...this.dataTemp];
			this.dataLabels = [...labels];
			this.dataLabelsNum = [...dataLabelsNum];
		} catch (err) {
			console.log('%c Greška u ChartStore ', 'color:red', err);
			runInAction(() => {});
		} finally {
			this.loading = false;
		}
	};

	destroy = () => {
		console.log('%c 007 ODLAZIM iz class ChartStore ', 'color:red');
	};

	componentDidMount() {
		console.log('%c 008 componentDidMount BOOM', 'color:gold');
	}

	componentWillUnmount() {
		alert('tut');
	}
}
