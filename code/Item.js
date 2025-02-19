/**
 * Represent an item.
 */
export default class Item {
    
    /**
     * Create a new item.
     * @param {number} itemId 
     * @param {string} itemName 
     * @param {string} description 
     * @param {number} initialPrice 
     * @param {Seller} seller 
     */
    constructor(itemId, itemName, description, initialPrice, seller) {

        // Check the validation of arguments
        if (!itemId || typeof itemId !== "number" || itemId <= 0) {
            throw new Error("INPUT ERROR: invalid item ID\n");
        }
        if (!itemName || typeof itemName !== "string") {
            throw new Error("INPUT ERROR: invalid item name\n");
        }
        if (!description || typeof description !== "string") {      // validation check needs improvment
            throw new Error("INPUT ERROR: invalid item description\n");
        }
        if (!initialPrice || typeof initialPrice !== "number" || initialPrice <= 0) {
            throw new Error("INPUT ERROR: invalid item initial price\n");
        }

        this._itemId = itemId;
        this._itemName = itemName;
        this._description = description;
        this._initialPrice = initialPrice;
        this._seller = seller;

        this._finalPrice = initialPrice;
        this._negotiationHistory = [];
    }

    /**
     * @returns {number}
     */
    get itemId() {
        return this._itemId;
    }

    /**
     * @returns {string}
     */
    get itemName() {
        return this._itemName;
    }

    /**
     * @returns {string}
     */
    get description() {
        return this._description;
    }

    /**
     * @returns {number}
     */
    get initialPrice() {
        return this._initialPrice;
    }

    /**
     * @returns {Seller}
     */
    get seller() {
        return this._seller;
    }

    /**
     * @returns {number}
     */
    get finalPrice() {
        return this._finalPrice;
    }
    
    /**
     * @returns {Array}
     */
    get negotiationHistory() {
        return this._negotiationHistory;
    }

    /**
     * Print the info of an item.
     * @returns {void}
     */
    getItemInfo() {
        console.log(`    Item ID: ${this._itemId}\n    Item Name: ${this._itemName}\n    Description: ${this._description}\n    Initial Price: ${this._initialPrice}\n`)
    }

    /**
     * Return the seller of this item.
     * @returns {Seller}
     */
    getSellerInfo() {
        return this._seller;
    }

    /**
     * Add a new negotiation to the negotiation history.
     * @param {Negotiation} newNegotiation 
     * @returns {void}
     */
    addNegotiation(newNegotiation) {
        this.negotiationHistory.push(newNegotiation);
    }

    /**
     * Call negotiation's function to show the offer history.
     * @param {Negotiation} currentNegotiation 
     * @returns {void}
     */
    viewNegotiation(currentNegotiation) {
        currentNegotiation.viewOfferHistory();
    }

    /**
     * Remove the negotiation that relates to this buyer.
     * @param {Buyer} buyer 
     * @returns {void}
     */
    removeNegotiation(buyer) {
        for (let p = this._negotiationHistory - 1; p >= 0; p--) {
            if (this._negotiationHistory[p].buyer === buyer) {
                this._negotiationHistory.splice(p, 1);
            }
        }
        console.log("A Negotiation ends\n");
    }

    /**
     * Change the final price of the item to the input price.
     * @param {number} finalPrice 
     * @returns {void}
     */
    finalizePrice(finalPrice) {
        this._finalPrice = finalPrice;
    }

}