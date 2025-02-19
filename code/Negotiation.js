/**
 * Represent a negotiation.
 */
export default class Negotiation {

    /**
     * Create a new negotiation.
     * @param {number} negotiationId 
     * @param {Item} negotiationItem 
     * @param {Buyer} buyer 
     */
    constructor(negotiationId, negotiationItem, buyer) {

        // Check the validation of arguments
        if (!negotiationId || typeof negotiationId !== "number" || negotiationId <= 0) {
            throw new Error("INPUT ERROR: invalid negotiation ID\n");
        }
        if (!negotiationItem || typeof negotiationItem.itemName !== "string") {
            throw new Error("INPUT ERROR: invalid item\n");
        }
        if (!buyer || typeof buyer.name !== "string") {
            throw new Error("INPUT ERROR: invalid buyer info\n")
        }

        this._negotiationId = negotiationId;
        this._negotiationItem = negotiationItem;
        this._buyer = buyer;

        this._offerHistory = [];

    }

    /**
     * @returns {number}
     */
    get negotiationId() {
        return this._negotiationId;
    }

    /**
     * @returns {Item}
     */
    get negotiationItem() {
        return this._negotiationItem;
    }

    /**
     * @returns {Buyer}
     */
    get buyer() {
        return this._buyer;
    }

    /**
     * @returns {Seller}
     */
    get seller() {
        return this._negotiationItem.seller;
    }

    /**
     * @returns {Array}
     */
    get offerHistory() {
        return this._offerHistory;
    }

    /**
     * Add a new offer to the offer history in the negotiation.
     * @param {string} name 
     * @param {string} type 
     * @param {number} offerPrice 
     * @param {string} reason 
     */
    addOffer(name, type, offerPrice, reason) {
        const offer = {
            name: name,
            type: type,
            offerPrice: offerPrice,
            reason: reason
        }
        if (this._offerHistory.length === 0) {
            this._offerHistory.push(offer);
        } else {
            if (offer.type === this._offerHistory[this._offerHistory.length-1].type) {
                throw new Error("ERROR: you may send another offer after the other one replies\n");
            } else {
                this._offerHistory.push(offer);
            }
        }
        
    }

    /**
     * Return the last offer in the offer history.
     * @returns {object}
     */
    viewOffer() {
        return this._offerHistory[this._offerHistory.length-1];
    }

    /**
     * Print the offer history of this negotiation.
     * @returns {void}
     */
    viewOfferHistory() {
        console.log(this.offerHistory);
    }

    /**
     * Get the price from the last offer in the offer history and call item's function.
     * @returns {void}
     */
    setFinalPrice() {
        const finalPrice = this._offerHistory[this._offerHistory.length-1].offerPrice;
        this.negotiationItem.finalizePrice(finalPrice);
    }

    /**
     * Call item's function to remove this negotiation.
     * @returns {void}
     */
    terminate() {
        this._negotiationItem.removeNegotiation(this._buyer);
    }

}