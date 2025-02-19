import User from "./User.js";
import Item from "./Item.js";

export default class Seller extends User {

    constructor(userId, userName, email, type) {
        super(userId, userName, email, type);
        this._myItemList = [];
    }

    // A seller list a product to his own list
    listItem(itemId, itemName, description, initialPrice) {
        const newItem = new Item(itemId, itemName, description, initialPrice, this);
        this._myItemList.push(newItem);
        // console.log(`A new item '${newItem.itemName}' is listed by seller '${this._name}'\n`);
        return newItem;
    }

    removeItem(item) {
        if (this.id != item.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to remove an item\n");
        }
        for (let i = this._myItemList.length - 1; i >= 0; i--) {
            if (this._myItemList[i] === item) {
                this._myItemList.splice(i, 1);
            }
        }
    }

    viewMyItem() {
        console.log(`>>> Seller ${this._name}'s items: \n`);
        this._myItemList.forEach(item => item.getItemInfo());
        console.log(`<<< All ${this._name}'s items are displayed\n`)
    }

    updateOrderStatus(order) {
        if (this.id != order.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to update an order\n");
        }
        order.updateStatus();
    }

    endNegotiation(negotiation) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to end a negotiation\n");
        }
        negotiation.terminate();
    }

    makeOffer(negotiation, offerPrice, reason) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to make an offer\n");
        }
        negotiation.addOffer(this.name, this.type, offerPrice, reason);
    }

    viewOffer(negotiation) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to view an offer\n");
        }
        const latestOffer = negotiation.viewOffer();
        console.log(`The latest offer: ${latestOffer.type} ${latestOffer.name} bargain ${latestOffer.offerPrice}\n`);
    }

    acceptOffer(negotiation) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to accepte an offer\n");
        }
        negotiation.setFinalPrice();
    }

}