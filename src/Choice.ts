import Passage from "./Passage";

export default class Choice {
	readonly BUTTON_PREFIX = "button-";
	readonly BUTTON_THEMES = ["blue", "red", "yellow", "green", "pink", "black", "white"];

	constructor(public passage: Passage, public text: string) {

	}

	getTheme(defaultTheme: string): string {
		return this.BUTTON_THEMES.reduce((p, c) =>  this.passage.tags.indexOf(this.BUTTON_PREFIX + c) != -1 ? c : p, defaultTheme);
	}
}