import { action, makeObservable, observable } from 'mobx';
import { PagingStore } from './pagingStore';

export class TableStore {
	pagingStore = {};
	additionalFilter = {};
	name = null;

	constructor(name) {
		this.pagingStore = new PagingStore(1, 10);
		this.name = name;

		makeObservable(this, {
			pagingStore: observable,
			additionalFilter: observable,
			setPagingStore: action,
			setFilter: action,
		});
	}

	setPagingStore(value) {
		this.pagingStore = value;
	}

	setFilter(value) {
		this.additionalFilter = value;
	}

	reset() {
		this.pagingStore.reset();
		this.pagingStore = {};
		this.additionalFilter = {};
	}
}
