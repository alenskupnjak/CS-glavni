import { tokens } from '@app/theme/theme';
import { useSelector } from 'react-redux';

export default function ColorSet() {
	const { pallete } = useSelector(store => store.theme);
	const color = tokens[pallete];
	return color;
}
