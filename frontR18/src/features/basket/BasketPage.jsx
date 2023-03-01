import React from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash-es';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import BasketSummary from './BasketSummary';
import { useStore } from '@app/stores/store';
import BasketTable from './BasketTable';
import ColorSet from '@app/theme/colorSet';

function BasketPage(props) {
	const { productStore } = useStore();
	const { basket, checkout } = productStore;
	const navigate = useNavigate();

	if (isEmpty(basket?.items)) return <Typography variant="h3">Your basket Page is empty</Typography>;

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
						sx={{ mt: 6, background: ColorSet().grey[500] }}
					>
						Cekiraj
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default observer(BasketPage);
