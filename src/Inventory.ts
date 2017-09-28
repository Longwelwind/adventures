import { observable } from 'mobx';
import Story from "./Story";
import Item from "./Item";
import * as _ from "lodash";

export default class Inventory {
	@observable items: Item[];

	constructor(private story: Story, public readonly length: number) {
		this.items = observable.shallowArray(_.times<Item>(this.length, i => null));
	}

	addItem(itemTag: string): boolean {
		let item = this.story.getItem(itemTag);

		return this.add(item);
	}

	add(item: Item): boolean {
		// We find the first index that contains `null`
		let i = this.items.reduceRight((p, c, i) => c == null ? i : p, -1);
		if (i == -1) {
			return false;
		}

		this.items[i] = item;

		return true;
	}

	hasItem(itemTag: string): boolean {
		let item = this.story.getItem(itemTag);

		return this.has(item);
	}

	has(item: Item): boolean {
		let i = this.items.indexOf(item);
		return i > -1;
	}

	remove(i: number): boolean {
		if (i >= this.length) {
			return false;
		}
		
		this.items[i] = null;

		return true;
	}

	removeItem(item: Item): boolean {
		let i = this.items.indexOf(item);
		if (i == -1) {
			return false;
		}

		return this.remove(i);
	}
}