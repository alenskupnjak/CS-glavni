import { UploadFile, Upload } from '@mui/icons-material';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';

export default function AppDropzone(props) {
	const { fieldState, field } = useController({ ...props, defaultValue: null });

	const dzStyles = {
		display: 'flex',
		border: 'dashed 3px #eee',
		borderColor: '#eee',
		borderRadius: '5px',
		paddingTop: '30px',
		alignItems: 'center',
		height: 200,
		width: 500,
	};

	const dzActive = {
		borderColor: 'gold',
	};

	const onDrop = useCallback(
		acceptedFiles => {
			acceptedFiles[0] = Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) });
			field.onChange(acceptedFiles[0]);
		},
		[field]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()}>
			<FormControl error={!!fieldState.error} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
				<input {...getInputProps()} />
				<div>
					<UploadFile sx={{ fontSize: '100px' }} />
					<Upload sx={{ fontSize: '100px' }} />
				</div>
				<Typography variant="h4">Drop image here</Typography>
				<FormHelperText>{fieldState.error?.message}</FormHelperText>
			</FormControl>
		</div>
	);
}
