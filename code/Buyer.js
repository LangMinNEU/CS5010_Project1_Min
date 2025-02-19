import User from "./User.js";
import Order from "./Order.js";
import Negotiation from "./Negotiation.js";

export default class Buyer extends User {

    constructor(userId, userName, email, type) {
        super(userId, userName, email, type);
        this._myOrderList = [];
    }

    viewListedItem(item) {
        item.getItemInfo();
    }

    placeOrder(orderId, orderItem) {
        const newOrder = new Order(orderId, orderItem, this);
        this._myOrderList.push(newOrder);
        newOrder.generateInvoice();
        return newOrder;
    }

    viewOrderStatus(order) {
        if (this.id != order.buyer.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to view an order\n");
        }
        console.log(">>> Order\n");
        console.log(`    Order ID: ${order.orderId}\n    Status: ${order.status}\n`);
        console.log("<<< Order displayed\n");
    }

    startNegotiation(negotiationId, item) {
        const newNegotiation = new Negotiation(negotiationId, item, this);
        item.addNegotiation(newNegotiation);
        return newNegotiation;
    }

    endNegotiatioin(negotiation) {
        if (this.id != negotiation.buyer.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to end a negotiation\n");
        }
        negotiation.terminate();
    }

    makeOffer(negotiation, offerPrice, reason) {
        if (this.id != negotiation.buyer.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to make an offer\n");
        }
        negotiation.addOffer(this.name, this.type, offerPrice, reason);
    }

    viewOffer(negotiation) {
        if (this.id != negotiation.buyer.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to view an offer\n");
        }
        const latestOffer = negotiation.viewOffer();
        console.log(`The latest offer: ${latestOffer.type} ${latestOffer.name} bargain ${latestOffer.offerPrice}\n`);
    }

    acceptOffer(negotiation) {
        if (this.id != negotiation.buyer.id) {
            throw new Error("FAILED ATTEMPT: unauthorized user tried to accepte an offer\n");
        }
        negotiation.setFinalPrice();
    }

}