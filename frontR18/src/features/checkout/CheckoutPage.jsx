import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography, useTheme, Container } from '@mui/material';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './checkoutValidation';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { useStore } from '@app/stores/store';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { tokens } from '@app/theme/theme';
import { toast } from 'react-toastify';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function CheckoutPage() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { productStore } = useStore();
	const { clearBasket, basket } = productStore;
	const [activeStep, setActiveStep] = useState(0);
	const [orderNumber, setOrderNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const [cardState, setCardState] = useState({ elementError: {} });
	const [cardComplete, setCardComplete] = useState({ cardNumber: false, cardExpiry: false, cardCvc: false });
	const [paymentMessage, setPaymentMessage] = useState('');
	const [paymentSucceeded, setPaymentSucceeded] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	// ON CHANGE ON CHANGE
	function onCardInputChange(event) {
		setCardState({
			...cardState,
			elementError: {
				...cardState.elementError,
				[event.elementType]: event.error?.message,
			},
		});
		setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
	}

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <AddressForm />;
			case 1:
				return <Review />;
			case 2:
				return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} />;
			default:
				throw new Error('Nepoznati korak...');
		}
	}

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

	// NEXT NEXT
	const handleNext = async dataForm => {
		console.log('%c 31 dataForm', 'color:red', activeStep, dataForm);

		if (activeStep === 2) {
			setLoading(true);
			const { nameOnCard, saveAddress, ...shippingAddress } = dataForm;
			if (!stripe || !elements) return; // stripe not ready
			try {
				const cardElement = elements.getElement(CardNumberElement);
				console.log('%c 32 cardElement ', 'color:red', cardElement);
				console.log('%c 33 BASKET ', 'color:red', basket);

				const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret, {
					payment_method: {
						card: cardElement,
						billing_details: {
							name: nameOnCard,
						},
					},
				});
				console.log('%c 50 paymentResult ', 'color:green', paymentResult);
				if (paymentResult.paymentIntent?.status === 'succeeded') {
					const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress });
					setOrderNumber(orderNumber);
					setPaymentSucceeded(true);
					setPaymentMessage('Thank you - we have received your payment');
					setActiveStep(activeStep + 1);
					clearBasket();
					toast.success('Thank you - we have received your payment.');
				} else {
					setPaymentMessage(paymentResult.error?.message);
					setPaymentSucceeded(false);
					setActiveStep(activeStep + 1);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		} else {
			setActiveStep(activeStep + 1);
		}
	};

	// GOBACK GOBACK GOBACK GOBACK GOBACK
	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	// DISABLED DISABLED DISABLED DISABLED DISABLED
	function submitDisabled() {
		if (activeStep === 2) {
			return (
				!cardComplete.cardCvc || !cardComplete.cardExpiry || !cardComplete.cardNumber || !methods.formState.isValid
			);
		} else {
			return !methods.formState.isValid;
		}
	}

	return (
		<Container sx={{ bgcolor: colors.grey[600] }}>
			<FormProvider {...methods} sx={{ bgcolor: colors.grey[500] }}>
				<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, bgcolor: colors.grey[600] }}>
					<p> Generic decline 4000000000000002 card_declined generic_decline</p>
					<p> Incorrect CVC decline 4000000000000127 incorrect_cvc n/a</p>
					<p> Processing error decline 4000000000000119 processing_error n/a</p>
					<p> Lost card decline 4000000000009987 card_declined lost_card</p>
					<p> Stolen card decline 4000000000009979 card_declined stolen_card</p>
					<p> Insufficient funds decline 4000000000009995 card_declined insufficient_funds</p>
					<p> Expired card decline 4000000000000069 expired_card n/a</p>
					<p> Incorrect number decline 4242424242424241 incorrect_number n/a</p>
					<Typography component="h1" variant="h4" align="center">
						<p> Kartica OK: 4242 4242 4242 4242</p>
						<p> Kartica odbijena: 4000 0000 0000 0002</p>
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
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									{paymentMessage}
								</Typography>
								{paymentSucceeded ? (
									<Typography variant="subtitle1" sx={{ bgcolor: colors.greenAccent[500] }}>
										Your order number is #{orderNumber}. We have not emailed your order confirmation, and will not send
										you an update when your order has shipped as this is a fake store!
									</Typography>
								) : (
									<Button variant="contained" onClick={handleBack}>
										Go back and try again
									</Button>
								)}
							</React.Fragment>
						) : (
							<form onSubmit={methods.handleSubmit(handleNext)}>
								{getStepContent(activeStep)}
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									{activeStep !== 0 && (
										<Button
											onClick={handleBack}
											sx={{
												mt: 3,
												ml: 1,
												bgcolor: colors.greenAccent[400],
												':hover': {
													bgcolor: colors.blueAccent[500],
												},
											}}
										>
											Back
										</Button>
									)}
									<LoadingButton
										loading={loading}
										disabled={submitDisabled()}
										variant="contained"
										type="submit"
										sx={{
											mt: 3,
											ml: 1,
											':hover': {
												bgcolor: colors.blueAccent[500], // theme.palette.primary.main
												color: 'white',
											},
											bgcolor: colors.grey[500],
										}}
									>
										{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
									</LoadingButton>
								</Box>
							</form>
						)}
					</React.Fragment>
				</Paper>
			</FormProvider>
		</Container>
	);
}

export default observer(CheckoutPage);
