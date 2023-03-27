import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Container, useTheme } from '@mui/material';

import { observer } from 'mobx-react';
import { useStore } from '@app/stores/store';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from 'app/components/RadioButtonGroup';
import CheckboxButtons from 'app/components/CheckboxButtons';
import AppPagination from 'app/components/AppPagination';
import { sortOptions } from '../../app/api/constants';
import { tokens } from '@app/theme/theme';

function Catalog(props) {
	const theme = useTheme();
	const colors = tokens[theme.palette.mode];
	const { productStore } = useStore();
	const {
		listaProdukata,
		loading,
		productParams,
		handleRadioButton,
		filters,
		handleBrands,
		handleTypes,
		handlePaging,
		metaData,
		loadAllProduct,
	} = productStore;

	let initialized = false;
	useEffect(() => {
		if (!initialized) {
			loadAllProduct();
		}
		return () => {
			// if (initialized) destroy();
			// eslint-disable-next-line react-hooks/exhaustive-deps
			initialized = true;
			// Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
		};
	}, []);

	return (
		<Container>
			<Grid container columnSpacing={4}>
				<Grid item xs={3}>
					<Paper sx={{ mb: 2, background: colors.greenAccent[700] }}>
						<ProductSearch />
					</Paper>
					<Paper sx={{ mb: 2, p: 2, background: colors.greenAccent[600] }}>
						<RadioButtonGroup
							selectedValue={productParams.orderBy}
							options={sortOptions}
							onChange={e => handleRadioButton({ orderBy: e.target.value })}
						/>
					</Paper>
					<Paper sx={{ mb: 2, p: 2, background: colors.greenAccent[600] }}>
						<CheckboxButtons
							items={filters?.brands}
							checked={productParams.brands}
							onChange={brand => handleBrands({ brands: brand })}
						/>
					</Paper>
					<Paper sx={{ mb: 2, p: 2, background: colors.greenAccent[600] }}>
						<CheckboxButtons
							items={filters?.types}
							checked={productParams.types}
							onChange={type => handleTypes({ types: type })}
						/>
					</Paper>
				</Grid>
				<Grid item xs={9}>
					{metaData.totalCount === 0 ? (
						<Typography variant="h3">No filter found</Typography>
					) : (
						<ProductList listaProdukata={listaProdukata} />
					)}
				</Grid>
				<Grid item xs={3} />
				<Grid item xs={9} sx={{ mb: 2 }}>
					{metaData && !loading && (
						<AppPagination metaData={metaData} handlePaging={page => handlePaging(page, 'Catalog')} />
					)}
				</Grid>
			</Grid>
		</Container>
	);
}

export default observer(Catalog);
