import Inventory from "./Inventory";

/**
 * This class is used to handle the data transported
 * during a drag-n-drop operation of an item
 */
export default class ItemDragDataTransfer {
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