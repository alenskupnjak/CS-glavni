import { ShoppingCart } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';

const midLinks = [
	{ title: 'catalog', path: '/catalog' },
	{ title: 'about', path: '/about' },
	{ title: 'contact', path: '/contact' },
];

const rightLinks = [
	{ title: 'login', path: '/login' },
	{ title: 'register', path: '/register' },
];

const navStyles = {
	color: 'inherit',
	textDecoration: 'none',
	typography: 'h6',
	'&:hover': {
		color: 'grey.500',
	},
	'&.active': {
		color: 'text.secondary',
	},
};

function Header({ darkMode, handleThemeChange }) {
	const { productStore } = useStore();
	const { itemCount } = productStore;
	return (
		<AppBar position="static" sx={{ mb: 4 }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Box display="flex" alignItems="center">
					<Typography variant="h6" component={NavLink} exact to="/" sx={navStyles}>
						RE-STORE
					</Typography>
					<Switch checked={darkMode} onChange={handleThemeChange} />
				</Box>
				<List sx={{ display: 'flex' }}>
					{midLinks.map(({ title, path }) => (
						<ListItem component={NavLink} to={path} key={path} sx={navStyles}>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>
				<Box display="flex" alignItems="center">
					<IconButton component={Link} to="/basket" size="large" sx={{ color: 'inherit' }}>
						<Badge badgeContent={itemCount} color="secondary">
							<ShoppingCart />
						</Badge>
					</IconButton>
					<List sx={{ display: 'flex' }}>
						{rightLinks.map(({ title, path }) => (
							<ListItem component={NavLink} to={path} key={path} sx={navStyles}>
								{title.toUpperCase()}
							</ListItem>
						))}
					</List>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default observer(Header);
