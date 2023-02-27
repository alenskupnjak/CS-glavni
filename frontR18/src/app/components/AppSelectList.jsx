import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useController } from 'react-hook-form';

export default function AppSelectList(props) {
	// https://react-hook-form.com/api/usecontroller
	const { fieldState, field } = useController({ ...props, defaultValue: '' });

	return (
		<FormControl fullWidth error={!!fieldState.error}>
			<InputLabel>{props.label}</InputLabel>
			<Select value={field.value} label={props.label} onChange={field.onChange}>
				{props.items.map((item, index) => (
					<MenuItem key={index} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{fieldState.error?.message}</FormHelperText>
		</FormControl>
	);
}
