export function getCookie(key) {
	const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
	console.log('%c cookie', 'color:green', b);

	return b ? b.pop() : '';
}

export function currencyFormat(amount) {
	return '$' + (amount / 100).toFixed(2);
}

export function dateFormat(date) {
	const formatDate = date.split('T')[0];
	return formatDate;
}

export function parseFraction(fraction) {
	const [numerator, denominator] = fraction.split('/').map(Number);
	return numerator / denominator;
}

export function getColorOdds(id) {
	const colors = ['#4cceac', '#a3a3a3', '#e99592', '#868dfb', '#FACC2E', '#FE2E9A', '#00FFFF'];
	return colors[id];
}
