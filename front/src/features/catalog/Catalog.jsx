import React from 'react';
import { useState, useEffect } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import ProductList from './ProductList';

export default function Catalog() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		agent.Catalog.list()
			.then(res => setProducts(res.data))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Loading products..." />;

	return (
		<React.Fragment>
			<ProductList products={products} />
		</React.Fragment>
	);
}
