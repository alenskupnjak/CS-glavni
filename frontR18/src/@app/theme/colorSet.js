import { useTheme } from '@mui/material';
import { tokens } from '@app/theme/theme';

export default function ColorSet() {
	const theme = useTheme();
	const color = tokens(theme.palette.mode);
	return color;
}
