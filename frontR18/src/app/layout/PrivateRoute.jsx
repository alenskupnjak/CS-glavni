import { Redirect, Route } from 'react-router';
import { useStore } from '../../app/stores/store';
import { toast } from 'react-toastify';

export default function PrivateRoute({ component: Component, roles, ...rest }) {
	const { userStore } = useStore();
	const { user } = userStore;

	return (
		<Route
			{...rest}
			render={props => {
				if (!user) {
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
				}

				// console.log('%c 100 Member ', 'color:gold', user.roles?.includes('Member'));
				// console.log('%c 101 Admin ', 'color:gold', user.roles?.includes('Admin'));
				// Ako nismo logirani vracamo se na login page
				if (roles && !roles?.some(r => user.roles?.includes(r))) {
					toast.error('Not authorised to access this area');
					return <Redirect to={{ pathname: '/catalog' }} />;
				}
				return <Component {...props} />;
			}}
		/>
	);
}
