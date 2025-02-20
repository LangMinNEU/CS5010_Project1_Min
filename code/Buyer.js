import User from "./User.js";
import Order from "./Order.js";
import Negotiation from "./Negotiation.js";
import OrderBuilder from "./OrderBuilder.js";

/**
 * Represent a buyer.
 * @class Buyer
 */
export default class Buyer extends User {

    /**
     * Create a new buyer.
     * @constructor
     * @param {number} userId 
     * @param {string} userName 
     * @param {string} email 
     * @param {string} type 
     */
    constructor(userId, userName, email, type) {
        super(userId, userName, email, type);
        this._myOrderList = [];
    }

    // This static method for buyer creation is deprecated and replaced by UserFactory
    // static createBuyer(userId, userName, email, type) {
    //     return new Buyer(userId, userName, email, type);
    // }

    /**
     * Call item's function to display the item's info.
     * @param {Item} item 
     * @returns {void}
     */
    viewListedItem(item) {
        item.getItemInfo();
    }

    /**
     * Create a new order with input item and this buyer.
     * @param {number} orderId 
     * @param {Item} orderItem 
     * @returns {Order}
     */
    placeOrder(orderId, orderItem) {
        // This method for order creation is deprecated and replaced by OrderBuilder
        // const newOrder = new Order(orderId, orderItem, this);

        // This is the new method for order creation
        const newOrder = new OrderBuilder()
            .setId(orderId)
            .setItem(orderItem)
            .setBuyer(this)
            .build();
        
        this._myOrderList.push(newOrder);
        newOrder.generateInvoice();
        return newOrder;
    }

    /**
     * Display the input order's info, including status.
     * @param {Order} order 
     * @returns {void}
     */
    viewOrderStatus(order) {
        if (this.id != order.buyer.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to view an order\n");
        }
        console.log(">>> Order\n");
        console.log(`    Order ID: ${order.orderId}\n    Status: ${order.status}\n`);
        console.log("<<< Order displayed\n");
    }

    /**
     * Create a new negotiation with input item.
     * @param {number} negotiationId 
     * @param {Item} item 
     * @returns {Negotiation}
     */
    startNegotiation(negotiationId, item) {
        const newNegotiation = new Negotiation(negotiationId, item, this);
        item.addNegotiation(newNegotiation);
        return newNegotiation;
    }

    /**
     * Call negotiation's function and delete this negotiation.
     * @param {Negotiation} negotiation 
     * @returns {void}
     */
    endNegotiatioin(negotiation) {
        if (this.id != negotiation.buyer.id) {
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
        if (this.id != negotiation.buyer.id) {
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
        if (this.id != negotiation.buyer.id) {
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
        if (this.id != negotiation.buyer.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to accepte an offer\n");
        }
        negotiation.setFinalPrice();
    }

}