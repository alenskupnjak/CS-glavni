import React from 'react';
import { toast } from 'react-toastify';

export default function ReactToastify() {
	// ne diraj

	const toastId = React.useRef(null);

	const notify = () => (toastId.current = toast('Hello', { autoClose: false }));

	const update = () => toast.update(toastId.current, { type: toast.TYPE.INFO, autoClose: 5000 });

	function toasPromise() {
		const resolveWithSomeData = new Promise((resolve, reject) => {
			const num = Math.floor(Math.random() * 20);
			if (num > 10) {
				setTimeout(() => resolve(`Sve OK ${num}`), 3000);
			} else {
				setTimeout(() => reject(`Nije dobro ${num}`), 5000);
			}
		});
		toast.promise(resolveWithSomeData, {
			pending: {
				render() {
					return "I'm loading";
				},
				icon: false,
			},
			success: {
				render({ data }) {
					return `Hello ${data}`;
				},
				// other options
				icon: '🟢',
			},
			error: {
				render({ data }) {
					// When the promise reject, data will contains the error
					return <div>{data}</div>;
				},
			},
		});
	}

	return (
		<div>
			<button onClick={notify}>Notify</button>
			<button onClick={update}>Update</button>
			<button onClick={toasPromise}>Promise</button>
		</div>
	);
} // ne diraj
