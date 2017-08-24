import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx/lib/mobx";
import * as CSSTransition from "react-transition-group/CSSTransition";

interface TooltipProps {
	tooltip: React.ReactNode
}

@observer
export default class Tooltip extends React.Component<TooltipProps> {
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