import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import Paper from '@mui/material/Paper';
import { v4 as uuid } from 'uuid';
import { Grid, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { rootStore } from '@app/stores';
import { isEmpty } from 'lodash-es';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartZaba(props) {
	const { pallete } = useSelector(store => store.theme);
	const { loadAllData, dataLabels, dataLabelsNum, trosakUkupno, dataChart, destroy } = rootStore.chartStore;

	let initialized = false;
	useEffect(() => {
		if (!initialized) {
			loadAllData();
		}

		// ovaj return se okida kada je komponenta destroyed
		return () => {
			if (initialized) destroy();
			// eslint-disable-next-line react-hooks/exhaustive-deps
			initialized = true;
			// Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: pallete === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
	}));

	let data = {
		labels: dataLabels,
		datasets: [
			{
				label: '# of Troskovi',
				data: dataLabelsNum,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(100, 192, 192, 0.2)',
					'rgba(103, 102, 155, 0.2)',
					'rgba(100, 159, 100, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 2,
			},
		],
	};

	if (isEmpty(dataChart)) return null;

	return (
		<React.Fragment>
			<Container
				component={Paper}
				maxWidth="xl"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					p: 4,
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Doughnut key={uuid()} data={data} />
					</Grid>
					<Grid item xs={6}>
						<Typography component="h1" variant="h5">
							Trosak ukupno:{trosakUkupno}
						</Typography>
						{/* <Item key={uuid()}>xs=4</Item> */}
					</Grid>
					{dataChart &&
						dataChart.map(data => {
							return (
								<React.Fragment key={uuid()}>
									<Grid item xs={4}>
										<Item sx={{ fontSize: 15 }}>
											{data.kat}: {Math.round((data.sumaKat * trosakUkupno) / 100)}
											{'EUR'} - {data.sumaKat}%
										</Item>
									</Grid>
									<Grid item xs={8}>
										{data.podaci.map((item, idx) => {
											return (
												<Item key={uuid()}>
													{' '}
													{idx} {'-'} {item.podKat ?? 'Nedefinirano'}-{item.sumPodKat}
												</Item>
											);
										})}
									</Grid>
								</React.Fragment>
							);
						})}
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default observer(ChartZaba);
