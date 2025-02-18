export default class Item {
    
    constructor(itemId, itemName, description, initialPrice, seller) {

        // Check the validation of arguments
        if (!itemId || typeof itemId !== "number" || itemId <= 0) {
            throw new Error("ERROR: invalid item ID\n");
        }
        if (!itemName || typeof itemName !== "string") {
            throw new Error("ERROR: invalid item name\n");
        }
        if (!description || typeof description !== "string") {      // validation check needs improvment
            throw new Error("ERROR: invalid item description\n");
        }
        if (!initialPrice || typeof initialPrice !== "number" || initialPrice <= 0) {
            throw new Error("ERROR: invalid item initial price\n");
        }

        this._itemId = itemId;
        this._itemName = itemName;
        this._description = description;
        this._initialPrice = initialPrice;
        this._seller = seller;

        this._finalPrice = initialPrice;
        this._negotiationHistory = [];
    }

    get itemId() {
        return this._itemId;
    }

    get itemName() {
        return this._itemName;
    }

    get description() {
        return this._description;
    }

    get initialPrice() {
        return this._initialPrice;
    }

    get seller() {
        return this._seller;
    }

    get finalPrice() {
        return this._finalPrice;
    }
    
    get negotiationHistory() {
        return this._negotiationHistory;
    }

    getItemInfo() {
        console.log(`    Item ID: ${this._itemId}\n    Item Name: ${this._itemName}\n    Description: ${this._description}\n    Initial Price: ${this._initialPrice}\n`)
    }

    getSellerInfo() {
        return this._seller;
    }

    // Add a new negotiation to the history of negotiation (same seller, different buyers)
    addNegotiation(newNegotiation) {
        this.negotiationHistory.push(newNegotiation);
    }

    viewNegotiation(currentNegotiation) {
        currentNegotiation.viewOfferHistory();
    }

    removeNegotiation(buyer) {
        for (let p = this._negotiationHistory - 1; p >= 0; p--) {
            if (this._negotiationHistory[p].buyer === buyer) {
                this._negotiationHistory.splice(p, 1);
            }
        }
        console.log("A Negotiation ends\n");
    }

    finalizePrice(finalPrice) {
        this._finalPrice = finalPrice;
    }

}