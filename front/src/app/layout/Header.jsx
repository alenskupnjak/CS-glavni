import { AppBar, Switch, Toolbar, Typography } from '@mui/material';

export default function Header({ darkMode, handleThemeChange }) {
	return (
		<AppBar position="static" sx={{ mb: 3 }}>
			<Toolbar>
				<Typography variant="h6">RE-STORE </Typography>
				<Typography variant="h6">RE-STORE </Typography>
				<Typography variant="h6">RE-STORE </Typography>
				<Switch checked={darkMode} onChange={handleThemeChange} />
			</Toolbar>
		</AppBar>
	);
}
