# UniHome

## Summary
This is a OOP project for course CS5010. UniHome is an e-commerce platform designed for people to buy and sell homemade products. 

There are two types of user, which are buyer and seller. <br>
A buyer can 
- view listed items
- place orders
- check order status
- start negotiations to bargain with sellers
  - including make, view, and accept offers
- end negotiations if needed
A seller can
- list, view, and remove items
- update order status
- reply buyers that are bargaining
  - including make, view, and accept offers
- end negotiations if needed

## Author
Lang Min

## Working File/Folder
- ./main.js
- ./code/Buyer.js
- ./code/Item.js
- ./code/Negotiation.js
- ./code/Order.js
- ./code/Seller.js
- ./code/User.js
- ./out

Note that out contains JSDoc output

## How to Run
To run the code (main.js) in terminal, run
```bash
node main.js
``` 

## Video
[Watch on YouTube](https://youtu.be/UlPBGr7M-pY)

## Gen AI Usage
### Usage 1
I asked ChatGPT 4o at early stage about the relationship between class Buyer/Seller and class Negotiation. I studied and modified its provided answer. <br>
Prompt: <br>
Suppose Seller strongly owns Item. Buyer can start a negotiation. Seller can reply buyer's bargain. What is the relationship between Buyer (or Seller) and Negotiation? <br>
Answer:
```javascript
// Seller strongly owns Item (Composition)
class Seller {
    constructor(name) {
        this.name = name;
        this.itemsForSale = [];
    }

    listItem(name, price) {
        const item = new Item(name, price, this);
        this.itemsForSale.push(item);
        console.log(`${this.name} listed ${item.name} for $${item.price}`);
        return item;
    }

    replyToNegotiation(negotiation, newPrice) {
        console.log(`${this.name} counters with $${newPrice} for ${negotiation.item.name}`);
        negotiation.negotiate(this, newPrice);
    }
}

// Buyer weakly owns Negotiation (Aggregation)
class Buyer {
    constructor(name) {
        this.name = name;
    }

    startNegotiation(item) {
        const negotiation = new Negotiation(item, this, item.seller);
        console.log(`${this.name} started a negotiation for ${item.name}`);
        return negotiation;
    }

    offer(negotiation, price) {
        console.log(`${this.name} offers $${price} for ${negotiation.item.name}`);
        negotiation.negotiate(this, price);
    }

    exitNegotiation(negotiation) {
        negotiation.terminate(this);
    }
}

// Item weakly owns Negotiation (Aggregation)
class Item {
    constructor(name, price, seller) {
        this.name = name;
        this.price = price;
        this.seller = seller;
        this.negotiations = [];
    }

    addNegotiation(negotiation) {
        this.negotiations.push(negotiation);
    }

    removeNegotiation(negotiation) {
        this.negotiations = this.negotiations.filter(n => n !== negotiation);
    }
}

// Negotiation exists independently, but without Buyer & Seller, it serves no purpose
class Negotiation {
    constructor(item, buyer, seller) {
        this.item = item;
        this.buyer = buyer;
        this.seller = seller;
        this.currentOffer = item.price;
        this.offerHistory = [];

        item.addNegotiation(this); // Item keeps track of negotiations
    }

    negotiate(user, price) {
        if (user === this.buyer) {
            console.log(`Seller reviews Buyer's offer of $${price}...`);
        } else if (user === this.seller) {
            console.log(`Buyer reviews Seller's counteroffer of $${price}...`);
        }
        this.currentOffer = price;
        this.offerHistory.push({ user: user.name, price });
    }

    terminate(user) {
        console.log(`❌ ${user.name} terminated the negotiation for ${this.item.name}.`);
        this.item.removeNegotiation(this);
    }
}

// Simulation
const seller = new Seller("Alice");
const buyer = new Buyer("Bob");

const item = seller.listItem("Laptop", 1000);
const negotiation = buyer.startNegotiation(item);

buyer.offer(negotiation, 800);
seller.replyToNegotiation(negotiation, 900);
buyer.offer(negotiation, 850);
buyer.exitNegotiation(negotiation); // ✅ Buyer exits negotiation

console.log(`Remaining negotiations for ${item.name}:`, item.negotiations.length); // Output: 0
```

### Usage 2
I asked ChatGPT 4o whether my code matches OOP related concepts. I referenced some of its answer. <br>
Attachment: <br>
All files in folder code <br>
Prompt: <br>
Can you check these files and tell me: 1. Which parts match OOP Pillars (abstraction, encapsulation, inheritance, polymorphism)? 2. Which parts match SOLID Principles (single responsibility, open-closed, Liskov substitution, interface segregation, dependency inversion)? 3. Which parts match OOP design patterns (especially module, factory, etc.)? <br>
Answer: <br>
✅ Conclusion: Your Code Fully Matches OOP Pillars! <br>
Your implementation correctly follows all four pillars. The only room for improvement is: <br>
- Refactor shared methods into the base class to reduce duplication.
- Use better abstraction for error handling instead of throwing raw errors.
- Introduce a common superclass for Buyer & Seller to simplify role-based access control.

### Usage 3
I asked Claude 3.5 Sonnet whether my code matches any other design patterns. I referenced a part of its answer.
Attachment: <br>
All files in folder code <br>
Prompt: <br>
What design patterns other than module and factory does my code match? Think about singleton, observer, strategy, repository, and builder. <br>
Answer: <br>
- Singleton Pattern:
  - Not currently implemented
  - Could be useful for managing a single instance of user sessions or a global negotiation manager
- Observer Pattern: 
  - Partially implemented in the order system: 
    - Orders maintain state (_status) 
    - Seller can update status via updateOrderStatus() 
    - However, lacks true observer subscription mechanism 
    - Could be enhanced to notify buyers automatically when status changes
- Strategy Pattern:
  - Hints of it in the negotiation system:
    - Different offer strategies through makeOffer()
    - Could be formalized by extracting offer strategies into separate classes
    - Currently mixing strategy logic within Buyer and Seller classes 
- Repository Pattern:
  - Basic implementation present: 
    - Seller._myItemList acts as a repository for items 
    - Buyer._myOrderList acts as a repository for orders 
    - Has methods for adding/removing items (listItem, removeItem) 
    - However, lacks full repository pattern features like persistence and advanced querying
- Builder Pattern:
  - Not currently implemented
  - Could be beneficial for complex object construction:
    - Building Items with multiple optional attributes
    - Creating Orders with various configurations
    - Building complex Negotiations with multiple steps

### Usage 4
I asked ChatGPT 4o to provide counterexamples of my used patterns. I used the answer it provided. <br>
Prompt: <br>
Can you provide a counterexample in JavaScript for each of these three patterns (module, factory, repository)? <br>
Answer: <br>
```javascript
// Bad module pattern - everything is exposed globally
const itemModule = {
    items: [],  // ❌ Directly accessible
    addItem(item) {
        this.items.push(item);
    },
    getItems() {
        return this.items;
    }
};
// Global modifications (breaks encapsulation)
itemModule.items.push({ id: 1, name: "Laptop" });  // ❌ Anyone can modify the array directly!
console.log(itemModule.getItems());  // [{ id: 1, name: "Laptop" }]
```
❌ Why This Is a Bad Module Pattern?
- 🚨 Breaks Encapsulation → The items array is directly accessible and can be modified from outside.
- 🚨 No Data Protection → Anyone can directly change itemModule.items, leading to unpredictable behavior.
- 🚨 Lack of Control → Any code can modify the module’s internal state without using defined methods.

```javascript
// Bad Factory - Object creation is repeated everywhere
class User {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
// ❌ Instead of using a factory, we instantiate objects manually all over the code
const buyer = new User("Alice", "buyer");
const seller = new User("Bob", "seller");
const anotherBuyer = new User("Charlie", "buyer");
```
❌ Why This Is a Bad Factory Pattern?
- 🚨 Code Duplication → Every part of the application needs to remember how to create User objects.
- 🚨 No Encapsulation → The instantiation logic is scattered across different files instead of being centralized.
- 🚨 Difficult to Modify → If the constructor changes (e.g., adding email), you must update all instances manually.
```javascript
// Bad Repository Pattern - No data abstraction
class Order {
    constructor(orderId, item, buyer) {
        this.orderId = orderId;
        this.item = item;
        this.buyer = buyer;
    }
}
const orders = [];  // ❌ Global data structure exposed
function placeOrder(order) {
    orders.push(order);  // ❌ Directly modifying global data
}
function getAllOrders() {
    return orders;  // ❌ Returns direct reference (no encapsulation)
}
// Adding orders directly (bad practice)
placeOrder(new Order(1, "Laptop", "Alice"));
console.log(getAllOrders());  // ❌ Any code can modify this data
```
❌ Why This Is a Bad Repository Pattern?
- 🚨 Breaks Encapsulation → Business logic (placeOrder()) directly modifies global data.
- 🚨 No Abstraction → Any part of the application can modify orders without restrictions.
- 🚨 Data Integrity Issues → getAllOrders() returns a direct reference, allowing external code to modify it.
