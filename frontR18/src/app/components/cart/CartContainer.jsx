import { useEffect } from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, Modal } from '@mui/material';
import ColorSet from '@app/theme/colorSet';
import Button from '@mui/material/Button';
import { clearCart, calculateTotals } from 'features/cart/cartSlice';
import { openModal, closeModal } from 'features/modal/modalSlice';
import { Close } from '@mui/icons-material';
import ConfirmDialog from '@app/common/ConfirmDialog';

const CartContainer = () => {
	const dispatch = useDispatch();
	const { cartItems, total, amount } = useSelector(store => store.cart);
	const { isOpen } = useSelector(store => store.modal);

	useEffect(() => {
		dispatch(calculateTotals());
		// eslint-disable-next-line
	}, [cartItems]);

	if (amount < 1) {
		return (
			<Container sx={{ backgroundColor: ColorSet().primary[400] }}>
				<Box>
					<Typography variant="h3">Your bag</Typography>
					<Typography variant="h4">is currently empty</Typography>
				</Box>
			</Container>
		);
	}

	return (
		<Container m="20px" sx={{ backgroundColor: ColorSet().primary[400] }}>
			<Typography variant="h2">your bag</Typography>
			<Box sx={{ margin: '5px' }}>
				{cartItems.map(item => {
					return <CartItem key={item.id} {...item} />;
				})}
			</Box>
			<Box m="10px">
				<Typography variant="h4" sx={{ margin: '10px' }}>
					total ${total.toFixed(2)}
				</Typography>
				<Button
					variant="contained"
					onClick={() => {
						dispatch(openModal());
					}}
					sx={{ marginBottom: '10px' }}
				>
					Clear cart
				</Button>
			</Box>
			{/* CONFIRM DIALOG */}
			<ConfirmDialog
				dataDialog={isOpen}
				title="Naslov"
				onClose={() => dispatch(closeModal())}
				text={'Želiš li obrisati zapis?'}
				// data={this.state.modalOpenConfirmData}
				deleteItem={() => dispatch(clearCart())}
				textCaption={'Text some description'}
			></ConfirmDialog>
		</Container>
	);
};
export default CartContainer;
