import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, TextField, Box, Paper, Typography, Container, Grid } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { useStore } from '@app/stores/store';
import { tokens } from '@app/theme/theme';

export default function Login() {
	const { pallete } = useSelector(store => store.theme);
	const { userStore } = useStore();
	const { loginForm } = userStore;
	const navigate = useNavigate();
	const colors = tokens[pallete];

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: 'all',
	});

	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 4,
				backgroundColor: colors.grey[500],
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlined />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit(formData => loginForm(formData, navigate))}
				noValidate
				sx={{ mt: 1 }}
			>
				<TextField
					margin="normal"
					fullWidth
					label="Username"
					autoFocus
					{...register('username', {
						required: 'Username is required',
						validate: {
							minLength: v => String(v).length > 2 || 'Više od 5 znamenki',
						},
					})}
					error={!!errors.username}
					helperText={errors?.username?.message}
					sx={{
						'& .MuiOutlinedInput-input': {
							background: colors.grey[800],
						},
					}}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Password"
					type="password"
					{...register('password', { required: 'Password is required' })}
					error={!!errors.password}
					helperText={errors?.password?.message}
					sx={{
						'& .MuiOutlinedInput-input': {
							background: colors.grey[800],
						},
					}}
				/>
				<LoadingButton
					disabled={!isValid}
					loading={isSubmitting}
					type="submit"
					fullWidth
					// color="primary"
					variant="contained"
					sx={{
						mt: 3,
						mb: 2,
						'& .Mui-disabled': {
							background: colors.primary[200],
							color: 'red',
						},
					}}
				>
					Sign In
				</LoadingButton>
				<Grid container>
					<Grid item>
						<Link to="/register">{"Don't have an account? Sign Up"}</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
