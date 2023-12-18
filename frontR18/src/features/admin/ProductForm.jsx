import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { observer } from 'mobx-react';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import AppDropzone from '../../app/components/AppDropzone';
import AppSelectList from '../../app/components/AppSelectList';
import AppTextInput from '../../app/components/AppTextInput';
import { validationSchema } from './productValidation';
import agent from 'app/api/agent';
import { useStore } from '@app/stores/store';
import { useParams } from 'react-router-dom';

function ProductForm() {
	const navigate = useNavigate();
	const { productStore } = useStore();
	const { filters, loadOneItem, productForm, loadAllProduct, loading } = productStore;
	const { id } = useParams();

	const {
		control,
		reset,
		handleSubmit,
		watch,
		formState: { isDirty, isSubmitting },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(validationSchema),
	});

	const watchFile = watch('file', null);

	let initialized = false;
	useEffect(() => {
		if (!initialized) {
			loadOneItem(id, null, reset);
			console.log('%c START 02 ', 'color:gold', id, productForm?.id, productForm);
			// reset(productForm);
		}
		// https://react-hook-form.com/api/useform/reset
		// popunjava formu!

		// ovaj return se okida kada je komponenta destroyed
		return () => {
			// Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
			if (watchFile) URL.revokeObjectURL(watchFile.preview);
			initialized = true;
			console.log('%c BOOM= ', 'color:green', id, productForm);
		};
	}, []);

	async function handleSubmitData(data) {
		try {
			if (isDirty) {
				if (productForm) {
					await agent.Admin.updateProduct(data);
				} else {
					await agent.Admin.createProduct(data);
				}
				loadAllProduct();
			}
		} catch (error) {
			console.log(error);
		} finally {
			navigate('/inventory');
		}
	}

	return (
		<Box component={Paper} sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
				Product Details
			</Typography>
			<form onSubmit={handleSubmit(handleSubmitData)}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<AppTextInput control={control} name="name" label="Product name" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppSelectList items={filters.brands} control={control} name="brand" label="Brand" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppSelectList items={filters.types} control={control} name="type" label="Type" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextInput type="number" control={control} name="price" label="Price" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextInput type="number" control={control} name="quantityInStock" label="Quantity in Stock" />
					</Grid>
					<Grid item xs={12}>
						<AppTextInput multiline={true} rows={4} control={control} name="description" label="Description" />
					</Grid>
					<Grid item xs={12}>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<AppDropzone control={control} name="file" />
							{watchFile ? (
								<img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
							) : (
								<img src={productForm?.pictureUrl} alt={productForm?.name} style={{ maxHeight: 200 }} />
							)}
						</Box>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
					<Button onClick={() => navigate('/inventory')} variant="contained" color="inherit">
						Cancel
					</Button>
					<LoadingButton loading={isSubmitting} type="submit" variant="contained" color="success">
						Submit
					</LoadingButton>
				</Box>
			</form>
		</Box>
	);
}

export default observer(ProductForm);
