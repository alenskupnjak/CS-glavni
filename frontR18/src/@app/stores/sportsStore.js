import { makeAutoObservable, runInAction } from 'mobx';
import { map, find, head, filter, sortBy } from 'lodash-es';
import dayjs from 'dayjs';
import agent from 'app/api/agent';
import { sportsData } from '@data/sportsData';
import { parseFraction } from '@app/util/util';

const removeEvent = [384];

export default class SportsStore {
	dataSport = [];
	dataSportTable = null;
	topLeaguesTable = [];
	scheduleDay = [];
	headerTableName = null;
	loading = false;
	loadingOdds = false;
	idTable = null;
	initLoading = true;
	searchDay = dayjs(new Date()).format('YYYY-MM-DD');
	sport = 'football';
	scheduleDayAll = null;
	constructor() {
		makeAutoObservable(this);
	}

	//  Load all data for SPORT table
	loadSportsTable = async (idTable = 17) => {
		this.loading = true;
		this.dataSportTableNew = null;
		this.dataSportTable = null;
		this.idTable = idTable;
		try {
			//  SOFA API SOFA API
			if (process.env.NODE_ENV === 'production') {
				// const API = await agent.SofaAPI.getTournamentData(idTable);
				// console.log('%c Production API=', 'color:red', API);
				const season = await agent.SofaAPI.getSeason(idTable);
				console.log('%c season API=', 'color:red', season);
				const resTableData = await agent.SofaAPI.getTournament(idTable, season?.data?.seasons[0].id);
				console.log('%c resTableData API=', 'color:red', resTableData);
			} else {
				const season = await agent.SofaLoc.getSeason(idTable);
				runInAction(async () => {
					this.headerTableName = season?.data?.seasons[0].name;
					const resTableData = this.getTournament(idTable, season?.data?.seasons[0].id);
					const resLastFive = this.getLastFive(idTable, season?.data?.seasons[0].id);
					const resTopLeaguec = this.getHRConfig();
					const resSportCategories = this.getSportCategories();
					const resSportCategoriesDay = this.getSportCategoriesDay();
					await Promise.all([resTableData, resLastFive, resTopLeaguec, resSportCategories, resSportCategoriesDay]);
					this.entriesTournament = head(Object.entries(this.resLastFive.data?.tournamentTeamEvents));
					const mapTopLeaguesData = this.mapDataTopLeagues(this.resTopLeaguec);
					this.topLeaguesTable = mapTopLeaguesData;
					const mapedDataNew = this.mapDataForTableNew(
						this.resTableData?.data?.standings,
						Object.entries(this.resLastFive?.data?.tournamentTeamEvents)
					);

					if (this.scheduleDayAll) {
						this.tablePairs = filter(this.scheduleDayAll, data => data.idTournament === idTable);
					}
					this.dataSportTableNew = mapedDataNew;
				});
				this.loading = false;
			}
		} catch (err) {
			console.log('%c Greška u SportsStore ', 'color:red', err);
		}
	};

	//  Load all need data for table
	loadDataOddsTable = async store => {
		try {
			this.loadingOdds = true;
			const resScheduleDay = await agent.SofaLoc.getDayScheduleEventBySport(this.sport, this.searchDay);
			const resScheduleOddsDayOdds = await agent.SofaLoc.getDayScheduleEventOddsBySport(this.sport, this.searchDay);
			runInAction(() => {
				this.scheduleDayAll = this.mapScheduleDay(resScheduleDay.events, resScheduleOddsDayOdds.odds, store);
				const startRow = store.pagingStore.pageSize * (store.pagingStore.currentPage - 1);
				const endRow = startRow + store.pagingStore.pageSize;
				store.pagingStore.setTotalRecords(this.scheduleDayAll.length);
				const data = this.scheduleDayAll.slice(startRow, endRow);
				this.scheduleDay = data;
				this.loadingOdds = false;
			});
		} catch (err) {
			console.log('%c Greška u loadDataOddsTable ', 'color:red', err);
		}
	};

	mapScheduleDay = (scheduleDay, resScheduleOddsDayOdds, store) => {
		let sheduleOdds = Object.entries(resScheduleOddsDayOdds);
		let cleanScheduleDay = filter(scheduleDay, data => {
			// code:60 Posponed, 100-Finished, 7- Live game, 31-HT, 6-additional time
			return (
				data.status.code !== 1 &&
				data.status.code !== 6 &&
				data.status.code !== 7 &&
				data.status.code !== 8 && // in game tennis
				data.status.code !== 9 && // in game tennis
				data.status.code !== 10 && // in game tennis
				data.status.code !== 13 && // in game tennis
				data.status.code !== 31 &&
				data.status.code !== 42 && // extensions
				data.status.code !== 60 &&
				data.status.code !== 70 && // canceled
				data.status.code !== 80 && // in game tennis WOMEN
				data.status.code !== 81 && // extensions
				data.status.code !== 91 &&
				data.status.code !== 92 && // retired
				data.status.code !== 100 &&
				data.status.code !== 110 && // in hockey finished
				data.status.code !== 120 // extensions
			);
		});

		cleanScheduleDay = cleanScheduleDay.map((data, i) => {
			const odds = find(sheduleOdds, dataOdds => +dataOdds[0] === data.id);
			if (odds) {
				return { ...data, odds: odds[1] };
			}
			return { ...data, odds: null };
		});
		cleanScheduleDay = filter(cleanScheduleDay, data => data.odds !== null);

		const mapData = cleanScheduleDay.map((event, num) => {
			return {
				num: num + 1,
				id: event.id,
				idTournament: event.tournament.uniqueTournament.id,
				awayTeam: event.awayTeam.name,
				homeTeam: event.homeTeam.name,
				liga: event.tournament.name,
				category: event?.tournament?.category?.name,
				status: event.status?.code,
				homeOdd: parseFraction(event.odds.choices[0].fractionalValue) + 1,
				drawOdd: event.odds.choices.length === 3 ? parseFraction(event.odds.choices[1].fractionalValue) + 1 : '-',
				awayOdd:
					parseFraction(
						event.odds.choices.length === 3
							? event.odds.choices[2].fractionalValue
							: event.odds.choices[1].fractionalValue
					) + 1,
			};
		});
		if (store?.additionalFilter?.sort === 'asc') {
			const sortData = sortBy(mapData, store?.additionalFilter.column);
			return sortData;
		} else if (store?.additionalFilter?.sort === 'desc') {
			const sortData = sortBy(mapData, store?.additionalFilter.column).reverse();
			return sortData;
		}
		// console.log('%c mapData mapData for ODDS', 'color:pink', mapData);
		return sortBy(mapData, 'category');
	};

	mapDataForTableNew = (standings, tournament) => {
		// console.log('%c 140 standings', 'color:green', standings.length, standings);
		// console.log('%c 141 tournament', 'color:green', tournament.length, tournament);
		this.sportCategories = this.sportCategories.map(data => {
			const thisDay = find(this.sportCategoriesDay, day => day.category.id === data.id);
			return {
				...data,
				eventsNum: thisDay ? thisDay.totalEvents : 0,
				linkImg: data?.alpha2
					? `https://www.sofascore.com/static/images/flags/${data?.alpha2.toLowerCase()}.png`
					: null,
			};
		});

		const mapDataStand = standings.map((data, idx) => {
			let entriesTournament;
			if (tournament.length === standings.length) {
				entriesTournament = Object.entries(tournament[idx][1]);
			} else {
				entriesTournament = Object.entries(tournament[0][1]);
			}
			const mapData = data.rows.map(row => {
				let lastFive;
				const teamLastFiveMatch = find(entriesTournament, data => +data[0] === row.team.id);
				if (teamLastFiveMatch) {
					lastFive = teamLastFiveMatch[1]
						.map(data => {
							if (+data.winnerCode === 3) {
								return { res: 'D', toolTip: this.createTooltip(data) };
							} else if (
								(+data.winnerCode === 1 && +data.homeTeam.id === +teamLastFiveMatch[0]) ||
								(+data.winnerCode === 2 && +data.awayTeam.id === +teamLastFiveMatch[0])
							) {
								return { res: 'W', toolTip: this.createTooltip(data) };
							} else {
								return { res: 'L', toolTip: this.createTooltip(data) };
							}
						})
						.reverse();
				}
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
					lastFive: {
						lastFive: lastFive ?? null,
						homeTeam: row?.team?.name,
					},
					pts: row.points ?? Math.round((row.wins / row.matches) * 100) / 100,
				};
			});
			return { mapData, groupName: Object.keys(standings).length > 1 ? data.name : null };
		});
		return mapDataStand;
	};

	mapDataTopLeagues = data => {
		const { topUniqueTournamentIds, uniqueTournaments } = data;
		let mapData = topUniqueTournamentIds.map(idTable => {
			const removeItem = find(removeEvent, data => data === idTable);
			if (removeItem) {
				return null;
			}
			const tournament = find(uniqueTournaments, data => +data.id === idTable);
			const linkImg = `https://api.sofascore.app/api/v1/unique-tournament/${idTable}/image/dark`;
			return { idTable, tournamentName: tournament.name, linkImg };
		});
		mapData = filter(mapData, data => data !== null);
		return mapData;
	};

	//  Load all SOFA data
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
		} catch (err) {
			console.log('%c Greška u loadAllSportsData ', 'color:red', err);
		}
	};

	getSportCategoriesDay = async () => {
		const response = await agent.SofaLoc.getSportCategoriesDay(this.sport, this.searchDay);
		runInAction(() => {
			this.sportCategoriesDay = response.categories;
		});
	};

	getSportCategories = async () => {
		const response = await agent.SofaLoc.getSportCategories(this.sport);
		runInAction(() => {
			this.sportCategories = sortBy(response.categories, 'name');
		});
	};

	getTournament = async (idTable, season) => {
		const response = await agent.SofaLoc.getTournament(idTable, season);
		runInAction(() => {
			this.resTableData = response;
		});
	};

	getLastFive = async (idTable, season) => {
		const response = await agent.SofaLoc.getLastFive(idTable, season);
		runInAction(() => {
			this.resLastFive = response;
		});
	};

	getHRConfig = async () => {
		const response = await agent.SofaLoc.getHRConfig(this.sport);
		runInAction(() => {
			this.resTopLeaguec = response.data;
		});
	};

	createTooltip = data => {
		return (
			data.homeTeam.name + '-' + data.awayTeam.name + '-' + data.homeScore.normaltime + ':' + data.awayScore.normaltime
		);
	};

	changeDay = (day, storeOdds) => {
		this.searchDay = day;
		this.loadDataOddsTable(storeOdds);
	};

	changeSport = sport => {
		this.sport = sport;
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
