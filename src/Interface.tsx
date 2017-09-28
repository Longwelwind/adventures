import * as React from "react";
import { observer } from "mobx-react";
import Story from "./Story";
import { observable } from "mobx";
import Choice from "./Choice";
import Character from "./Character";
import Passage from "./Passage";
import * as CSSTransition from "react-transition-group/CSSTransition";
import CharacterComponent from "./CharacterComponent";
import ItemComponent from "./ItemComponent";
import ItemDragDataTransfer from "./ItemDragDataTransfer";
import Inventory from "./Inventory";

interface InterfaceProps {
	story: Story
}

@observer
export default class Interface extends React.Component<InterfaceProps, null> {
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
	@observable deadChoiceChosen: boolean = false;

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
					<div className="elem" style={{opacity: this.story.config.displayCharacterPanel ? 1 : 0}}>
							<CSSTransition
								classNames="fade"
								timeout={{
									enter: this.PROP_FADE_IN_DURATION,
									exit: this.PROP_FADE_IN_DURATION
								}}
								appear={true}
								in={this.story.config.displayCharacterPanel}
							>
								<CharacterComponent story={this.story} />
							</CSSTransition>
					</div>
					{this.story.error != null ? (
						<div className="elem" style={{flexGrow: 1}}>
							<div className="row">
								<div className="elem" style={{flexGrow: 1}}>
									<div className="panel red">
										<div className="panel-content">
											Error: {this.story.error}
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="elem" style={{flexGrow: 1}}>
							<div className="row">
								<div className="elem" style={{flexGrow: 1}}>
									<CSSTransition
										classNames="fade"
										timeout={{
											enter: this.PASSAGE_FADE_IN_DURATION,
											exit: this.CHOICE_CHOSEN_FADE_OUT_DELAY + this.PASSAGE_FADE_IN_DURATION
										}}
										appear={true}
										in={!this.isTransitioning()}
									>
										<div
											className={"panel " + this.currentPassage.getTheme(this.story.config.passageTheme)}
											style={{
												transitionDuration: this.PASSAGE_FADE_IN_DURATION + "ms",
												transitionDelay: !this.isTransitioning()
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
												in={!this.isTransitioning()}
											>
												<div
													className={"panel chest-panel " + this.story.config.chestTheme}
													style={{
														transitionDelay: !this.isTransitioning()
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
																	onDragStart={() => Interface.onItemDragStart(this.story.lootableInventory, i)}
																	onDrop={() => Interface.onItemDrop(this.story.lootableInventory, i)}
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
												in={!this.isTransitioning()}
											>
												<div
													className={"panel frame-light shop-panel"}
													style={{
														transitionDelay: !this.isTransitioning()
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
																			onDragStart={() => Interface.onItemDragStart(this.story.shop.inventory, i)}
																			onDrop={() => Interface.onItemDrop(this.story.shop.inventory, i)}
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
												in={!this.isTransitioning()}
											>
												<button
													className={"button " + c.getTheme(this.story.config.buttonTheme)}
													dangerouslySetInnerHTML={{__html: c.text}}
													onClick={() => this.onChoice(c)}
													style={{
														width: "100%",
														transitionDelay: !this.isTransitioning()
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
					)}
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

	isTransitioning(): boolean {
		return this.deadChoiceChosen || this.choiceChosen != null;
	}

	static onItemDragStart(inventory: Inventory, i: number) {
		ItemDragDataTransfer.create(inventory, i);
	}

	static onItemDrop(toInventory: Inventory, toI: number) {
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