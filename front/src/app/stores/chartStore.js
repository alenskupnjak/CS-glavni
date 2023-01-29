import { makeAutoObservable, runInAction } from 'mobx';
import _ from 'lodash-es';
import agent from '../api/agent';

export default class ChartStore {
	dataLabels = [];
	dataLabelsNum = [];
	trosakUkupno = 0;

	constructor() {
		makeAutoObservable(this);

		this.loadAllData();
	}

	//  Usnimavanje svih podataka
	loadAllData = async () => {
		this.dataLabels = [];
		const labels = [];
		const dataLabelsNum = [];
		try {
			let data = {
				recordPerPage: 10,
				pageNumber: 1,
				allRecords: true,
			};

			const responseAll = await agent.ReadWriteDatabase.ReadZaba(data);
			this.dataTemp = _.chain(responseAll.zabaReadRecord).groupBy('kategorija').value();
			// console.log('%c 00 ajmooos', 'color:green', Object.entries(this.dataTemp));
			this.dataChart = _.chain(responseAll.zabaReadRecord)
				.groupBy('kategorija')
				.map((value, key) => {
					return { kat: key.split('-')[0], podKat: key.split('-')[1] || 'Nema', podaci: value };
				})
				.groupBy('kat')
				.map((value, key) => {
					let sumaKat = 0;
					console.log('%c 00 value', 'color:pink', value);
					value.forEach(pod => {
						let sumPodkategorije = 0;
						console.log('%c 01 value', 'color:green', pod);
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
						sumaKat: Math.round(sumaKat * 100) / 100,
					};
				})
				.value();
			let sumaUkupno = 0;
			this.dataChart.forEach(el => {
				sumaUkupno = sumaUkupno + el.sumaKat;
			});
			this.trosakUkupno = Math.round(sumaUkupno * 100) / 100;

			this.dataChart.forEach(el => {
				el.sumaKat = Math.round((el.sumaKat / sumaUkupno) * 100);
				labels.push(el.kat);
				dataLabelsNum.push(el.sumaKat.toString());
			});

			this.dataLabels = [...labels];
			this.dataLabelsNum = [...dataLabelsNum];
			console.log('%c this.dataChart', 'color:gold', this.dataChart);
		} catch (err) {
			console.log('%c Greška u ChartStore ', 'color:red', err);
			runInAction(() => {});
		} finally {
			this.loading = false;
		}
	};
}
