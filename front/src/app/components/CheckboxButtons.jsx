import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export default function CheckboxButtons({ items, checked, onChange }) {
	return (
		<FormGroup>
			{items &&
				items.map(item => (
					<FormControlLabel
						control={<Checkbox checked={checked.indexOf(item) !== -1} onClick={() => onChange(item)} />}
						label={item}
						key={item}
					/>
				))}
		</FormGroup>
	);
}
