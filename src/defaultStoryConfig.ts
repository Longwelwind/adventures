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
	enableHealth: true,
	enableGold: true,
	enableStats: false
};

export default storyConfig;