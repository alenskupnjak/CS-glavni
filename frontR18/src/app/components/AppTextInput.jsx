import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export default function AppTextInput(props) {
	const { fieldState, field } = useController({ ...props, defaultValue: '' });
	return (
		<TextField
			{...props}
			{...field}
			multiline={props.multiline}
			rows={props.rows}
			type={props.type}
			fullWidth
			variant="outlined"
			error={!!fieldState.error}
			helperText={fieldState.error?.message}
		/>
	);
}
