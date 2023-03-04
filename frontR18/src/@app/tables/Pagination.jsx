import React from 'react';

export default function Pagination(props) {
	const {
		pageIndex,
		pageOptions,
		gotoPage,
		canPreviousPage,
		previousPage,
		pageCount,
		nextPage,
		canNextPage,
		pageSize,
		setPageSize,
	} = props;
	return (
		<React.Fragment>
			<div>
				<ul class="pagination modal-1">
					<li onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						<a class="prev"> {'<<'}</a>
					</li>
					<li onClick={() => previousPage()} disabled={!canPreviousPage}>
						<a class="active"> {'<'}</a>
					</li>
					<li onClick={() => previousPage()}>
						<a className="">
							{' '}
							Page{' '}
							<strong>
								{pageIndex + 1} of {pageOptions.length}
							</strong>{' '}
						</a>
					</li>
					<li onClick={() => nextPage()} disabled={!canNextPage}>
						<a> {'>'}</a>
					</li>
					<li onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
						<a>{'>>'}</a>
					</li>
					<li>
						<a class="next">
							Go to page:{' '}
							<input
								type="number"
								defaultValue={pageIndex + 1}
								onChange={e => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0;
									gotoPage(page);
								}}
								style={{ width: '100px' }}
							/>
						</a>
					</li>
					<li>
						<a>
							<select
								value={pageSize}
								onChange={e => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[10, 20, 30, 40, 50].map(pageSize => (
									<option className="select-box" key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</a>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
}
