export default class Order {

    constructor(orderId, orderItem, buyer) {

        // Check the validation of arguments
        if (!orderId || typeof orderId !== "number" || orderId <= 0) {
            throw new Error("INPUT ERROR: invalid order ID\n");
        }
        if (!orderItem || typeof orderItem.itemName !== "string") {
            throw new Error("INPUT ERROR: invalid item\n");
        }
        if (!buyer || typeof buyer.name !== "string") {
            throw new Error("INPUT ERROR: invalid buyer info\n")
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
        console.log("Order placed!\n");
        console.log(">>> Invoice\n");
        console.log(`    Buyer: ${this._buyer.name}\n    Seller: ${this._orderItem.seller.name}\n    Item: ${this._orderItem.itemName}\n    Paid: ${this._price}\n`);
        console.log("<<< Invoice displayed\n");
    }
}