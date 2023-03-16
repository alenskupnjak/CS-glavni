import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import { rootStore } from '@app/stores';

export default function SportsHeader({ storeOdds }) {
	const [value, setValue] = React.useState('one');

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
			>
				<Tab
					icon={<SportsSoccerIcon />}
					iconPosition="top"
					value="one"
					label="Footbal"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('football');
						rootStore.sportsStore.loadSportsTable(17);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					icon={<SportsBasketballIcon />}
					value="two"
					label="Basketbal"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('basketball');
						rootStore.sportsStore.loadSportsTable(138);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					icon={<SportsTennisIcon />}
					iconPosition="top"
					value="three"
					label="Tennis"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('tennis');
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					icon={<SportsHockeyIcon />}
					iconPosition="top"
					value="four"
					label="Hockey"
					onClick={() => {
						storeOdds.pagingStore.currentPage = 1;
						rootStore.sportsStore.changeSport('ice-hockey');
						rootStore.sportsStore.loadSportsTable(225);
						rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
				<Tab
					icon={<SportsHandballIcon />}
					iconPosition="top"
					value="five"
					label="Handball"
					onClick={() => {
						// rootStore.sportsStore.changeSport('ice-hockey');
						// rootStore.sportsStore.loadSportsTable(225);
						// rootStore.sportsStore.loadDataOddsTable(storeOdds);
					}}
				/>
			</Tabs>
		</Box>
	);
}
