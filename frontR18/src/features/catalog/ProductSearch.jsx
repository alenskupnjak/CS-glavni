import { TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { useRef } from 'react';
import { useStore } from '../../app/stores/store';

function ProductSearch() {
	const { productStore } = useStore();
	const { handleFilterChange, productParams } = productStore;
	const textRef = useRef();
	return (
		<TextField
			autoFocus
			label="Search products"
			variant="outlined"
			fullWidth
			value={productParams.searchTerm || ''}
			onChange={e => {
				console.log('%c 00 textRef ', 'color:red', textRef);
				handleFilterChange(e.target.value);
			}}
			inputRef={textRef}
		/>
	);
}

export default observer(ProductSearch);
