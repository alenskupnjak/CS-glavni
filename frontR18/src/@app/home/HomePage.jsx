import React from 'react';
import { observer } from 'mobx-react';
import { Typography, Container } from '@mui/material';
import Slider from 'react-slick';
import './Slider.css';

function HomePage() {
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
		<Container>
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
				<div>
					<img
						src="/images/cards/01-320x200.jpg"
						alt="hero"
						style={{ display: 'block', width: '100%', maxHeight: 500 }}
					/>
				</div>
				<div>
					<img
						src="/images/cards/02-320x200.jpg"
						alt="hero"
						style={{ display: 'block', width: '100%', maxHeight: 500 }}
					/>
				</div>
				<div>
					<img
						src="/images/cards/03-320x200.jpg"
						alt="hero"
						style={{ display: 'block', width: '100%', maxHeight: 500 }}
					/>
				</div>
				<div>
					<img
						src="/images/cards/04-320x200.jpg"
						alt="hero"
						style={{ display: 'block', width: '100%', maxHeight: 500 }}
					/>
				</div>
				<div>
					<img
						src="/images/cards/05-320x200.jpg"
						alt="hero"
						style={{ display: 'block', width: '100%', maxHeight: 500 }}
					/>
				</div>
				<div>
					<img
						src="/images/cards/06-320x200.jpg"
						alt="hero"
						style={{ display: 'block', width: '100%', maxHeight: 500 }}
					/>
				</div>
			</Slider>
			<Typography sx={{ color: 'gold', fontSize: 30, marginTop: 10, justifyContent: 'center', textAlign: 'center' }}>
				Welcome - alenskupnjak@yahoo.com
			</Typography>
		</Container>
	);
}

export default observer(HomePage);
