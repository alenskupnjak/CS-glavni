import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import ProductCard from './ProductCard';

function ProductList({ listaProdukata }) {
	return (
		<Grid container spacing={2}>
			{listaProdukata &&
				listaProdukata.map(product => (
					<Grid item xs={3} key={product.id}>
						<ProductCard product={product} />
					</Grid>
				))}
		</Grid>
	);
}

export default observer(ProductList);
