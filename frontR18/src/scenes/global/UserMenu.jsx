import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import FuseSvgIcon from './FuseSvgIcon';
import { useStore } from '../../app/stores/store';

function UserMenu(props) {
	const { userStore } = useStore();
	let { user } = userStore;

	if (user) {
		user = { ...user, data: 'konj', role: 'Admin', displayName: 'AS' };
	}

	// const user = useSelector(selectUser);

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	if (!user) return;
	return (
		<React.Fragment>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick} color="inherit">
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="font-semibold flex">
						{user.displayName}
					</Typography>
					<Typography className="text-11 font-medium capitalize" color="text.secondary">
						{user.role.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
					</Typography>
				</div>

				{user.data.photoURL ? (
					<Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
				) : (
					<Avatar className="md:mx-4">{user.displayName}</Avatar>
				)}
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				classes={{
					paper: 'py-8',
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<React.Fragment>
						<MenuItem component={Link} to="/sign-in" role="button">
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign In" />
						</MenuItem>
						<MenuItem component={Link} to="/sign-up" role="button">
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign up" />
						</MenuItem>
					</React.Fragment>
				) : (
					<React.Fragment>
						<MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="My Profile" />
						</MenuItem>
						<MenuItem component={Link} to="/login" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</MenuItem>
						<MenuItem
							component={NavLink}
							to="/register"
							onClick={e => {
								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign out" />
						</MenuItem>
					</React.Fragment>
				)}
			</Popover>
		</React.Fragment>
	);
}

export default UserMenu;
