import { makeAutoObservable } from 'mobx';
import { map, find, head } from 'lodash-es';
import agent from 'app/api/agent';
import { sportsData } from '@data/sportsData';

export default class SportsStore {
	dataSport = [];
	dataSportTable = [];
	topLeaguesTable = [];
	headerTableName = null;
	loading = false;
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
	loadDataTable = async (idTournament = 17) => {
		this.loading = true;
		try {
			const season = await agent.Sofa.getSeason(idTournament);
			this.headerTableName = season?.data?.seasons[0].name;
			// console.log('%c 001', 'color:green', season);
			const resTableData = await agent.Sofa.getTournament(idTournament, season?.data?.seasons[0].id);
			// console.log('%c 002', 'color:green', resTableData);
			const resLastFive = await agent.Sofa.getLastFive(idTournament, season?.data?.seasons[0].id);
			// console.log('%c 003', 'color:green', resLastFive);
			const resTopLeaguec = await agent.Sofa.getHRConfig();
			// console.log('%c 004', 'color:green', resTopLeaguec);

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
		} catch (err) {
			console.log('%c Greška u SportsStore ', 'color:red', err);
		}
		this.loading = false;
	};

	mapDataForTable = (data, tournament) => {
		console.log('%c 00', 'color:blue', data);
		console.log('%c 01', 'color:blue', tournament);

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
