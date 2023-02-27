import { Box, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import './Slider.css';

export default function HomePage() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		width: 300,
		margin: 200,
	};

	return (
		<div>
			<Slider {...settings}>
				<div>
					<img src="/images/hero1.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
				</div>
				<div>
					<img src="/images/hero2.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
				</div>
				<div>
					<img src="/images/hero3.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
				</div>
			</Slider>
			<Typography marginTop={5} justifyContent="center" variant="h3">
				Welcome to the store
			</Typography>
		</div>
	);
}
