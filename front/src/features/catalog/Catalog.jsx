import React from 'react';
import { observer } from 'mobx-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProductList from './ProductList';

function Catalog(props) {
	const { productStore } = useStore();
	const { listaProdukata, loading } = productStore;

	if (loading) return <LoadingComponent message="Loading products..." />;

	return (
		<React.Fragment>
			<ProductList listaProdukata={listaProdukata} />
		</React.Fragment>
	);
}

export default observer(Catalog);
