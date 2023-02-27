import React from 'react';
import { observer } from 'mobx-react';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import AppTextInput from '../../app/components/AppTextInput';
import { StripeInput } from './StripeInput';

function PaymentForm({ cardState, onCardInputChange }) {
	const { control } = useFormContext();

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Payment method
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<AppTextInput name="nameOnCard" label="Name on card" control={control} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						onChange={onCardInputChange}
						error={!!cardState.elementError.cardNumber}
						helperText={cardState.elementError.cardNumber}
						label="Card number"
						fullWidth
						autoComplete="cc-number"
						variant="outlined"
						InputLabelProps={{ shrink: true }}
						InputProps={{
							inputComponent: StripeInput,
							inputProps: {
								component: CardNumberElement,
							},
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						onChange={onCardInputChange}
						error={!!cardState.elementError.cardExpiry}
						helperText={cardState.elementError.cardExpiry}
						id="expDate"
						label="Expiry date"
						fullWidth
						autoComplete="cc-exp"
						variant="outlined"
						InputLabelProps={{ shrink: true }}
						InputProps={{
							inputComponent: StripeInput,
							inputProps: {
								component: CardExpiryElement,
							},
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						onChange={onCardInputChange}
						error={!!cardState.elementError.cardCvc}
						helperText={cardState.elementError.cardCvc}
						id="cvv"
						label="CVV"
						fullWidth
						autoComplete="cc-csc"
						variant="outlined"
						InputLabelProps={{ shrink: true }}
						InputProps={{
							inputComponent: StripeInput,
							inputProps: {
								component: CardCvcElement,
							},
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox color="secondary" name="saveCard" value="yes" />}
						label="Remember credit card details for next time"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default observer(PaymentForm);
