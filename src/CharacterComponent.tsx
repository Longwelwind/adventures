import { observer } from 'mobx-react';
import * as React from "react";
import Story from "./Story";
import Character from "./Character";
import { Interface } from "./script";
import ItemComponent from "./ItemComponent";

interface CharacterComponentProps {
	story: Story;
}

@observer
export default class CharacterComponent extends React.Component<CharacterComponentProps, null> {
	
	get story(): Story {
		return this.props.story;
	}

	get character(): Character {
		return this.props.story.character;
	}
	
	render() {
		return (
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
										onDragStart={() => Interface.onItemDragStart(this.character.inventory, i)}
										onDrop={() => Interface.onItemDrop(this.character.inventory, i)}
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
		);
	}
}