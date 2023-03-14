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

export default function ColorTabs() {
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
						rootStore.sportsStore.changeSport('football');
						rootStore.sportsStore.loadFootballTable(17);
					}}
				/>
				<Tab
					icon={<SportsBasketballIcon />}
					value="two"
					label="Basketbal"
					onClick={() => {
						rootStore.sportsStore.changeSport('basketball');
						rootStore.sportsStore.loadBasketballTable(132);
					}}
				/>
				<Tab
					icon={<SportsTennisIcon />}
					iconPosition="top"
					value="three"
					label="Tennis"
					onClick={() => {
						rootStore.sportsStore.changeSport('tennis');
					}}
				/>
				<Tab icon={<SportsHockeyIcon />} iconPosition="top" label="Hockey" />
				<Tab icon={<SportsHandballIcon />} iconPosition="top" label="HandBall" />
			</Tabs>
		</Box>
	);
}
