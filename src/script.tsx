import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import Story from "./Story";
import Inventory from "./Inventory";
import Item from "./Item";
import Character from "./Character";
import Passage from "./Passage";
import * as CSSTransition from "react-transition-group/CSSTransition";
import Choice from "./Choice";
import defaultStoryConfig from "./defaultStoryConfig";
import StoryConfig from "./StoryConfig";
import { mergeObject } from "./helper";
import CharacterComponent from "./CharacterComponent";
import ItemComponent from "./ItemComponent";
import ItemDragDataTransfer from "./ItemDragDataTransfer";
import Interface from "./Interface";

/**
 * This interface is there to add the objects to the
 * `window` global object so that they can be accessed
 * by the writer in its scripts.
 */
declare global {
    interface Window {
		story: Story,
		character: Character
		config: Partial<StoryConfig>
    }
}

window.addEventListener("load", () => {
	// Parsing the data given by Twine (story, passages, ...)
	let storyElem = document.getElementsByTagName("tw-storydata")[0];
	let passagesElems = storyElem.getElementsByTagName("tw-passagedata");
	let scriptElems = storyElem.getElementsByTagName("script");
	let styleElems = storyElem.getElementsByTagName("style");
	
	let title = document.getElementsByTagName("title")[0].innerText;

	let passages: Passage[] = [];
	for (let i =0;i < passagesElems.length;i++) {
		let passageElem = passagesElems[i];
		passages.push(
			new Passage(parseInt(passageElem.getAttribute("pid")), passageElem.getAttribute("name"), passageElem.getAttribute("tags").split(' '), _.unescape(passageElem.innerHTML))
		);
    }

	let startPassagePid = parseInt(storyElem.getAttribute("startnode"));
	let startPassage = passages.filter(p => p.pid == startPassagePid)[0];

	if (startPassage == null) {
		// If there's no start passage (for whatever reason), take the
		// one with the lowest pid
		startPassage = passages.reduce((p, c) => p.pid < c.pid ? p : c, passages[0]);
	}

	// Parse and activate the user-written CSS
	for (let i = 0;i < styleElems.length;i++) {
		let style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode(styleElems[i].textContent));
		document.head.appendChild(style);
	}

	// Activate the user-written JS
	for (let i = 0;i < scriptElems.length;i++) {
		eval(scriptElems[i].textContent);
	}

	// Get the default config, and apply to it the config
	// given by the user
	let storyConfig = defaultStoryConfig;
	if (window.config != undefined) {
		if (typeof(window.config) != "object") {
			throw new Error(`window.storyConfig should be an object, but is "${typeof(window.config)}"`);
		}

		storyConfig = mergeObject(window.config, defaultStoryConfig);
	}

	let story = new Story(title, storyConfig, passages, startPassage);

	story.start();

	ReactDOM.render(<Interface story={story} />, document.getElementById("root"));
});