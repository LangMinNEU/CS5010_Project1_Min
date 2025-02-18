import Item from "./Item.js";

export default class Order {

    constructor(orderId, orderItem, buyer) {

        if (!(orderItem instanceof Item)) {
            throw new Error("ERROR: invalid item\n");
        }

        this._orderId = orderId;
        this._orderItem = orderItem;
        this._buyer = buyer;
        this._price = orderItem.finalPrice;

        this._status = "incomplete";
    }

    get orderId() {
        return this._orderId;
    }

    get orderItem() {
        return this._orderItem;
    }

    get buyer() {
        return this._buyer;
    }

    get seller() {
        return this._orderItem.seller;
    }

    get status() {
        return this._status;
    }

    updateStatus() {
        this._status = "complete";
    }

    generateInvoice() {
        console.log(`Buyer: ${this._buyer.name}\nSeller: ${this._orderItem.seller.name}\nItem: ${this._orderItem.itemName}\nPaid: ${this._price}\n`)
    }
}