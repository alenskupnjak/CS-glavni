import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { removeItem, increase, decrease } from '@app/stores/redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ColorSet from '@app/theme/colorSet';

const CartItem = ({ id, img, title, price, amount }) => {
	const dispatch = useDispatch();

	if (!price) return null;

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			sx={{ padding: '5px', borderBottom: '1px solid', borderBottomColor: ColorSet().grey[400] }}
		>
			<Box>
				<img src={img} alt={title} height="100" />
			</Box>
			<Box m="10px" sx={{ marginRight: '30px', textAlign: 'center' }}>
				<Typography variant="h4" sx={{ margin: '10px' }}>
					{title}
				</Typography>
				<Typography variant="h4" sx={{ margin: '10px' }}>
					${price}
				</Typography>
				<Button variant="contained" onClick={() => dispatch(removeItem(id))}>
					Remove
				</Button>
			</Box>
			<Box m="10px" sx={{ marginRight: '30px', justifyContent: 'right', textAlign: 'center' }}>
				<ArrowCircleUpIcon fontSize="large" onClick={() => dispatch(increase({ id }))} />
				<Typography variant="h4" sx={{ margin: '10px', color: ColorSet().redAccent[400] }}>
					{amount}
				</Typography>
				<ArrowCircleDownIcon
					fontSize="large"
					onClick={() => {
						if (amount === 1) {
							dispatch(removeItem(id));
							return;
						}
						dispatch(decrease({ id }));
					}}
				/>
			</Box>
		</Box>
	);
};
export default CartItem;
