/**
 * Represent an order.
 * @class Order
 * @exports default
 */
export default class Order {

    // constructor(orderId, orderItem, buyer) {

    //     // Check the validation of arguments
    //     if (!orderId || typeof orderId !== "number" || orderId <= 0) {
    //         throw new Error("INPUT ERROR: invalid order ID\n");
    //     }
    //     if (!orderItem || typeof orderItem.itemName !== "string") {
    //         throw new Error("INPUT ERROR: invalid item\n");
    //     }
    //     if (!buyer || typeof buyer.name !== "string") {
    //         throw new Error("INPUT ERROR: invalid buyer info\n")
    //     }

    //     this._orderId = orderId;
    //     this._orderItem = orderItem;
    //     this._buyer = buyer;
    //     this._price = orderItem.finalPrice;

    //     this._status = "incomplete";
    // }

    /**
     * Create a new order.
     * @constructor
     */
    constructor() {
        this._orderId = null;
        this._orderItem = "";
        this._buyer = "";
        this._price = this._orderItem.finalPrice;
        this._status = "incomplete";
    }

    /**
     * @returns {number}
     */
    get orderId() {
        return this._orderId;
    }

    /**
     * @returns {Item}
     */
    get orderItem() {
        return this._orderItem;
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
        return this._orderItem.seller;
    }

    /**
     * @returns {string}
     */
    get status() {
        return this._status;
    }

    /**
     * Change the status of an order from incomplete to complete.
     * @returns {void}
     */
    updateStatus() {
        this._status = "complete";
    }

    /**
     * Print the invoice an order.
     * @returns {void}
     */
    generateInvoice() {
        console.log("Order placed!\n");
        console.log(">>> Invoice\n");
        console.log(`    Buyer: ${this._buyer.name}\n    Seller: ${this._orderItem.seller.name}\n    Item: ${this._orderItem.itemName}\n    Paid: ${this._price}\n`);
        console.log("<<< Invoice displayed\n");
    }
}