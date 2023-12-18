import { useState } from 'react';
import { observer } from 'mobx-react';
import {
	Alert,
	AlertTitle,
	Button,
	ButtonGroup,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
	Box,
} from '@mui/material';

import { useSelector } from 'react-redux';

function AboutPageChild() {
	const { pallete } = useSelector(store => store.theme);

	return (
		<Container>
			<h1 style={{ color: 'red' }}>AboutPage Child</h1>
		</Container>
	);
}

export default observer(AboutPageChild);
