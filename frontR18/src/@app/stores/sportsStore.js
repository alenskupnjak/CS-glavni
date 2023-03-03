import { makeAutoObservable } from 'mobx';
import { map } from 'lodash-es';
// import agent from '../../app/api/agent';
import { sportsData } from '@data/sportsData';

export default class SportsStore {
	dataSport = [];
	constructor() {
		makeAutoObservable(this);

		// this.loadAllData();
	}

	//  Usnimavanje svih podataka
	loadAllSportsData = () => {
		try {
			this.dataSport = map(sportsData, data => {
				return {
					...data,
					active: data.active ? 'Da' : 'Ne',
					has_outrights: data.has_outrights ? 'Da' : 'Ne',
				};
			});

			// this.dataSport = sportsData;

			// return this.dataSport;
		} catch (err) {
			console.log('%c Greška u SportsStore ', 'color:red', err);
		}
	};

	destroy = () => {
		console.log('%c 007 ODLAZIM iz class SportsStore ', 'color:red');
	};

	componentDidMount() {
		console.log('%c 008 componentDidMount BOOM', 'color:gold');
	}

	componentWillUnmount() {
		alert('ChartStore componentWillUnmount');
	}
}
