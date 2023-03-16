import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { rootStore } from '@app/stores';

export default function SportsHeader({ storeOdds }) {
	const [value, setValue] = React.useState('1');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="secondary tabs example"
				sx={{}}
			>
				<Tab
					sx={{ textTransform: 'none' }}
					icon={<SportsSoccerIcon />}
					iconPosition="top"
					value="1"
					label="Footbal"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('football');
						rootStore.sportsStore.loadSportsTable(17);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					sx={{ textTransform: 'none' }}
					icon={<SportsBasketballIcon />}
					value="2"
					label="Basketbal"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('basketball');
						rootStore.sportsStore.loadSportsTable(138);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					sx={{ textTransform: 'none' }}
					icon={<SportsTennisIcon />}
					iconPosition="top"
					value="3"
					label="Tennis"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('tennis');
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					sx={{ textTransform: 'none' }}
					icon={<SportsHockeyIcon />}
					iconPosition="top"
					value="4"
					label="Hockey"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('ice-hockey');
						rootStore.sportsStore.loadSportsTable(225);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					sx={{ textTransform: 'none' }}
					icon={<SportsHandballIcon />}
					iconPosition="top"
					value="5"
					label="Handball"
					onClick={() => {
						rootStore.sportsStore.changeSport('handball');
						rootStore.sportsStore.loadSportsTable(149);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					sx={{ textTransform: 'none' }}
					icon={<SportsFootballIcon />}
					iconPosition="top"
					value="6"
					label="American-football"
					onClick={() => {
						rootStore.sportsStore.changeSport('american-football');
						rootStore.sportsStore.loadSportsTable(9464);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
			</Tabs>
		</Box>
	);
}
