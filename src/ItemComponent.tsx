import * as React from "react";
import Item from "./Item";
import { observer } from "mobx-react";
import Tooltip from "./Tooltip";

interface ItemComponentProps {
	item: Item;
	onClick?: () => void;
	onDragStart?: () => void;
	onDrop?: () => void;
	draggable?: boolean;
}

@observer
export default class ItemComponent extends React.Component<ItemComponentProps, null> {
	readonly SIZE_ITEM = 32;

	static defaultProps: Partial<ItemComponentProps> = {
		draggable: true
	};

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