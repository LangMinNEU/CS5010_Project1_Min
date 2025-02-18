import Item from "./Item.js"

export default class Negotiation {

    constructor(negotiationId, negotiationItem, buyer) {

        // Check the validation of arguments
        if (!negotiationId || typeof negotiationId !== "number" || negotiationId <= 0) {
            throw new Error("ERROR: invalid negotiation ID\n");
        }
        if (!negotiationItem || !(negotiationItem instanceof Item)) {
            throw new Error("ERROR: invalid item\n");
        }

        this._negotiationId = negotiationId;
        this._negotiationItem = negotiationItem;
        this._buyer = buyer;

        // this._currentPrice = null;
        this._offerHistory = [];

    }

    get negotiationId() {
        return this._negotiationId;
    }

    get negotiationItem() {
        return this._negotiationItem;
    }

    get buyer() {
        return this._buyer;
    }

    get seller() {
        return this._negotiationItem.seller;
    }

    get offerHistory() {
        return this._offerHistory;
    }

    addOffer(name, type, offerPrice, reason) {
        const offer = {
            name: name,
            type: type,
            offerPrice: offerPrice,
            reason: reason
        }
        this._offerHistory.push(offer);
    }

    viewOffer() {
        return this._offerHistory[this._offerHistory.length-1];
    }

    viewOfferHistory() {
        console.log(this.offerHistory);
    }

    setFinalPrice() {
        const finalPrice = this._offerHistory[this._offerHistory.length-1].offerPrice;
        this.negotiationItem.finalizePrice(finalPrice);
    }

    terminate() {
        this._negotiationItem.removeNegotiation(this._buyer);
    }

}