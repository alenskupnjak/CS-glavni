import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../app/stores/store';
import ProductList from './ProductList';
import { Grid, Paper, Typography } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import { sortOptions } from '../../app/api/constants';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import AppPagination from '../../app/components/AppPagination';

function Catalog(props) {
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
	} = productStore;

	return (
		<Grid container columnSpacing={4}>
			<Grid item xs={3}>
				<Paper sx={{ mb: 2 }}>
					<ProductSearch />
				</Paper>
				<Paper sx={{ mb: 2, p: 2 }}>
					<RadioButtonGroup
						selectedValue={productParams.orderBy}
						options={sortOptions}
						onChange={e => handleRadioButton({ orderBy: e.target.value })}
					/>
				</Paper>
				<Paper sx={{ mb: 2, p: 2 }}>
					<CheckboxButtons
						items={filters?.brands}
						checked={productParams.brands}
						onChange={brand => handleBrands({ brands: brand })}
					/>
				</Paper>
				<Paper sx={{ mb: 2, p: 2 }}>
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
					<AppPagination metaData={metaData} handlePaging={page => handlePaging({ pageNumber: page })} />
				)}
			</Grid>
		</Grid>
	);
}

export default observer(Catalog);
