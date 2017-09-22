import StoryConfig from "./StoryConfig";
import defaultItems from "./defaultItems";

let storyConfig: StoryConfig = {
	characterTheme: "tablet",
	chestTheme: "chest",
	passageTheme: "parchment",
	buttonTheme: "blue",
	debug: false,
	items: defaultItems,
	stats: [],
	deadMessage: "You are dead",
	deathPassage: null,
	enableHealth: true,
	enableGold: true,
	enableStats: false,
	displayCharacterPanel: true
};

export default storyConfig;