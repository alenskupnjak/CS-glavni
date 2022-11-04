import React from 'react';
import { Button, Menu, Fade, MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../stores/store';

function SignedInMenu() {
	const { userStore } = useStore();
	const { user, signOut } = userStore;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<Button color="inherit" onClick={handleClick} sx={{ typography: 'h6' }}>
				{user?.email}
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My orders</MenuItem>
				<MenuItem onClick={signOut}>Logout</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

export default observer(SignedInMenu);
