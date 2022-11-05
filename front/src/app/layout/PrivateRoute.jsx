import { Redirect, Route } from 'react-router';
import { useStore } from '../../app/stores/store';

export default function PrivateRoute({ component: Component, ...rest }) {
	const {
		userStore: { user },
	} = useStore();
	return (
		<Route
			{...rest}
			render={props =>
				user ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}
