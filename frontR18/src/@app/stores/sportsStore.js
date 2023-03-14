import { makeAutoObservable, runInAction } from 'mobx';
import { map, find, head, filter, sortBy } from 'lodash-es';
import dayjs from 'dayjs';
import agent from 'app/api/agent';
import { sportsData } from '@data/sportsData';
import { parseFraction } from '@app/util/util';

export default class SportsStore {
	dataSport = [];
	dataSportTable = null;
	topLeaguesTable = [];
	scheduleDay = [];
	headerTableName = null;
	loading = false;
	idTable = null;
	initLoading = true;
	searchDay = dayjs(new Date()).format('YYYY-MM-DD');
	constructor() {
		makeAutoObservable(this);
	}

	//  Load all data
	loadAllSportsData = store => {
		try {
			this.loading = true;
			const dataTemp = map(sportsData, data => {
				return {
					...data,
					active: data.active ? 'Da' : 'Ne',
					has_outrights: data.has_outrights ? 'Da' : 'Ne',
				};
			});
			const startRow = store.pagingStore.pageSize * (store.pagingStore.currentPage - 1);
			const endRow = startRow + store.pagingStore.pageSize;
			store.pagingStore.setTotalRecords(dataTemp.length);
			const data = dataTemp.slice(startRow, endRow);
			this.dataSport = [...data];
			this.loading = false;
			// return this.dataSport;
		} catch (err) {
			console.log('%c Greška u loadAllSportsData ', 'color:red', err);
		}
	};

	//  Load all need data for table
	loadDataTable = async (store, idTable = 17) => {
		this.loading = true;
		this.dataSportTable = null;
		this.idTable = idTable;

		try {
			//  API API API
			if (process.env.NODE_ENV === 'production') {
				const API = await agent.SofaAPI.getApi(idTable);
				console.log('%c Production API=', 'color:red', API);
			}

			const season = await agent.SofaLoc.getSeason(idTable);
			runInAction(async () => {
				this.headerTableName = season?.data?.seasons[0].name;
				const resTableData = this.resTableDataFunc(idTable, season?.data?.seasons[0].id);
				const resLastFive = this.resLastFiveFunc(idTable, season?.data?.seasons[0].id);
				const resTopLeaguec = this.getHRConfigFunc();
				await Promise.all([resTableData, resLastFive, resTopLeaguec]);

				console.log('%c entriesTournament', 'color:green', Object.entries(this.resLastFive.data?.tournamentTeamEvents));

				this.entriesTournament = head(Object.entries(this.resLastFive.data?.tournamentTeamEvents));
				console.log('%c standings', 'color:green', this.resTableData.data.standings);
				console.log('%c entriesTournament=', 'color:green', this.entriesTournament);

				const mapedData = this.mapDataForTable(this.resTableData.data.standings[0], this.entriesTournament[1]);
				const mapeTopLeaguesData = this.mapDataTopLeagues(this.resTopLeaguec.data);
				this.dataSportTable = mapedData;
				this.topLeaguesTable = mapeTopLeaguesData;
				this.loading = false;
			});
		} catch (err) {
			console.log('%c Greška u SportsStore ', 'color:red', err);
		}
	};

	resTableDataFunc = async (idTable, season) => {
		const response = await agent.SofaLoc.getTournament(idTable, season);
		runInAction(() => {
			this.resTableData = response;
		});
	};

	resLastFiveFunc = async (idTable, season) => {
		const response = await agent.SofaLoc.getLastFive(idTable, season);
		runInAction(() => {
			this.resLastFive = response;
		});
	};

	getHRConfigFunc = async () => {
		const response = await agent.SofaLoc.getHRConfig();
		runInAction(() => {
			this.resTopLeaguec = response;
		});
	};

	changeDay = (day, storeOdds) => {
		this.searchDay = day;
		this.loadDataOddsTable(storeOdds);
	};

	//  Load all need data for table
	loadDataOddsTable = async store => {
		console.log('%c 00 store', 'color:gold', store);

		try {
			const resScheduleDay = await agent.SofaLoc.getDayScheduleEventBySport('football', this.searchDay);
			const resScheduleOddsDayOdds = await agent.SofaLoc.getDayScheduleEventOddsBySport('football', this.searchDay);
			runInAction(() => {
				const scheduleDay = this.mapScheduleDay(resScheduleDay.events, resScheduleOddsDayOdds.odds, store);
				const startRow = store.pagingStore.pageSize * (store.pagingStore.currentPage - 1);
				const endRow = startRow + store.pagingStore.pageSize;
				store.pagingStore.setTotalRecords(scheduleDay.length);
				const data = scheduleDay.slice(startRow, endRow);
				this.scheduleDay = data;
			});
		} catch (err) {
			console.log('%c Greška u loadDataOddsTable ', 'color:red', err);
		}
	};

	mapScheduleDay = (scheduleDay, resScheduleOddsDayOdds, store) => {
		// console.log('%c 17 scheduleDay= ', 'color:pink', scheduleDay);
		let sheduleOdds = Object.entries(resScheduleOddsDayOdds);
		// console.log('%c 18 sheduleOdds= ', 'color:pink', sheduleOdds);
		let cleanScheduleDay = filter(scheduleDay, data => {
			// code:60 Posponed, 100-Finished, 7- Live game, 31-HT, 6-additional time
			return (
				data.status.code !== 100 &&
				data.status.code !== 60 &&
				data.status.code !== 7 &&
				data.status.code !== 31 &&
				data.status.code !== 6 &&
				data.status.code !== 42 && // extensions
				data.status.code !== 120 // extensions
			);
		});

		cleanScheduleDay = cleanScheduleDay.map((data, i) => {
			const odds = find(sheduleOdds, dataOdds => +dataOdds[0] === data.id);
			// console.log('%c odds=', 'color:gold', i, odds, data.id, data);
			if (odds) {
				// console.log('%c 00', 'color:red', odds[1]);
				return { ...data, odds: odds[1] };
			}
			return { ...data, odds: null };
		});

		cleanScheduleDay = filter(cleanScheduleDay, data => data.odds !== null);

		const mapData = cleanScheduleDay.map((event, num) => {
			return {
				num: num + 1,
				id: event.id,
				awayTeam: event.awayTeam.name,
				homeTeam: event.homeTeam.name,
				liga: event.tournament.name,
				category: event.tournament.category.name,
				status: event.status.code,
				homeOdd: parseFraction(event.odds.choices[0].fractionalValue) + 1,
				drawOdd: parseFraction(event.odds.choices[1].fractionalValue) + 1,
				awayOdd: parseFraction(event.odds.choices[2].fractionalValue) + 1,
			};
		});

		console.log('%c SORT', 'color:green', store?.additionalFilter);
		if (store?.additionalFilter?.sort === 'asc') {
			const sortData = sortBy(mapData, store?.additionalFilter.column);
			return sortData;
		} else if (store?.additionalFilter?.sort === 'desc') {
			const sortData = sortBy(mapData, store?.additionalFilter.column).reverse();
			return sortData;
		}

		return mapData;
	};

	mapDataForTable = (data, tournament) => {
		const entriesTournament = Object.entries(tournament);
		const mapData = data.rows.map(row => {
			const teamLastFiveMatch = find(entriesTournament, data => +data[0] === row.team.id);
			const lastFive = teamLastFiveMatch[1]
				.map(data => {
					if (+data.winnerCode === 3) {
						return { res: 'D' };
					} else if (
						(+data.winnerCode === 1 && +data.homeTeam.id === +teamLastFiveMatch[0]) ||
						(+data.winnerCode === 2 && +data.awayTeam.id === +teamLastFiveMatch[0])
					) {
						return { res: 'W' };
					} else {
						return { res: 'L' };
					}
				})
				.reverse();

			return {
				position: row.position,
				promotion: row.promotion,
				name: row.team.name,
				logo: `https://api.sofascore.app/api/v1/team/${row.team.id}/image`,
				matches: row.matches,
				wins: row.wins,
				draws: row.draws,
				losses: row.losses,
				goals: `${row.scoresFor}:${row.scoresAgainst}`,
				lastFive: lastFive,
				pts: row.points,
			};
		});
		return mapData;
	};

	mapDataTopLeagues = data => {
		const { topUniqueTournamentIds, uniqueTournaments } = data;
		const mapData = topUniqueTournamentIds.map(idTable => {
			const tournament = find(uniqueTournaments, data => +data.id === idTable);
			const linkImg = `https://api.sofascore.app/api/v1/unique-tournament/${idTable}/image/dark`;
			return { idTable, tournamentName: tournament.name, linkImg };
		});
		return mapData;
	};

	destroy = () => {
		this.dataSportTable = null;
		console.log('%c 007 ODLAZIM iz class SportsStore ', 'color:red', this.dataSportTable);
	};

	componentDidMount() {
		alert('xxx');
		console.log('%c 008 componentDidMount BOOM', 'color:gold');
	}

	componentWillUnmount() {
		alert('errr');
		console.log('%c 009 componentWillUnmount BOOM', 'color:gold');
	}
}
