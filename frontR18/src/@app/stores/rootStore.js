import DisplayStore from './displayStore';
import ProductStore from './productStore';
import UserStore from './userStore';
import ChartStore from './chartStore';
import SportsStore from './sportsStore';

export class RootStore {
	constructor() {
		this.displayStore = new DisplayStore();
		this.productStore = new ProductStore();
		this.userStore = new UserStore();
		this.chartStore = new ChartStore();
		this.sportsStore = new SportsStore();
	}

	pozdrav = () => {
		console.log('%c Evo me u RootStore', 'color:red');
	};
}

export default new RootStore();
