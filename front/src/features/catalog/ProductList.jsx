import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
	return (
		<Grid container spacing={2}>
			{products.map(product => (
				<Grid item xs={3} key={product.id}>
					<ProductCard product={product} />
				</Grid>
			))}
		</Grid>
	);
}
