import React from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash-es';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import BasketSummary from './BasketSummary';
import { useStore } from '@app/stores/store';
import { useNavigate } from 'react-router-dom';
import BasketTable from './BasketTable';
import { tokens } from '@app/theme/theme';

function BasketPage(props) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { productStore } = useStore();
	const { basket, checkout } = productStore;
	const navigate = useNavigate();

	if (isEmpty(basket?.items)) return <Typography variant="h3">Your basket is empty</Typography>;

	return (
		<React.Fragment>
			<BasketTable isBasket={true} />
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={4.75}>
					<BasketSummary />
					<Button
						variant="contained"
						onClick={() => checkout(navigate)}
						size="large"
						fullWidth
						sx={{ mt: 6, background: colors.grey[500] }}
					>
						Cekiraj
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default observer(BasketPage);
