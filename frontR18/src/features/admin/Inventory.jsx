import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
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
	Container,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Edit, Delete } from '@mui/icons-material';
import { currencyFormat } from '../../@app/util/util';
import AppPagination from '../../app/components/AppPagination';
import { useStore } from '@app/stores/store';
import LoadingComponent from '@app/layout/LoadingComponent';
import ColorSet from '@app/theme/colorSet';

function Inventory() {
	const { productStore } = useStore();
	const navigate = useNavigate();
	const color1 = ColorSet().blueAccent[600];
	const color2 = ColorSet().grey[500];
	const { listaProdukata, metaData, handleDeleteProduct, loading, targetProduct, handlePaging, destroy } = productStore;

	let initialized = false;
	useEffect(() => {
		if (!initialized) {
			console.log('%c 00 ', 'color:green');
		}

		// ovaj return se okida kada je komponenta destroyed
		return () => {
			if (initialized) destroy();
			// eslint-disable-next-line react-hooks/exhaustive-deps
			initialized = true;
			// Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading || listaProdukata === null) return <LoadingComponent message="Loading orders..." />;

	return (
		<Container>
			<Box display="flex" justifyContent="space-between">
				<Typography sx={{ p: 2 }} variant="h4">
					Inventory
				</Typography>
				<Button
					onClick={() => navigate('/product/new')}
					sx={{ m: 2, bgcolor: color1 }}
					size="large"
					variant="contained"
				>
					Create
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID#</TableCell>
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
									<Button
										onClick={() => navigate(`/product/${product.id}`)}
										startIcon={<Edit />}
										sx={{
											bgcolor: color1,
											':hover': {
												bgcolor: color2,
											},
										}}
									/>
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
		</Container>
	);
}

export default observer(Inventory);
