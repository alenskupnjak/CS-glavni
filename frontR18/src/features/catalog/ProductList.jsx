import { Grid } from '@mui/material';
import { observer } from 'mobx-react';

import LoadingComponent from '@app/layout/LoadingComponent';
import { useStore } from '@app/stores/store';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

function ProductList({ listaProdukata }) {
	const { productStore } = useStore();
	const { loading } = productStore;

	if (!listaProdukata && loading) return <LoadingComponent />;
	return (
		<Grid container spacing={2}>
			{listaProdukata &&
				listaProdukata.map(product => (
					<Grid item xs={4} key={product.id}>
						{loading ? <ProductCardSkeleton /> : <ProductCard product={product} />}
					</Grid>
				))}
		</Grid>
	);
}

export default observer(ProductList);
