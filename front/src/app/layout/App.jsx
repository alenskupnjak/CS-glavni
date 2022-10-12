import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [product, setProduct] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5030/api/products').then(res => res.json().then(data => setProduct(data)));
	}, []);

	console.log('%c 00 ', 'color:green', product);

	return (
		<div className="App">
			<header className="App-header">
				<p>Ajmooooooo</p>

				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
