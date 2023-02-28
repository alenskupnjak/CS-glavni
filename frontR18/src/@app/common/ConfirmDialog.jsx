import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Button, DialogActions } from '@mui/material';

const ConfirmDialog = props => {
	const { dataDialog, text, textCaption, onClose, deleteItem, data } = props;

	return (
		<Dialog open={dataDialog ?? false} fullWidth={true} sx={{ position: 'absolute' }}>
			<DialogTitle></DialogTitle>
			<DialogContent>
				<Typography variant="h3">{text}</Typography>
				<Typography variant="caption">{textCaption}</Typography>
			</DialogContent>
			<DialogActions style={{ justifyContent: 'center' }}>
				<Button text="NO" color="primary" variant="contained" onClick={() => onClose()}>
					NO
				</Button>
				<Button
					text="YES"
					variant="contained"
					color="secondary"
					onClick={() => {
						onClose();
						deleteItem(data);
					}}
				>
					YES
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
