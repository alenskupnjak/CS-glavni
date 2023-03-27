import React from 'react';
import { observer } from 'mobx-react';
import { useDispatch, useSelector } from 'react-redux';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import SvgIcon from '../icons/SvgIcon';
import { tokens } from '../theme/theme';
import { changeTheme } from '@app/stores/redux/themeSlice';

const Item = ({ title, icon, selected, mainTheme }) => {
	const dispatch = useDispatch();
	const { pallete } = useSelector(store => store.theme);
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: tokens[pallete].grey[100],
			}}
			onClick={() => dispatch(changeTheme(mainTheme))}
			icon={icon}
		>
			<Typography>{title}</Typography>
		</MenuItem>
	);
};

const RightMenu = () => {
	const { pallete } = useSelector(store => store.theme);
	const colors = tokens[pallete];

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
						<Item title="Dark" mainTheme="dark" icon={<HomeOutlinedIcon />} />
						<Item title="Light" mainTheme="light" icon={<SvgIcon>heroicons-solid:microphone</SvgIcon>} />
						<Item title="Pink" mainTheme="pink" icon={<SvgIcon>heroicons-solid:moon</SvgIcon>} />
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default observer(RightMenu);
