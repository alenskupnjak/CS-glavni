import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './checkoutValidation';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { useStore } from '../../app/stores/store';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <Review />;
		case 2:
			return <PaymentForm />;
		default:
			throw new Error('Unknown step');
	}
}

export default function CheckoutPage() {
	const { productStore } = useStore();
	const { clearBasket } = productStore;
	const [activeStep, setActiveStep] = useState(0);
	const [orderNumber, setOrderNumber] = useState(0);
	const [loading, setLoading] = useState(false);

	const currentValidationSchema = validationSchema[activeStep];

	const methods = useForm({
		mode: 'all',
		resolver: yupResolver(currentValidationSchema),
	});

	useEffect(() => {
		agent.Account.fetchAddress().then(response => {
			console.log('%c 00 response', 'color:blue', response);

			if (response) {
				methods.reset({ ...methods.getValues(), ...response.data, saveAddress: false });
				// methods.reset({ ...response.data, saveAddress: false });
			}
		});
	}, [methods]);

	const handleNext = async data => {
		console.log('%c 00 data ', 'color:green', data);

		const { nameOnCard, saveAddress, ...shippingAddress } = data;
		if (activeStep === 2) {
			setLoading(true);
			try {
				const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress });
				setOrderNumber(orderNumber);
				setActiveStep(activeStep + 1);
				clearBasket();
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		} else {
			setActiveStep(activeStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<FormProvider {...methods}>
			<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
				<Typography component="h1" variant="h4" align="center">
					Naplata
				</Typography>
				<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<React.Fragment>
					{activeStep === steps.length ? (
						<div>
							<Typography variant="h5" gutterBottom>
								Thank you for your order.
							</Typography>
							<Typography variant="subtitle1">
								Your order number is #{orderNumber}. We have not emailed your order confirmation, and will not send you
								an update when your order has shipped as this is a fake store!
							</Typography>
						</div>
					) : (
						<form onSubmit={methods.handleSubmit(handleNext)}>
							{getStepContent(activeStep)}
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
										Back
									</Button>
								)}
								<LoadingButton
									loading={loading}
									disabled={!methods.formState.isValid}
									variant="contained"
									type="submit"
									sx={{ mt: 3, ml: 1 }}
								>
									{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
								</LoadingButton>
							</Box>
						</form>
					)}
				</React.Fragment>
			</Paper>
		</FormProvider>
	);
}
