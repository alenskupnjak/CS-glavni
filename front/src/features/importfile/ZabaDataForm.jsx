import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
// import { observer } from 'mobx-react';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import AppSelectList from '../../app/components/AppSelectList';
// import AppTextInput from '../../app/components/AppTextInput';
// import agent from '../../app/api/agent';
import { validationSchema } from './zabaValidation';
import agent from '../../app/api/agent';
// import AppTextInput from '../../app/components/AppTextInput';

function ZabaDataForm({ state, handleClose }) {
	const { modalData, ZabaKategorije } = state;

	// console.log('%c 00 ', 'color:green', ZabaKategorije);

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isSubmitting },
	} = useForm({
		criteriaMode: 'all',
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		// https://react-hook-form.com/api/useform/reset
		// popunjava formu!
		if (modalData && !isDirty) reset(modalData);

		// ovaj return se okida kada je komponenta destroyed
		return () => {
			// Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
		};
	}, [reset, isDirty, modalData]);

	async function handleSubmitData(data) {
		try {
			console.log('%c 13 ', 'color:green', data.isActive, typeof data.isActive);
			if (isDirty) {
				if (typeof data.isActive === 'string') {
					data.isActive = data.isActive === 'true' ? true : false;
				} else {
					data.isActive = data.isActive ?? false;
				}
				console.log('%c 14 ', 'color:red', data);
				await agent.ReadWriteDatabase.updateZabaRecord(data);
			}
			handleClose();
		} catch (error) {
			console.log(error);
		}
	}

	const vrijednostiActive = ['true', 'false'];

	return (
		<Box component={Paper} sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
				Zaba data
			</Typography>
			<form onSubmit={handleSubmit(handleSubmitData)}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<AppSelectList items={ZabaKategorije} control={control} name="kategorija" label="Kategorija" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppSelectList items={vrijednostiActive} control={control} name="isActive" label="Active" />
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
					<Button onClick={handleClose} variant="contained" color="inherit">
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

export default ZabaDataForm;
