import { makeAutoObservable } from 'mobx';
import { map, find, head, filter, sortBy } from 'lodash-es';
import agent from 'app/api/agent';
import { sportsData } from '@data/sportsData';
import { parseFraction } from '@app/util/util';

export default class SportsStore {
	dataSport = [];
	dataSportTable = [];
	topLeaguesTable = [];
	scheduleDay = [];
	headerTableName = null;
	loading = false;
	idTournament = null;
	constructor() {
		makeAutoObservable(this);
	}

	//  Load all data
	loadAllSportsData = async () => {
		try {
			this.dataSport = map(sportsData, data => {
				return {
					...data,
					active: data.active ? 'Da' : 'Ne',
					has_outrights: data.has_outrights ? 'Da' : 'Ne',
				};
			});
			return this.dataSport;
		} catch (err) {
			console.log('%c Greška u SportsStore ', 'color:red', err);
		}
	};

	//  Load all need data for table
	loadDataTable = async (idTournament = 17, sort = '', colummn = 'tournament.category.name') => {
		this.loading = true;
		this.idTournament = idTournament;

		try {
			//  API API API
			if (process.env.NODE_ENV === 'production') {
				const API = await agent.SofaAPI.getApi(idTournament);
				console.log('%c Production API=', 'color:red', API);
			}

			const season = await agent.SofaLoc.getSeason(idTournament);

			this.headerTableName = season?.data?.seasons[0].name;
			// console.log('%c 001', 'color:green', season);
			const resTableData = await agent.SofaLoc.getTournament(idTournament, season?.data?.seasons[0].id);
			// console.log('%c 002', 'color:green', resTableData);
			const resLastFive = await agent.SofaLoc.getLastFive(idTournament, season?.data?.seasons[0].id);
			// console.log('%c 003', 'color:green', resLastFive);
			const resTopLeaguec = await agent.SofaLoc.getHRConfig();
			// console.log('%c 004', 'color:green', resTopLeaguec);

			const resScheduleDay = await agent.SofaLoc.getDayScheduleEventBySport('football', '2023-03-10');
			const resScheduleOddsDayOdds = await agent.SofaLoc.getDayScheduleEventOddsBySport('football', '2023-03-10');

			const scheduleDay = this.mapScheduleDay(resScheduleDay.events, resScheduleOddsDayOdds.odds, colummn, sort);

			//**************************** */

			// const propertyKey = Object.keys(resLastFive.data.tournamentTeamEvents);
			// console.log('%c 4', 'color:gold', resLastFive.data.tournamentTeamEvents);
			// console.log('%c 5 ', 'color:gold', propertyKey);
			// const propertyValues = Object.values(resLastFive.data.tournamentTeamEvents).map(data => data.key);
			// console.log('%c 10 ', 'color:gold', propertyValues);
			const entriesTournament = head(Object.entries(resLastFive.data.tournamentTeamEvents));
			// console.log('%c 20 ', 'color:gold', entriesTournament);
			//********************************************/// */

			const mapedData = this.mapDataForTable(resTableData.data.standings[0], entriesTournament[1]);
			const mapeTopLeaguesData = this.mapDataTopLeagues(resTopLeaguec.data);

			// console.log('%c 44', 'color:green', mapeTopLeaguesData);

			this.dataSportTable = mapedData;
			this.topLeaguesTable = mapeTopLeaguesData;
			this.scheduleDay = scheduleDay;
			// return scheduleDay;
		} catch (err) {
			console.log('%c Greška u SportsStore ', 'color:red', err);
		}
		this.loading = false;
	};

	mapScheduleDay = (scheduleDay, resScheduleOddsDayOdds, colummn, sort) => {
		// console.log('%c 17 scheduleDay= ', 'color:pink', scheduleDay);
		let sheduleOdds = Object.entries(resScheduleOddsDayOdds);
		// console.log('%c 18 sheduleOdds= ', 'color:pink', sheduleOdds);
		let cleanScheduleDay = filter(scheduleDay, data => {
			// code:60 Posponed, 100-Finished, 7- Live game, 31-HT, 6- additional time
			return (
				data.status.code !== 100 &&
				data.status.code !== 60 &&
				data.status.code !== 7 &&
				data.status.code !== 31 &&
				data.status.code !== 6
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
		cleanScheduleDay = sortBy(cleanScheduleDay, colummn);
		// console.log('%c cleanScheduleDay =', 'color:blue', cleanScheduleDay);
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
		const mapData = topUniqueTournamentIds.map(idTournament => {
			const tournament = find(uniqueTournaments, data => +data.id === idTournament);

			// console.log('%c 00', 'color:green', tournament);
			const linkImg = `https://api.sofascore.app/api/v1/unique-tournament/${idTournament}/image/dark`;
			return { idTournament, tournamentName: tournament.name, linkImg };
		});
		return mapData;
	};

	destroy = () => {
		this.dataSportTable = [];
		console.log('%c 007 ODLAZIM iz class SportsStore ', 'color:red');
	};

	componentDidMount() {
		console.log('%c 008 componentDidMount BOOM', 'color:gold');
	}

	componentWillUnmount() {
		console.log('%c 009 componentWillUnmount BOOM', 'color:gold');
	}
}
