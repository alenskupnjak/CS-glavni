import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
	Typography,
	Button,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Edit, Delete } from '@mui/icons-material';
import { currencyFormat } from '../../app/util/util';
import AppPagination from '../../app/components/AppPagination';
import ProductForm from './ProductForm';
import { useStore } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';

function Inventory() {
	const { productStore } = useStore();
	const { listaProdukata, metaData, handleDeleteProduct, loading, targetProduct, handlePaging } = productStore;
	const [editMode, setEditMode] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	function handleSelectProduct(product) {
		setSelectedProduct(product);
		setEditMode(true);
	}

	function cancelEdit() {
		if (selectedProduct) setSelectedProduct(null);
		setEditMode(false);
	}

	if (loading || listaProdukata === null) return <LoadingComponent message="Loading orders..." />;
	if (editMode) return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />;

	return (
		<React.Fragment>
			<Box display="flex" justifyContent="space-between">
				<Typography sx={{ p: 2 }} variant="h4">
					Inventory
				</Typography>
				<Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size="large" variant="contained">
					Create
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell align="left">Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="center">Type</TableCell>
							<TableCell align="center">Brand</TableCell>
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{listaProdukata.map(product => (
							<TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{product.id}
								</TableCell>
								<TableCell align="left">
									<Box display="flex" alignItems="center">
										<img src={product.pictureUrl} alt={product.name} style={{ height: 50, marginRight: 20 }} />
										<span>{product.name}</span>
									</Box>
								</TableCell>
								<TableCell align="right">{currencyFormat(product.price)}</TableCell>
								<TableCell align="center">{product.type}</TableCell>
								<TableCell align="center">{product.brand}</TableCell>
								<TableCell align="center">{product.quantityInStock}</TableCell>
								<TableCell align="right">
									<Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
									<LoadingButton
										loading={loading && targetProduct === product.id}
										startIcon={<Delete />}
										color="error"
										onClick={() => handleDeleteProduct(product.id)}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{metaData && (
				<Box sx={{ pt: 2 }}>
					<AppPagination metaData={metaData} handlePaging={pageNumber => handlePaging(pageNumber, 'Inventory')} />
				</Box>
			)}
		</React.Fragment>
	);
}

export default observer(Inventory);
