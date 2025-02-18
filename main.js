import Buyer from "./code/Buyer.js";
import Seller from "./code/Seller.js";
import Item from "./code/Item.js";
import Negotiation from "./code/Negotiation.js";
import Order from "./code/Order.js";

let userIdCounter = 0;
let itemIdCounter = 0;
let negotiationIdCounter = 0;
let orderIdCounter = 0;

const allItems = [];

// Two new sellers
const seller1 = new Seller(++userIdCounter, "Tiana", "tiana@example.com", "seller");
seller1.getUserInfo();
const seller2 = new Seller(++userIdCounter, "Cindy", "cindy@example.com", "seller");
console.log(seller2.name);
console.log("\n");

// Two new buyers
const buyer1 = new Buyer(++userIdCounter, "Kyle", "kyle@example.com", "buyer");
buyer1.getUserInfo();
const buyer2 = new Buyer(++userIdCounter, "Eric", "eric@example.com", "buyer");
console.log(buyer2.id);
console.log("\n");
console.log("--------------------Part 1-------------------------------------------------------\n");

// Add three items for sale
const item1 = seller1.listItem(++itemIdCounter, "Sweater", "A nice handmade sweater with special patterns", 60);
allItems.push(item1);
const item2 = seller1.listItem(++itemIdCounter, "Watch", "A watch from the dead man", 120);
allItems.push(item2);
const item3 = seller2.listItem(++itemIdCounter, "Phone", "A used phone", 200);
allItems.push(item3);
const item4 = seller1.listItem(++itemIdCounter, "Glove", "A used glove", 5);
allItems.push(item4);

seller1.viewMyItem();
seller2.viewMyItem();

// console.log(`Seller of item1 is: ${item1.seller.name}\n`);
console.log("--------------------Part 2-------------------------------------------------------\n");

// Place a new order
const order1 = buyer1.placeOrder(++orderIdCounter, item1);
buyer1.viewOrderStatus(order1);     // Status = incomplete
seller1.updateOrderStatus(order1);  // Update order status
buyer1.viewOrderStatus(order1);     // Status = complete
seller1.removeItem(item1);          // Remove sold item
seller1.viewMyItem();
console.log("--------------------Part 3-------------------------------------------------------\n");

// Have a negotiation
const negotiation1 = buyer1.startNegotiation(++negotiationIdCounter, item2);
buyer1.makeOffer(negotiation1, 50, "Not even good enough, I think.");
seller1.makeOffer(negotiation1, 100, "Cool, but I spend many time on it.");
buyer1.makeOffer(negotiation1, 80, "How about this?");
seller1.makeOffer(negotiation1, 95, "This is my lowest price.");
buyer1.viewOffer(negotiation1);
buyer1.acceptOffer(negotiation1);
buyer1.placeOrder(++orderIdCounter, item2);
console.log("--------------------Part 4-------------------------------------------------------\n");

const negotiation2 = buyer2.startNegotiation(++negotiationIdCounter, item3);
buyer2.makeOffer(negotiation2, 20, "You made a garbage.");
seller2.endNegotiation(negotiation2);
console.log("--------------------Part 5-------------------------------------------------------\n");




