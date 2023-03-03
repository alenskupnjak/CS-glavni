import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Link, useLocation } from 'react-router-dom';
import { Box, IconButton, useTheme, Badge } from '@mui/material';
import { ColorModeContext, tokens } from '../theme/theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import UserMenu from '@app/layout/UserMenu';
import { useStore } from '../stores/store';

const Topbar = () => {
	const { productStore } = useStore();
	const { itemCount } = productStore;
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const currentRoutePath = useLocation().pathname;

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			{/* SEARCH BAR */}
			<Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>

			{/* ICONS */}
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
				</IconButton>
				<IconButton>
					<NotificationsOutlinedIcon />
				</IconButton>
				<IconButton>
					<SettingsOutlinedIcon />
				</IconButton>
				<IconButton>
					<PersonOutlinedIcon />
				</IconButton>
				{(currentRoutePath.includes('catalog') || currentRoutePath.includes('basket')) && (
					<IconButton component={Link} to="/basket" size="large" sx={{ color: 'inherit' }}>
						<Badge badgeContent={itemCount} color="secondary">
							<ShoppingCart />
						</Badge>
					</IconButton>
				)}
				<UserMenu />
			</Box>
		</Box>
	);
};

export default observer(Topbar);
