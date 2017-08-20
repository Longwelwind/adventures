/**
 * This script takes the item defined by the config
 * and prints a Markdown table that can be put in the
 * documentation
 */
import defaultItems from "../src/defaultItems";

const itemPerRow = 2;
const size = 32;

for (let i = 0;i < Math.ceil(defaultItems.length / itemPerRow);i++) {
	let line: string[] = [];

	for (let j = 0;j < itemPerRow;j++) {
		let index = i*itemPerRow + j;

		if (index < defaultItems.length) {
			let item = defaultItems[index];

			line.push(`\`${item.tag}\`|${item.name}|<div class="item" style="background-position: ${-size*item.x}px ${-size*item.y}px"></div>`);
		} else {
			// This should be an empty cell
			line.push(`||`);
		}
	}

	console.log(line.join("||"));
}