import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, Typography, useTheme } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SvgIcon from '../icons/SvgIcon';
import { tokens } from '../theme/theme';

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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
	const colors = tokens(theme.palette.mode);
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
						<Item
							title="Example3"
							to="/example3"
							icon={<SvgIcon>heroicons-solid:ticket</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Example4"
							to="/example4"
							icon={<SvgIcon>heroicons-solid:trash</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Redux"
							to="/cart-container"
							icon={<SvgIcon>heroicons-solid:view-grid</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
							Sport Odds
						</Typography>
						<Item
							title="Sports"
							to="/table-pl"
							icon={<SportsBaseballIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Sports List"
							to="/sports-list"
							icon={<SvgIcon fill="currentColor">material-solid:sports</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>
						<Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
							Data
						</Typography>
						<Item
							title="Manage Team"
							to="/team"
							icon={<PeopleOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Contacts Information"
							to="/contacts"
							icon={<ContactsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Invoices Balances"
							to="/invoices"
							icon={<ReceiptOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
							Pages
						</Typography>
						<Item
							title="Formic Profile Form"
							to="/form"
							icon={<PersonOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Calendar"
							to="/calendar"
							icon={<CalendarTodayOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="FAQ Page"
							to="/faq"
							icon={<HelpOutlineOutlinedIcon />}
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
