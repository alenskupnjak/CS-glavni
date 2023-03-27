import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

// color design tokens export
export const tokens = {
	dark: {
		grey: {
			100: '#e0e0e0',
			200: '#c2c2c2',
			300: '#a3a3a3',
			400: '#858585',
			500: '#666666',
			600: '#525252',
			700: '#3d3d3d',
			800: '#292929',
			900: '#141414',
		},
		primary: {
			100: '#d0d1d5',
			200: '#a1a4ab',
			300: '#727681',
			400: '#1F2A40',
			500: '#141b2d',
			600: '#101624',
			700: '#0c101b',
			800: '#080b12',
			900: '#040509',
		},
		greenAccent: {
			100: '#dbf5ee',
			200: '#b7ebde',
			300: '#94e2cd',
			400: '#70d8bd',
			500: '#4cceac',
			600: '#3da58a',
			700: '#2e7c67',
			800: '#1e5245',
			900: '#0f2922',
		},
		redAccent: {
			100: '#f8dcdb',
			200: '#f1b9b7',
			300: '#e99592',
			400: '#e2726e',
			500: '#db4f4a',
			600: '#af3f3b',
			700: '#832f2c',
			800: '#58201e',
			900: '#2c100f',
		},
		blueAccent: {
			100: '#e1e2fe',
			200: '#c3c6fd',
			300: '#a4a9fc',
			400: '#868dfb',
			500: '#6870fa',
			600: '#535ac8',
			700: '#3e4396',
			800: '#2a2d64',
			900: '#151632',
		},
	},
	light: {
		grey: {
			100: '#141414',
			200: '#292929',
			300: '#3d3d3d',
			400: '#525252',
			500: '#666666',
			600: '#858585',
			700: '#a3a3a3',
			800: '#c2c2c2',
			900: '#e0e0e0',
		},
		primary: {
			100: '#040509',
			200: '#080b12',
			300: '#0c101b',
			400: '#f2f0f0', // manually changed
			500: '#141b2d',
			600: '#1F2A40',
			700: '#727681',
			800: '#a1a4ab',
			900: '#d0d1d5',
		},
		greenAccent: {
			100: '#0f2922',
			200: '#1e5245',
			300: '#2e7c67',
			400: '#3da58a',
			500: '#4cceac',
			600: '#70d8bd',
			700: '#94e2cd',
			800: '#b7ebde',
			900: '#dbf5ee',
		},
		redAccent: {
			100: '#2c100f',
			200: '#58201e',
			300: '#832f2c',
			400: '#af3f3b',
			500: '#db4f4a',
			600: '#e2726e',
			700: '#e99592',
			800: '#f1b9b7',
			900: '#f8dcdb',
		},
		blueAccent: {
			100: '#151632',
			200: '#2a2d64',
			300: '#3e4396',
			400: '#535ac8',
			500: '#6870fa',
			600: '#868dfb',
			700: '#a4a9fc',
			800: '#c3c6fd',
			900: '#e1e2fe',
		},
	},
	pink: {
		grey: {
			100: '#bec1c5',
			200: '#92979f',
			300: '#666d78',
			400: '#464e5b',
			500: '#252f3e',
			600: '#212a38',
			700: '#1b2330',
			800: '#161d28',
			900: '#0d121b',
		},
		primary: {
			100: '#cdf5ed',
			200: '#9aebdb',
			300: '#68e2c8',
			400: '#35d8b6',
			500: '#03cea4',
			600: '#02a583',
			700: '#027c62',
			800: '#015242',
			900: '#012921',
		},
		greenAccent: {
			100: '#bdf2fa',
			200: '#91e9f7',
			300: '#64e0f3',
			400: '#43daf1',
			500: '#22d3ee',
			600: '#1eceec',
			700: '#19c8e9',
			800: '#14c2e7',
			900: '#0cb7e2',
		},
		redAccent: {
			100: '#bdf2fa',
			200: '#91e9f7',
			300: '#64e0f3',
			400: '#43daf1',
			500: '#22d3ee',
			600: '#1eceec',
			700: '#19c8e9',
			800: '#14c2e7',
			900: '#0cb7e2',
		},
		blueAccent: {
			100: '#faf2d3',
			200: '#f6e5a6',
			300: '#f1d77a',
			400: '#edca4d',
			500: '#e8bd21',
			600: '#ba971a',
			700: '#8b7114',
			800: '#5d4c0d',
			900: '#2e2607',
		},
	},
};

// mui theme settings
export const themeSettings = {
	dark: {
		palette: {
			mode: 'dark',
			// palette values for dark mode
			primary: {
				main: tokens['dark'].primary[500],
			},
			secondary: {
				main: tokens['dark'].greenAccent[500],
			},
			neutral: {
				dark: tokens['dark'].grey[700],
				main: tokens['dark'].grey[500],
				light: tokens['dark'].grey[100],
			},
			background: {
				default: tokens['dark'].primary[500],
			},
		},
		typography: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 12,
			h1: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 40,
			},
			h2: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 32,
			},
			h3: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 24,
			},
			h4: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 20,
			},
			h5: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 16,
			},
			h6: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 14,
			},
		},
		components: {
			MuiPickersDay: {
				styleOverrides: {
					root: {
						backgroundColor: tokens['dark'].blueAccent[600],
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: tokens['dark'].primary[500],
					},
				},
			},
		},
	},
	light: {
		palette: {
			mode: 'light',
			primary: {
				main: tokens['light'].primary[100],
			},
			secondary: {
				main: tokens['light'].greenAccent[500],
			},
			neutral: {
				dark: tokens['light'].grey[700],
				main: tokens['light'].grey[500],
				light: tokens['light'].grey[100],
			},
			background: {
				default: '#fcfcfc',
			},
		},
		typography: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 12,
			h1: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 40,
			},
			h2: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 32,
			},
			h3: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 24,
			},
			h4: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 20,
			},
			h5: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 16,
			},
			h6: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 14,
			},
		},
		components: {
			MuiPickersDay: {
				styleOverrides: {
					root: {
						backgroundColor: tokens['light'].blueAccent[600],
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: tokens['light'].primary[500],
					},
				},
			},
		},
	},
	pink: {
		palette: {
			// mode: 'dark',
			primary: {
				main: tokens['pink'].primary[100],
			},
			secondary: {
				main: tokens['pink'].greenAccent[500],
			},
			neutral: {
				dark: tokens['pink'].grey[700],
				main: tokens['pink'].grey[500],
				pink: tokens['pink'].grey[100],
			},
			background: {
				default: '#fcfcfc',
			},
		},
		typography: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 12,
			h1: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 40,
			},
			h2: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 32,
			},
			h3: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 24,
			},
			h4: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 20,
			},
			h5: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 16,
			},
			h6: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 14,
			},
		},
		components: {
			MuiPickersDay: {
				styleOverrides: {
					root: {
						backgroundColor: tokens['pink'].blueAccent[600],
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: tokens['pink'].primary[500],
					},
				},
			},
		},
	},
};

// context for color mode
// export const ColorModeContext = createContext({
// 	toggleColorMode: () => {},
// });

export const useMode = () => {
	const { pallete } = useSelector(store => store.theme);
	console.log('%c 00 palette ', 'color:red', pallete);

	// const [mode, setMode] = useState('dark');
	// const colorMode = useMemo(
	// 	() => ({
	// 		toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')),
	// 	}),
	// 	[]
	// );
	const theme = useMemo(() => createTheme(themeSettings[pallete]));
	return [theme];
};
