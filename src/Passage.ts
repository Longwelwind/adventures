import Story from "./Story";

export default class Passage {
	readonly THEME_PREFIX = "theme-";

	constructor(
		public pid: number,
		public name: string,
		public tags: string[],
		public content: string
	) {
		
	}

	getTheme(defaultTheme: string): string {
		return Story.PANEL_THEMES.reduce((p, c) => this.tags.indexOf(this.THEME_PREFIX + c) != -1 ? c : p, defaultTheme);
	}
}