import { LoadingButton } from '@mui/lab';
import { observer } from 'mobx-react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { currencyFormat } from '../../app/util/util';
import { useStore } from '../../app/stores/store';

function ProductCard({ product }) {
	const { productStore } = useStore();
	const { loadOneItem, handleAddItem, loadingAdd, productName } = productStore;
	const history = useHistory();
	return (
		<Card>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{product.name.slice(0, 2).toUpperCase()}</Avatar>}
				title={product.name}
				titleTypographyProps={{
					sx: { fontWeight: 'bold', color: 'primary.main' },
				}}
			/>
			<CardMedia
				sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
				image={product.pictureUrl}
				title={product.name}
			/>
			<CardContent>
				<Typography gutterBottom color="secondary" variant="h5">
					{currencyFormat(product.price)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.type}
				</Typography>
			</CardContent>
			<CardActions>
				<LoadingButton
					loading={loadingAdd && productName === product.id}
					onClick={() => handleAddItem(product.id)}
					size="small"
				>
					Add to cart
				</LoadingButton>
				<Button variant="contained" onClick={() => loadOneItem(product.id, history)} size="big" color="success">
					Pogledaj
				</Button>
			</CardActions>
		</Card>
	);
}

export default observer(ProductCard);
