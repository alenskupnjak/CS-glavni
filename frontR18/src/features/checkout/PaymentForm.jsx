import React from 'react';
import { observer } from 'mobx-react';
import { useFormContext } from 'react-hook-form';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, Container, useTheme } from '@mui/material';
import { tokens } from '@app/theme/theme';

import TextField from '@mui/material/TextField';
import AppTextInput from '../../app/components/AppTextInput';
import { StripeInput } from './StripeInput';

function PaymentForm({ cardState, onCardInputChange }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { control } = useFormContext();

	return (
		<Container>
			<Typography variant="h6" gutterBottom>
				Payment method
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<AppTextInput
						name="nameOnCard"
						label="Name on card"
						control={control}
						sx={{ bgcolor: colors.greenAccent[500] }}
					/>
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
						sx={{ bgcolor: colors.greenAccent[500] }}
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
						sx={{ bgcolor: colors.greenAccent[500] }}
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
						sx={{ bgcolor: colors.greenAccent[500] }}
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
		</Container>
	);
}

export default observer(PaymentForm);
