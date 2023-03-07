import * as React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import 'react-pro-sidebar/dist/css/styles.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import SvgIcon from '@app/icons/SvgIcon';

import { tokens } from '../theme/theme';
import { useStore } from '../stores/store';

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

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { userStore } = useStore();
	const { user } = userStore;
	const [isCollapsed, setIsCollapsed] = useState(false);
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
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : null}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
								<Typography variant="h3" color={colors.grey[100]}>
									ADMINIS
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb="25px">
							<Box display="flex" justifyContent="center" alignItems="center">
								<img
									alt="profile-user"
									width="100px"
									height="100px"
									src={`../../images/number_4.png`}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/>
							</Box>
							<Box textAlign="center">
								<Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
									AS
								</Typography>
								<Typography variant="h5" color={colors.greenAccent[500]}>
									Admin
								</Typography>
							</Box>
						</Box>
					)}

					<Box paddingLeft={isCollapsed ? null : '5%'}>
						<Item
							title="Dashboard"
							to="/dashboard"
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
							Sport Odds
						</Typography>
						<Item
							title="Premiere League EN"
							to="/table-pl"
							icon={<img src={'./images/PLdark.png'} width="25px" height="25px" />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Sports"
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
						<SubMenu
							title="Charts"
							icon={
								<SvgIcon fill="currentColor" color="info">
									material-solid:waterfall_chart
								</SvgIcon>
							}
						>
							<Item
								title="Bar Chart"
								to="/bar"
								icon={<BarChartOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
							<Item
								title="Pie Chart"
								to="/pie"
								icon={<PieChartOutlineOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
							<Item
								title="Line Chart"
								to="/line"
								icon={<TimelineOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
						</SubMenu>

						<Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
							Products
						</Typography>
						<Item
							title="Catalog"
							to="/catalog"
							icon={<SvgIcon>heroicons-outline:newspaper</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="About"
							to="/about"
							icon={<RunningWithErrorsIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="React-toastify"
							to="/react-toastify"
							icon={<SvgIcon>heroicons-outline:chip</SvgIcon>}
							selected={selected}
							setSelected={setSelected}
						/>
						{user && user.roles?.includes('Admin') && (
							<SubMenu open={true} title="Admin" icon={<MapOutlinedIcon />}>
								<Item
									title="Chart"
									to="/chartZaba"
									icon={<DonutLargeIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Inventory"
									to="/inventory"
									icon={<BarChartOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Import File"
									to="/import-file-old"
									icon={<PublishOutlinedIcon />}
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
							</SubMenu>
						)}
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default observer(Sidebar);
