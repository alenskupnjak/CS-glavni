import { Box } from '@mui/material';
import React from 'react';
import './pagination.css';

export default function Pagination(props) {
	const { pageOptions, gotoPage, canPreviousPage, previousPage, nextPage, canNextPage, pageSize, setPageSize, store } =
		props;

	return (
		<Box sx={{ textAlign: 'center' }}>
			<ul className="pagination modal-1">
				<li
					onClick={() => {
						store.pagingStore.currentPage = 1;
						gotoPage(0);
					}}
					disabled={!canPreviousPage}
				>
					<a className="prev" href={() => false}>
						{'<<'}
					</a>
				</li>
				<li
					onClick={() => {
						if (store.pagingStore.currentPage === 1) return;
						store.pagingStore.currentPage--;
						previousPage();
					}}
					disabled={!canPreviousPage}
				>
					<a className="active" href={() => false}>
						{'<'}
					</a>
				</li>
				<li onClick={() => previousPage()}>
					<a className="" href={() => false}>
						{' '}
						Page{' '}
						<strong>
							{store.pagingStore.currentPage} of {pageOptions.length}
						</strong>{' '}
					</a>
				</li>
				<li
					onClick={() => {
						if (store.pagingStore.currentPage === store.pagingStore.totalPages) return;
						store.pagingStore.currentPage++;
						nextPage();
					}}
					disabled={!canNextPage}
				>
					<a href={() => false}> {'>'}</a>
				</li>
				<li
					onClick={() => {
						store.pagingStore.currentPage = store.pagingStore.totalPages;
						gotoPage(store.pagingStore.totalPages - 1);
					}}
					disabled={!canNextPage}
				>
					<a href={() => false}>{' Kraj >>'}</a>
				</li>
				<li>
					<a className="next" href={() => false}>
						Go to page:{' '}
						<input
							min="1"
							max={store.pagingStore.totalPages}
							type="number"
							defaultValue={store.pagingStore.currentPage}
							onChange={e => {
								store.pagingStore.setCurrentPage(Number(e.target.value));
								gotoPage(store.pagingStore.currentPage);
							}}
							style={{ width: '100px' }}
						/>
					</a>
				</li>
				<li>
					<a href={() => false}>
						<select
							value={pageSize}
							onChange={e => {
								setPageSize(Number(e.target.value));
								store.pagingStore.pageSize = Number(e.target.value);
							}}
						>
							{store.pagingStore?.availablePageSizes.map(pageSize => (
								<option className="select-box" key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
					</a>
				</li>
			</ul>
		</Box>
	);
}
