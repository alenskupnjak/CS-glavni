import { action, computed, makeObservable, observable } from 'mobx';

export class PagingStore {
	currentPage = 0;
	totalRecords = 0;
	pageSize = 0;

	constructor(currentPage, pageSize) {
		this.currentPage = currentPage;
		this.pageSize = pageSize;

		makeObservable(this, {
			currentPage: observable,
			totalRecords: observable,
			pageSize: observable,
			setCurrentPage: action,
			setTotalRecords: action,
			setPageSize: action,
			currentPageStart: computed,
			currentPageEnd: computed,
			totalPages: computed,
			isLastPage: computed,
			availablePageSizes: computed,
		});
	}

	setCurrentPage(value) {
		this.currentPage = value;
	}

	setTotalRecords(value) {
		this.totalRecords = value;
	}

	setPageSize(value) {
		this.pageSize = value;
	}

	get currentPageStart() {
		return this.currentPage > 1 ? (this.currentPage - 1) * this.pageSize + 1 : 1;
	}

	get currentPageEnd() {
		let currentPageEnd = 0;
		if (this.currentPage <= 1) {
			currentPageEnd = this.pageSize > this.totalRecords ? this.totalRecords : this.pageSize;
		} else if (this.pageSize >= this.totalRecords) {
			currentPageEnd = 1;
		} else {
			const potentialEnd = this.currentPage * this.pageSize;
			currentPageEnd = potentialEnd <= this.totalRecords ? potentialEnd : this.totalRecords;
		}
		return currentPageEnd;
	}

	get totalPages() {
		return this.totalRecords > this.pageSize ? Math.ceil(this.totalRecords / this.pageSize) : 1;
	}

	get isLastPage() {
		return this.totalPages === this.currentPage;
	}

	get availablePageSizes() {
		// NOTE: For now leave it as 10
		const baseSize = 10;
		return [baseSize, baseSize * 3, baseSize * 5];
	}

	reset() {
		this.currentPage = 0;
		this.totalRecords = 0;
		this.pageSize = 0;
	}
}
