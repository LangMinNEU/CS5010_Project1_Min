import Buyer from "./code/Buyer.js";
import Seller from "./code/Seller.js";
import UserFactory from "./code/UserFactory.js";

let userIdCounter = 0;
let itemIdCounter = 0;
let negotiationIdCounter = 0;
let orderIdCounter = 0;

const allItems = [];

console.log("\n\n-----Part 1--------------------------------------------------\n");
// Create two new sellers
// const seller1 = new Seller(++userIdCounter, "Tiana", "tiana@example.com", "seller");
const seller1 = UserFactory.createUser(++userIdCounter, "Tiana", "tiana@example.com", "seller");
seller1.getUserInfo();

// const seller2 = new Seller(++userIdCounter, "Cindy", "cindy@example.com", "seller");
const seller2 = UserFactory.createUser(++userIdCounter, "Cindy", "cindy@example.com", "seller");
seller2.getUserInfo();

// const seller3 = new Seller(++userIdCounter, "Lance", "lance.com", "seller");     // Gives constructor error

// Create two new buyers
// const buyer1 = new Buyer(++userIdCounter, "Kyle", "kyle@example.com", "buyer");
const buyer1 = UserFactory.createUser(++userIdCounter, "Kyle", "kyle@example.com", "buyer");
buyer1.getUserInfo();

// const buyer2 = new Buyer(++userIdCounter, "Eric", "eric@example.com", "buyer");
const buyer2 = UserFactory.createUser(++userIdCounter, "Kyle", "kyle@example.com", "buyer");
buyer2.getUserInfo();



console.log("\n\n-----Part 2--------------------------------------------------\n");
// Add four items for sale
const item1 = seller1.listItem(++itemIdCounter, "Sweater", "A nice handmade sweater with special patterns", 60);  // seller1 item
allItems.push(item1);

const item2 = seller1.listItem(++itemIdCounter, "Watch", "A watch from the dead man", 120);  // seller1 item
allItems.push(item2);

const item3 = seller2.listItem(++itemIdCounter, "Phone", "A used phone", 200);  // seller2 item
allItems.push(item3);

const item4 = seller1.listItem(++itemIdCounter, "Glove", "A used glove", 5);  // seller1 item
allItems.push(item4);

// Sellers view their listed items
seller1.viewMyItem();
seller2.viewMyItem();

// Buyer view item
buyer1.viewListedItem(item1);



console.log("\n\n-----Part 3--------------------------------------------------\n");
// Place a new order
const order1 = buyer1.placeOrder(++orderIdCounter, item1);

buyer1.viewOrderStatus(order1);     // Status = incomplete

seller1.updateOrderStatus(order1);  // Seller updates order status

buyer1.viewOrderStatus(order1);     // Status = complete

seller1.removeItem(item1);          // Seller removes sold item

seller1.viewMyItem();



console.log("\n\n-----Part 4--------------------------------------------------\n");
// Have a new negotiation
const negotiation1 = buyer1.startNegotiation(++negotiationIdCounter, item2);

buyer1.makeOffer(negotiation1, 50, "Not even good enough, I think.");
seller1.makeOffer(negotiation1, 100, "Cool, but I spend many time on it.");
buyer1.makeOffer(negotiation1, 80, "How about this?");
seller1.makeOffer(negotiation1, 95, "This is my lowest price.");

buyer1.viewOffer(negotiation1);
seller1.viewOffer(negotiation1);

buyer1.acceptOffer(negotiation1);

buyer1.placeOrder(++orderIdCounter, item2);




console.log("\n\n-----Part 5--------------------------------------------------\n");
// Have a new negotiation
const negotiation2 = buyer2.startNegotiation(++negotiationIdCounter, item3);

buyer2.makeOffer(negotiation2, 20, "You made a garbage.");

// User make another offer before responce
// buyer2.makeOffer(negotiation2, 10, "Hey, answer me!");  // Gives error

// User access other's negotiation
// seller1.viewOffer(negotiation2);     // Gives error

// Seller end the negotiation
seller2.endNegotiation(negotiation2);




