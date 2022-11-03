import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useStore } from '../../app/stores/store';

export default function Login() {
	const { userStore } = useStore();
	const { submitForm, user } = userStore;
	const history = useHistory();
	const location = useLocation();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: 'all',
	});

	console.log('%c 00 User ', 'color:green', user);

	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}
		>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit(formData => submitForm(formData, history, location))}
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
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Password"
					type="password"
					{...register('password', { required: 'Password is required' })}
					error={!!errors.password}
					helperText={errors?.password?.message}
				/>
				<LoadingButton
					disabled={!isValid}
					loading={isSubmitting}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
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
