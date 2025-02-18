import User from "./User.js";
import Item from "./Item.js";
import Order from "./Order.js";
import Negotiation from "./Negotiation.js";

export default class Buyer extends User {

    constructor(userId, userName, email, type) {
        super(userId, userName, email, type);
        this._myOrderList = [];
    }

    viewListedItem(item) {

    }

    placeOrder(orderId, orderItem) {
        const newOrder = new Order(orderId, orderItem, this);
        this._myOrderList.push(newOrder);
        newOrder.generateInvoice();
        return newOrder;
    }

    viewOrderStatus(order) {
        console.log(order.status);
        console.log("\n");
    }

    startNegotiation(negotiationId, item) {
        const newNegotiation = new Negotiation(negotiationId, item, this);
        item.addNegotiation(newNegotiation);
        return newNegotiation;
    }

    endNegotiatioin(negotiation) {
        negotiation.terminate();
    }

    makeOffer(negotiation, offerPrice, reason) {
        negotiation.addOffer(this.name, this.type, offerPrice, reason);
    }

    viewOffer(negotiation) {
        const latestOffer = negotiation.viewOffer();
        console.log(`The latest offer: ${latestOffer.type} ${latestOffer.name} bargain ${latestOffer.offerPrice}\n`);
    }

    acceptOffer(negotiation) {
        negotiation.setFinalPrice();
    }

}