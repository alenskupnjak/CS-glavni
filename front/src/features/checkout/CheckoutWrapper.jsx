import { observer } from 'mobx-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe(
	'pk_test_51M3IvvFpMow0GoyE2gdtA8jawCVIsc1PTmkBsomDfTAPTAYloXQCRmunbiHpc7T6DjAQPEJISO7LdmxehQYIp8Lh00se6BVind'
);

function CheckoutWrapper() {
	const { productStore } = useStore();
	const { loading } = productStore;

	// useEffect(() => {
	// 	agent.Payments.createPaymentIntent()
	// 		.then(basket => console.log(basket))
	// 		.catch(error => console.log(error))
	// 		.finally(() => setLoading(false));
	// }, []);

	if (loading) return <LoadingComponent message="Loading checkout..." />;

	return (
		<Elements stripe={stripePromise}>
			<CheckoutPage />
		</Elements>
	);
}

export default observer(CheckoutWrapper);
