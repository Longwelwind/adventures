/**
 * This script takes the item defined by the config
 * and prints a Markdown table that can be put in the
 * documentation
 */
import defaultItems from "../src/defaultItems";

const itemPerRow = 2;
const size = 32;

console.log("<table>");

console.log("<tr>");
for (let i = 0;i < itemPerRow;i++) {
	console.log("<th>tag</th><th>name</th><th>icon</th>");
}
console.log("</tr>");

for (let i = 0;i < Math.ceil(defaultItems.length / itemPerRow);i++) {
	console.log("<tr>");
	for (let j = 0;j < itemPerRow;j++) {
		let index = i*itemPerRow + j;

		if (index < defaultItems.length) {
			let item = defaultItems[index];

			console.log(`<td><code>${item.tag}</code></td><td>${item.name}</td><td><div class="item" style="background-position: ${-size*item.x}px ${-size*item.y}px"></div></td>`);
		} else {
			// This should be an empty cell
			console.log(`<td></td><td></td><td></td>`);
		}
	}

	console.log("</tr>");
}

console.log("</table>");