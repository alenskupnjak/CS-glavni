import { Typography, Pagination } from '@mui/material';
import { observer } from 'mobx-react';
import { Box } from '@mui/system';

function AppPagination({ metaData, handlePaging }) {
	const { currentPage, totalCount, totalPages, pageSize } = metaData;

	console.log('%c 00 ', 'color:green', metaData);

	if (totalCount === 0) return null;

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			<Typography>
				Displaying {(currentPage - 1) * pageSize + 1}-
				{currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
			</Typography>
			<Pagination
				color="secondary"
				size="large"
				count={totalPages}
				page={currentPage}
				onChange={(e, page) => handlePaging(page)}
			/>
		</Box>
	);
}

export default observer(AppPagination);
