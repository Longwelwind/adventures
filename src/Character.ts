import { Stat } from './Stat';
import { observable } from 'mobx';
import Inventory from "./Inventory";
import Story from "./Story";

export default class Character {
	@observable name: string = "Aramis";
	inventory: Inventory = new Inventory(this.story, 16);
	maxHealth: number = 20;
	@observable health: number = 18;
	@observable gold: number = 0;

	get dead(): boolean {
		return this.health == 0;
	}

	// Bad design, but it is easier to code than to make a `CharacterStat`
	// entity that has a `stat` and a `count` field.
	stats: { [key: string]: number } = {};

	constructor(public story: Story) {
		this.story.stats.forEach(s => {
			this.stats[s.name] = 0;
		});
	}

	damage(amount: number) {
		if (amount < 0) {
			throw new Error(`damage: "amount" must be positive`);
		}

		this.health = Math.max(this.health - amount, 0);
	}

	heal(amount: number) {
		if (amount < 0) {
			throw new Error(`heal: "amount" must be positive`);
		}

		this.health = Math.min(this.health + amount, this.maxHealth);
	}

	addGold(gold: number) {
		if (gold <= 0) {
			return;
		}

		this.gold += gold;
	}

	removeGold(gold: number) {
		if (gold <= 0) {
			return;
		}

		this.gold -= gold;
	}

	hasGold(gold: number) {
		return this.gold >= gold;
	}

	getStat(tag: string): number {
		let stat = this.story.getStat(tag);
		
		return this.stats[stat.name];
	}

	addStat(tag: string, count: number): number {
		let stat = this.story.getStat(tag);

		if (count < 0) {
			throw new Error("addStat: `count` should be positive");
		}

		this.stats[stat.name] += count;
		return this.stats[stat.name];
	}

	removeStat(tag: string, count: number): number {
		let stat = this.story.getStat(tag);

		if (count < 0) {
			throw new Error("setStat: `count` should be positive");
		}

		this.stats[stat.name] = Math.max(this.stats[stat.name] - count, 0);
		return this.stats[stat.name];
	}

	setStat(tag: string, count: number): void {
		let stat = this.story.getStat(tag);

		if (count < 0) {
			throw new Error("setStat: `count` should be positive");
		}

		this.stats[stat.name] = count;
	}

	hasStat(tag: string, count: number): boolean {
		let stat = this.story.getStat(tag);

		return this.stats[stat.name] >= count;
	}
}