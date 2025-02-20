import Order from "./Order.js";

/**
 * It helps build the orders.
 * @class OrderBuilder
 * @exports default
 */
export default class OrderBuilder {

    /**
     * Create a new builder.
     * @constructor
     */
    constructor() {
        this.order = new Order();
    }

    /**
     * Set order id.
     * @param {number} orderId 
     * @returns {OrderBuilder}
     */
    setId(orderId) {
        if (!orderId || typeof orderId !== "number" || orderId <= 0) {
            throw new Error("INPUT ERROR: invalid order ID\n");
        }
        this.order._orderId = orderId;
        return this;
    }

    /**
     * Set order item.
     * @param {Item} orderItem 
     * @returns {OrderBuilder}
     */
    setItem(orderItem) {
        if (!orderItem || typeof orderItem.itemName !== "string") {
            throw new Error("INPUT ERROR: invalid item\n");
        }
        this.order._orderItem = orderItem;
        return this;
    }

    /**
     * Set order buyer.
     * @param {Buyer} buyer 
     * @returns {OrderBuilder}
     */
    setBuyer(buyer) {
        if (!buyer || typeof buyer.name !== "string") {
            throw new Error("INPUT ERROR: invalid buyer info\n")
        }
        this.order._buyer = buyer;
        return this;
    }

    /**
     * Return the built order.
     * @returns {Order}
     */
    build() {
        return this.order;
    }
}