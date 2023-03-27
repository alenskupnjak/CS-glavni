import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Typography, useTheme } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SvgIcon from '../icons/SvgIcon';
import { tokens } from '../theme/theme';

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens[theme.palette.mode];
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const RightMenu = () => {
	const theme = useTheme();
	const colors = tokens[theme.palette.mode];
	const [selected, setSelected] = useState('Dashboard');

	return (
		<Box
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary[400]} !important`,
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important',
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important',
				},
				'& .pro-inner-item:hover': {
					color: 'gold !important',
				},
				'& .pro-menu-item.active': {
					color: '#6870fa !important',
				},
			}}
		>
			<ProSidebar collapsed={false} width="220px">
				<Menu iconShape="square">
					<Box>
						<Item
							title="Dashboard"
							to="/dashboard"
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Example1"
							to="/example1"
							icon={<SvgIcon>heroicons-solid:microphone</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Example2"
							to="/example2"
							icon={<SvgIcon>heroicons-solid:moon</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default observer(RightMenu);
