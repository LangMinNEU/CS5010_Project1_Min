import User from "./User.js";
import Item from "./Item.js";
import Order from "./Order.js"

export default class Seller extends User {

    constructor(userId, userName, email, type) {
        super(userId, userName, email, type);
        this._myItemList = [];
    }

    // A seller list a product to his own list
    listItem(itemId, itemName, description, initialPrice) {
        const newItem = new Item(itemId, itemName, description, initialPrice, this);
        this._myItemList.push(newItem);
        console.log(`A new item '${newItem.itemName}' is listed by seller '${this._name}'\n`);
        return newItem;
    }

    removeItem(item) {
        for (let i = this._myItemList.length - 1; i >= 0; i--) {
            if (this._myItemList[i] === item) {
                this._myItemList.splice(i, 1);
            }
        }
    }

    viewMyItem() {
        console.log(`Seller ${this._name}'s items: \n`);
        this._myItemList.forEach(item => item.getItemInfo());
        console.log(`All ${this._name}'s items are displayed\n`)
    }

    updateOrderStatus(order) {
        order.updateStatus();
    }

    endNegotiation(negotiation) {
        negotiation.terminate();
    }

    makeOffer(negotiation, offerPrice, reason) {
        negotiation.addOffer(this.name, this.type, offerPrice, reason);
    }

    viewOffer(negotiation) {
        console.log(`The offer is: ${negotiation.viewOffer().offerPrice}`);
    }

    acceptOffer(negotiation) {
        negotiation.setFinalPrice();
    }

}