import { Stat } from './Stat';
import Item from "./Item";

export default interface StoryConfig {
	characterTheme: string,
	chestTheme: string,
	passageTheme: string,
	buttonTheme: string,
	debug: boolean,
	items: Item[],
	stats: Stat[],
	deadMessage: string,
	displayHealth: boolean,
	displayGold: boolean
}