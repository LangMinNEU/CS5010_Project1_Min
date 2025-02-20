import User from "./User.js";
import Item from "./Item.js";

/**
 * Represent a seller.
 * @class Seller
 * @exports default
 */
export default class Seller extends User {

    /**
     * Create a new seller.
     * @constructor
     * @param {number} userId 
     * @param {string} userName 
     * @param {string} email 
     * @param {string} type 
     */
    constructor(userId, userName, email, type) {
        super(userId, userName, email, type);
        this._myItemList = [];
    }

    // This static method for seller creation is deprecated and replaced by UserFactory
    // static createSeller(userId, userName, email, type) {
    //     return new Seller(userId, userName, email, type);
    // }

    /**
     * Create a new item and add to his own list.
     * @param {number} itemId 
     * @param {string} itemName 
     * @param {string} description 
     * @param {string} initialPrice 
     * @returns {Item}
     */
    listItem(itemId, itemName, description, initialPrice) {
        const newItem = new Item(itemId, itemName, description, initialPrice, this);
        this._myItemList.push(newItem);
        return newItem;
    }

    /**
     * Remove the input item from the seller's list.
     * @param {Item} item 
     * @returns {void}
     */
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

    /**
     * Display all items listed by the seller.
     * @returns {void}
     */
    viewMyItem() {
        console.log(`>>> Seller ${this._name}'s items: \n`);
        this._myItemList.forEach(item => item.getItemInfo());
        console.log(`<<< All ${this._name}'s items are displayed\n`)
    }

    /**
     * Call order's function to change the order's status.
     * @param {Order} order 
     * @returns {void}
     */
    updateOrderStatus(order) {
        if (this.id != order.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to update an order\n");
        }
        order.updateStatus();
    }

    /**
     * Call negotiation's function and delete this negotiation.
     * @param {Negotiation} negotiation 
     * @returns {void}
     */
    endNegotiation(negotiation) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to end a negotiation\n");
        }
        negotiation.terminate();
    }

    /**
     * Make a new offer to the negotiation about the item.
     * @param {Negotiation} negotiation 
     * @param {number} offerPrice 
     * @param {string} reason 
     * @returns {void}
     */
    makeOffer(negotiation, offerPrice, reason) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to make an offer\n");
        }
        negotiation.addOffer(this.name, this.type, offerPrice, reason);
    }

    /**
     * Display the latest offer in this negotiation.
     * @param {Negotiation} negotiation 
     * @returns {void}
     */
    viewOffer(negotiation) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to view an offer\n");
        }
        const latestOffer = negotiation.viewOffer();
        console.log(`The latest offer: ${latestOffer.type} ${latestOffer.name} bargain ${latestOffer.offerPrice}\n`);
    }

    /**
     * Accept the price of the latest offer in this negotiation to be the final price.
     * @param {Negotiation} negotiation 
     * @returns {void}
     */
    acceptOffer(negotiation) {
        if (this.id != negotiation.seller.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to accepte an offer\n");
        }
        negotiation.setFinalPrice();
    }

}