# UniHome

## Summary
This is a OOP project for course CS5010. UniHome is an e-commerce platform designed for people to buy and sell homemade products.

## Author
Lang Min

## Working File
./main.js <br>
./code/Buyer.js <br>
./code/Item.js <br>
./code/Negotiation.js <br>
./code/Order.js <br>
./code/Seller.js <br>
./code/User.js

## How to Run
To run the code (main.js) in terminal, run
```bash
node main.js
``` 

## Gen AI Usage
I asked ChatGPT 4o at early stage about the relationship between class Buyer/Seller and class Negotiation. I studied and modified its provided answer.
Prompt: 
Suppose Seller strongly owns Item. Buyer can start a negotiation. Seller can reply buyer's bargain. What is the relationship between Buyer (or Seller) and Negotiation?
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

I asked ChatGPT 4o whether my code matches OOP related concepts. I referenced some of its answer.
Attachment: 
All files in folder code
Prompt:
Can you check these files and tell me: 1. Which parts match OOP Pillars (abstraction, encapsulation, inheritance, polymorphism)? 2. Which parts match SOLID Principles (single responsibility, open-closed, Liskov substitution, interface segregation, dependency inversion)? 3. Which parts match OOP design patterns (especially module, factory, etc.)?

