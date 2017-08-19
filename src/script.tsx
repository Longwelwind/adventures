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

/**
 * This interface is there to add the objects to `window`
 * so that they can be accessed by the writer in its scripts
 */
declare global {
    interface Window {
		story: Story,
		character: Character
		config: Partial<StoryConfig>
    }
}

interface InterfaceProps {
	story: Story
}

@observer
class Interface extends React.Component<InterfaceProps, null> {
	// Fade-in animation times
	readonly PASSAGE_FADE_IN_DURATION = 500;
	readonly CHOICE_FADE_IN_DELAY = 800;
	readonly CHOICE_FADE_IN_DELAY_PER = 400;
	readonly CHOICE_FADE_IN_DURATION = 500;
	readonly PROP_FADE_IN_DELAY = 400;
	readonly PROP_FADE_IN_DURATION = 400;

	// Fade-out animation times
	readonly CHOICE_CHOSEN_FADE_OUT_DELAY = 400;

	@observable choiceChosen: Choice = null;

	get story(): Story {
		return this.props.story;
	}

	get character(): Character {
		return this.props.story.character;
	}

	get currentPassage(): Passage {
		return this.story.currentPassage;
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="elem">
						<div id="character-panel" className={"panel " + this.story.config.characterTheme}>
							<div className="panel-content">
								<div className="row">
									<div className="elem">
										<h2>
											{this.props.story.character.name}
										</h2>
									</div>
								</div>
								{this.story.config.enableHealth && (
									<div className="row">
										<div className="elem" style={{flexGrow: 1}}>
											<div className="progress-bar">
												<div
													className="fill red"
													style={{width: 100 * this.character.health / this.character.maxHealth + "%"}}
												>
												</div>
											</div>
										</div>
									</div>
								)}
								{this.story.config.enableStats && (
									<div className="row">
										<div className="elem">
											<div>
												{this.story.stats.map(stat => (
													<div>
														{stat.name}: {this.character.getStat(stat.name)}
													</div>
												))}
											</div>
										</div>
									</div>
								)}
								<hr />
								<div className="row">
									<div className="elem">
										<div className="items-grid">
											{this.character.inventory.items.map((item, i) => (
												<ItemComponent
													key={i}
													item={item}
													onDragStart={() => this.onItemDragStart(this.character.inventory, i)}
													onDrop={() => this.onItemDrop(this.character.inventory, i)}
												/>
											))}
										</div>
									</div>
								</div>
								{this.story.config.enableGold && (
									<div className="row">
										<div className="elem" style={{flexGrow: 1}}>
											<div className="money-tag">
												<div>
													{this.character.gold}
												</div>
												<div>
													<div className="item gold medium-coin"></div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="elem" style={{flexGrow: 1}}>
						{this.story.error != null && (
							<div className="row">
								<div className="elem" style={{flexGrow: 1}}>
									<div className="panel red">
										<div className="panel-content">
											Error: {this.story.error}
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="row">
							<div className="elem" style={{flexGrow: 1}}>
								<CSSTransition
									classNames="fade"
									timeout={{
										enter: this.PASSAGE_FADE_IN_DURATION,
										exit: this.CHOICE_CHOSEN_FADE_OUT_DELAY + this.PASSAGE_FADE_IN_DURATION
									}}
									appear={true}
									in={this.choiceChosen == null}
								>
									<div
										id="passage-panel"
										className={"panel " + this.currentPassage.getTheme(this.story.config.passageTheme)}
										style={{
											transitionDuration: this.PASSAGE_FADE_IN_DURATION + "ms",
											transitionDelay: this.choiceChosen == null
												? "0ms"
												: this.CHOICE_CHOSEN_FADE_OUT_DELAY + "ms"
										}}
										key={this.story.history.length}
									>
										<div className="panel-content">
											<div className="row">
												<div className="elem"
													style={{flexGrow: 1}}
													dangerouslySetInnerHTML={{__html: this.story.rendereredText}}
												>
												</div>
											</div>
										</div>
									</div>
								</CSSTransition>
							</div>
						</div>
						{this.story.lootableInventory != null && (
							<div className="row">
								<div className="elem" style={{display: "flex", justifyContent: "center", flexGrow: 1}}>
										<CSSTransition
											classNames="fade"
											timeout={{
												enter: this.PROP_FADE_IN_DELAY + this.PROP_FADE_IN_DURATION,
												exit: this.CHOICE_CHOSEN_FADE_OUT_DELAY + this.PASSAGE_FADE_IN_DURATION
											}}
											appear={true}
											in={this.choiceChosen == null}
										>
											<div
												className={"panel chest-panel " + this.story.config.chestTheme}
												style={{
													transitionDelay: this.choiceChosen == null
														? this.PROP_FADE_IN_DELAY + "ms"
														: this.CHOICE_CHOSEN_FADE_OUT_DELAY + "ms",
													transitionDuration: this.PASSAGE_FADE_IN_DURATION + "ms"
												}}
												key={1}
											>
												<div className="panel-content">
													<div className="items-grid">
														{this.story.lootableInventory.items.map((item, i) => (
															<ItemComponent
																key={i}
																item={item}
																onDragStart={() => this.onItemDragStart(this.story.lootableInventory, i)}
																onDrop={() => this.onItemDrop(this.story.lootableInventory, i)}
															/>
														))}
													</div>
												</div>
											</div>
										</CSSTransition>
								</div>
							</div>
						)}
						{this.story.shop != null && (
							<div className="row">
								<div className="elem" style={{display: "flex", justifyContent: "center", flexGrow: 1}}>
										<CSSTransition
											classNames="fade"
											timeout={{
												enter: this.PROP_FADE_IN_DELAY + this.PROP_FADE_IN_DURATION,
												exit: this.CHOICE_CHOSEN_FADE_OUT_DELAY + this.PASSAGE_FADE_IN_DURATION
											}}
											appear={true}
											in={this.choiceChosen == null}
										>
											<div
												className={"panel frame-light shop-panel"}
												style={{
													transitionDelay: this.choiceChosen == null
														? this.PROP_FADE_IN_DELAY + "ms"
														: this.CHOICE_CHOSEN_FADE_OUT_DELAY + "ms",
													transitionDuration: this.PASSAGE_FADE_IN_DURATION + "ms"
												}}
												key={1}
											>
												<div className="panel-content" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
													{this.story.shop.entries.map((entry, i) => (
														<div className="shop-entry">
															<div className="row" style={{justifyContent: "space-between"}}>
																<div className="elem">
																	<ItemComponent
																		key={i}
																		item={this.story.shop.inventory.items[i]}
																		draggable={entry.bought}
																		onDragStart={() => this.onItemDragStart(this.story.shop.inventory, i)}
																		onDrop={() => this.onItemDrop(this.story.shop.inventory, i)}
																	/>
																</div>
																{!entry.bought ? (
																	<div className="elem">
																		<div className="row">
																			<div className="elem">
																				<div className="money-tag">
																					<div>
																						{entry.price}
																					</div>
																					<div>
																						<div className="item gold medium-coin"></div>
																					</div>
																				</div>
																			</div>
																			<div className="elem">
																				<button
																				style={{visibility: this.story.shop.canBuy(entry) ? "visible" : "hidden"}}
																					className="button blue"
																					onClick={e => this.story.shop.buy(entry)}
																				>
																					Buy
																				</button>
																			</div>
																		</div>
																	</div>
																) : (
																	<div className="elem">
																		{/*
																			This div is there to still take the remaining place
																			and keep the item-slot on the left-side
																		*/}
																	</div>
																)}
															</div>
														</div>
													))}
												</div>
											</div>
										</CSSTransition>
								</div>
							</div>
						)}
						<div>
							{this.story.choices.map((c, i) => (
								<div className="row" key={i}>
									<div className="elem" style={{flexGrow: 1}}>
										<CSSTransition
											classNames="fade"
											timeout={{
												enter: this.CHOICE_FADE_IN_DELAY + this.CHOICE_FADE_IN_DELAY_PER * (this.story.choices.length + 1),
												exit: this.CHOICE_CHOSEN_FADE_OUT_DELAY + this.CHOICE_FADE_IN_DURATION
											}}
											appear={true}
											in={this.choiceChosen == null}
										>
											<button
												className={"button " + c.getTheme(this.story.config.buttonTheme)}
												dangerouslySetInnerHTML={{__html: c.text}}
												onClick={() => this.onChoice(c)}
												style={{
													width: "100%",
													transitionDelay: this.choiceChosen == null
														? (this.CHOICE_FADE_IN_DELAY + ((i + 1) * this.CHOICE_FADE_IN_DELAY_PER)) + "ms"
														: this.choiceChosen == c ? this.CHOICE_CHOSEN_FADE_OUT_DELAY + "ms" : "0ms",
													transitionDuration: this.CHOICE_FADE_IN_DURATION + "ms"
												}}
											>
											</button>
										</CSSTransition>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	onChoice(choice: Choice) {
		if (this.choiceChosen != null) {
			return;
		}

		this.choiceChosen = choice;

		setTimeout(() => {
			this.choiceChosen = null;
			this.story.choose(choice);
		}, this.CHOICE_CHOSEN_FADE_OUT_DELAY + this.PASSAGE_FADE_IN_DURATION);
	}

	onItemDragStart(inventory: Inventory, i: number) {
		ItemDragDataTransfer.create(inventory, i);
	}

	onItemDrop(toInventory: Inventory, toI: number) {
		let dataTransfer = ItemDragDataTransfer.i;

		let fromInventory = dataTransfer.inventory;
		let fromI = dataTransfer.i;

		if (fromInventory.items[fromI] == null) {
			return;
		}

		let replacedItem = toInventory.items[toI];
		toInventory.items[toI] = fromInventory.items[fromI];
		fromInventory.items[fromI] = replacedItem;
	}
}

interface ItemComponentProps {
	item: Item;
	onClick?: () => void;
	onDragStart?: () => void;
	onDrop?: () => void;
	draggable?: boolean;
}

@observer
class ItemComponent extends React.Component<ItemComponentProps, null> {
	readonly SIZE_ITEM = 32;

	render() {
		return (
			<div
				className="item-slot"
				onDragOver={this.props.item == null ? e => this.onDragOver(e) : null}
				onDrop={this.props.item == null ? e => this.onDrop(e) : null}
			>
				{this.props.item != null && (
					<Tooltip
						tooltip={
							<div className="tooltip panel">
								{this.props.item.name}
							</div>
						}
					>
						<div className="item clickable"
							draggable={this.props.draggable}
							onDragStart={e => this.onDragStart(e)}
							onClick={this.props.onClick}
							style={{backgroundPosition: this.getBackgroundPosition()}}
						>
						</div>
					</Tooltip>
				)}
			</div>
		);
	}

	getBackgroundPosition(): string {
		return (-this.props.item.x * this.SIZE_ITEM) + "px " + (-this.props.item.y * this.SIZE_ITEM) + "px";
	}

	onDragStart(e: React.DragEvent<HTMLDivElement>) {
		e.dataTransfer.dropEffect = "move";

		let div = document.createElement("div");
		div.className = "item";
		div.style.backgroundPosition = this.getBackgroundPosition();
		div.style.display = "none";

		document.getElementsByTagName("body")[0].appendChild(div);
		e.dataTransfer.setDragImage(div, 16, 16);

		if (this.props.onDragStart != null) {
			this.props.onDragStart();
		}
	}

	onDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	onDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();

		if (this.props.onDrop != null) {
			this.props.onDrop();
		}
	}
}

/**
 * This class is used to handle the data transported
 * during a drag-n-drop operation of an item
 */
class ItemDragDataTransfer {
	static i: ItemDragDataTransfer;

	private constructor(
		public inventory: Inventory,
		public i: number
	) {
		ItemDragDataTransfer.i = this;
	}

	static create(inventory: Inventory, i: number) {
		new ItemDragDataTransfer(inventory, i);
	}
}

interface TooltipProps {
	tooltip: React.ReactNode
}

@observer
class Tooltip extends React.Component<TooltipProps> {
	readonly OFFSET = 20;

	@observable seeable: boolean = false;
	@observable x: number;
	@observable y: number;

	render() {
		return (
			<div
				onMouseEnter={e => this.onMouseEnter(e)}
				onMouseOut={e => this.onMouseOut(e)}
				onMouseMove={e => this.onMouseMove(e)}
			>
				{this.props.children}
				{this.seeable && (
					<CSSTransition
						in={true}
						appear={true}
						timeout={0}
					>
						<div
							style={{
								position: "absolute",
								zIndex: 10,
								top: (this.y + this.OFFSET) + "px",
								left: (this.x + this.OFFSET) + "px"
							}}
						>
						{this.props.tooltip}
						</div>
					</CSSTransition>
				)}
			</div>
		);
	}

	onMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
		this.seeable = true;
		this.updatePosition(e);
	}

	onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		if (this.seeable) {
			this.updatePosition(e);
		}
	}

	onMouseOut(e: React.MouseEvent<HTMLDivElement>) {
		this.seeable = false;
	}

	private updatePosition(e: React.MouseEvent<HTMLDivElement>) {
		this.x = e.clientX;
		this.y = e.clientY
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