import { makeAutoObservable } from 'mobx';
import { map, find } from 'lodash-es';
import agent from 'app/api/agent';
import { sportsData } from '@data/sportsData';

export default class SportsStore {
	dataSport = [];
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

	//  Load all data
	loadDataTable = async () => {
		this.loading = true;
		try {
			const resTableData = await agent.Sofa.getTournament();
			const resLastFive = await agent.Sofa.getLastFive();

			const mapedData = this.mapDataForPL(resTableData.data.standings[0], resLastFive.data.tournamentTeamEvents[1]);

			this.dataSport = mapedData;
		} catch (err) {
			console.log('%c Greška u SportsStore ', 'color:red', err);
		}
		this.loading = false;
	};

	mapDataForPL = (data, tournament) => {
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
