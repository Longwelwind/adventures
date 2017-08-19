import { observable } from 'mobx';
import Item from "./Item";
import Inventory from "./Inventory";
import Story from "./Story";

export class Shop {
	// Internally, a shop still has an inventory
	inventory: Inventory;
	entries: ShopEntry[] = [];

	constructor(public story: Story) {
		this.inventory = new Inventory(story, 1000);
	}

	addItem(item: Item, price: number) {
		if (this.entries.length >= this.inventory.length) {
			throw new Error(`"addItem": Can't have more than ${this.inventory.length} items in the shop`);
		}

		this.inventory.add(item);
		this.entries.push(new ShopEntry(item, price));
	}

	buy(entry: ShopEntry): boolean {
		if (!this.canBuy(entry)) {
			return false;
		}

		entry.bought = true;
		this.story.character.removeGold(entry.price);

		return true;
	}

	canBuy(entry: ShopEntry): boolean {
		return this.story.character.gold >= entry.price && !entry.bought;
	}
}

export class ShopEntry {
	@observable bought: boolean = false;

	constructor(public item: Item, public price: number) {

	}
}