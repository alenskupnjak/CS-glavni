import React from 'react';
import { useState, useEffect } from 'react';
import ProductList from './ProductList';

export default function Catalog() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5030/api/products')
			.then(response => response.json())
			.then(data => setProducts(data));
	}, []);

	console.log('%c 00 products', 'color:green', products);

	return (
		<React.Fragment>
			<ProductList products={products} />
		</React.Fragment>
	);
}
