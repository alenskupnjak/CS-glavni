import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

export default function ProductCard({ product }) {
	return (
		<Card>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{product.name.slice(0, 2).toUpperCase()}</Avatar>}
				title={product.name}
				titleTypographyProps={{
					sx: { fontWeight: 'bold', color: 'primary.main' },
				}}
			/>
			<CardMedia
				sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
				image={product.pictureUrl}
				title={product.name}
			/>
			<CardContent>
				<Typography gutterBottom color="secondary" variant="h5">
					$$${(product.price / 100).toFixed(2)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.type}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Dodaj to chart</Button>
				<Button variant="outlined" size="small">
					Pogled
				</Button>
			</CardActions>
		</Card>
	);
}
