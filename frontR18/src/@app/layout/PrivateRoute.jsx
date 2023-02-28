import { Navigate } from 'react-router';
import { useStore } from '../../app/stores/store';
import { toast } from 'react-toastify';

export default function PrivateRoute({ children: Component, roles, ...props }) {
	const { userStore } = useStore();
	const { user } = userStore;
	if (!user) {
		toast.error('Not authorised to access this area');
		return <Navigate to="/login" replace />;
	}

	if (roles && !roles?.some(r => user.roles?.includes(r))) {
		toast.error('Not authorised to access this area');
		return <Navigate to="/" replace />;
	}

	return <Component {...props} />;
}
