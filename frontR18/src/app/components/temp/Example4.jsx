import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Box, createTheme, TextField, ThemeProvider, useTheme } from '@mui/material';
import ColorSet from '@app/theme/colorSet';
import { tokens } from '@app/theme/theme';

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(() => {
			const daysInMonth = date.daysInMonth();
			const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

			resolve({ daysToHighlight });
		}, 500);

		signal.onabort = () => {
			clearTimeout(timeout);
			reject(new DOMException('aborted', 'AbortError'));
		};
	});
}

const initialValue = dayjs(new Date());

const color = '#99010f';

// const themeB = useTheme();
// const boja = tokens(themeB.palette.mode);
// const boja = tokens('dark');

// const theme = createTheme({
// 	components: {
// 		MuiIconButton: {
// 			styleOverrides: {
// 				sizeMedium: {
// 					color: '#99010f',
// 				},
// 			},
// 		},
// 		MuiOutlinedInput: {
// 			styleOverrides: {
// 				root: {
// 					color: '#99010f',
// 				},
// 			},
// 		},
// 		MuiInputLabel: {
// 			styleOverrides: {
// 				root: {
// 					color: '#99010f',
// 				},
// 			},
// 		},
// 		MuiSvgIcon: {
// 			styleOverrides: {
// 				root: {
// 					color: '#99010f',
// 				},
// 			},
// 		},
// 		MuiDayCalendar: {
// 			styleOverrides: {
// 				weekDayLabel: {
// 					color: color,
// 				},
// 			},
// 		},
// 		MuiPickersDay: {
// 			styleOverrides: {
// 				root: {
// 					backgroundColor: 'blue',
// 				},
// 			},
// 		},
// 	},
// });

function ServerDay(props) {
	const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

	const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;

	return (
		<Badge key={props.day.toString()} overlap="circular" badgeContent={isSelected ? '🌚' : undefined}>
			<PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
		</Badge>
	);
}

ServerDay.propTypes = {
	/**
	 * The date to show.
	 */
	day: PropTypes.object.isRequired,
	highlightedDays: PropTypes.arrayOf(PropTypes.number),
	/**
	 * If `true`, day is outside of month and will be hidden.
	 */
	outsideCurrentMonth: PropTypes.bool.isRequired,
};

function DateCalendarServerRequest() {
	const requestAbortController = React.useRef(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

	const fetchHighlightedDays = date => {
		const controller = new AbortController();
		fakeFetch(date, {
			signal: controller.signal,
		})
			.then(({ daysToHighlight }) => {
				// console.log('%c daysToHighlight ', 'color:green', daysToHighlight);

				setHighlightedDays(daysToHighlight);
				setIsLoading(false);
			})
			.catch(error => {
				// ignore the error if it's caused by `controller.abort`
				if (error.name !== 'AbortError') {
					throw error;
				}
			});

		requestAbortController.current = controller;
	};

	React.useEffect(() => {
		fetchHighlightedDays(initialValue);
		// abort request on unmount
		return () => requestAbortController.current?.abort();
	}, []);

	const handleMonthChange = date => {
		if (requestAbortController.current) {
			// make sure that you are aborting useless requests
			// because it is possible to switch between months pretty quickly
			requestAbortController.current.abort();
		}

		setIsLoading(true);
		setHighlightedDays([]);
		fetchHighlightedDays(date);
	};

	return (
		// <LocalizationProvider dateAdapter={AdapterDayjs}>
		// <ThemeProvider theme={theme}>
		<Box>
			<Box>
				<DateCalendar
					defaultValue={initialValue}
					loading={isLoading}
					onMonthChange={handleMonthChange}
					renderLoading={() => <DayCalendarSkeleton />}
					slots={{
						day: ServerDay,
					}}
					slotProps={{
						day: {
							highlightedDays,
						},
					}}
					onChange={e => console.log('%c 00 ', 'color:green', dayjs(e).format('YYYY-MM-DD'))}
				/>
			</Box>
			<Box>
				<BasicDateCalendar />
			</Box>
		</Box>
		// </ThemeProvider>
		// </LocalizationProvider>
	);
}

function BasicDateCalendar() {
	const initialValue = dayjs(new Date());
	return (
		<Box>
			<DateCalendar
				// defaultValue={initialValue}
				onChange={e => {
					console.log('%c 17 ', 'color:blue', dayjs(e).format('YYYY-MM-DD'));
				}}
			/>
		</Box>
	);
}

export default DateCalendarServerRequest;