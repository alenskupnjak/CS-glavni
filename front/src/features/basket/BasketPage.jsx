import React from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash-es';
import { Button, Grid, Typography } from '@mui/material';
import BasketSummary from './BasketSummary';
import { useStore } from '../../app/stores/store';
// import { Link } from 'react-router-dom';
import BasketTable from './BasketTable';

function BasketPage(props) {
	const { productStore } = useStore();
	const { basket, checkout } = productStore;

	if (isEmpty(basket?.items)) return <Typography variant="h3">Your basket is empty</Typography>;

	return (
		<React.Fragment>
			<BasketTable isBasket={true} />
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary />
					<Button variant="contained" onClick={() => checkout(basket)} size="large" fullWidth>
						Pogledaj
					</Button>
					{/* <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
						Checkout
					</Button> */}
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default observer(BasketPage);
