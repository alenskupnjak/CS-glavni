import { LoadingButton } from '@mui/lab';
import { observer } from 'mobx-react';
import {
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
	Container,
} from '@mui/material';
import NotFound from '@app/errors/NotFound';
import { useStore } from '@app/stores/store';
import { tokens } from '@app/theme/theme';
import { useSelector } from 'react-redux';

function ProductDetails() {
	const { pallete } = useSelector(store => store.theme);
	const colors = tokens[pallete];
	const { productStore } = useStore();
	const { product, handleInputChange, quantity, handleUpdateCart, item, loading } = productStore;

	if (!product) return <NotFound />;
	return (
		<Container sx={{ mt: 6, background: colors.grey[500] }}>
			<Grid container spacing={6}>
				<Grid item xs={6}>
					<img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
				</Grid>
				<Grid item xs={6}>
					<Typography variant="h3">{product.name}</Typography>
					<Divider sx={{ mb: 2 }} />
					<Typography variant="h4" color="secondary">
						${(product.price / 100).toFixed(2)}
					</Typography>
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>{product.name}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Description</TableCell>
									<TableCell>{product.description}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Type</TableCell>
									<TableCell>{product.type}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Brand</TableCell>
									<TableCell>{product.brand}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Quantity in stock</TableCell>
									<TableCell>{product.quantityInStock}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								variant="outlined"
								type="number"
								label="Quantity in Cart"
								fullWidth
								value={quantity}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<LoadingButton
								disabled={item?.quantity === quantity || quantity === 0}
								loading={loading}
								onClick={() => handleUpdateCart(product.id, quantity)}
								sx={{ height: '55px' }}
								color="primary"
								size="large"
								variant="contained"
								fullWidth
							>
								{item ? 'Update Quantity' : 'Add to Cart'}
							</LoadingButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default observer(ProductDetails);
