# Concept Demonstration

## OOP pillars

### Abstraction
All the classes have getter methods to hide implementation details. <br>
In file Item.js,
```javascript
get itemId() {
    return this._itemId;
}
```

### Encapsulation
All the classes have private attributes and getter methods to prevent direct access. <br>
In file User.js,
```javascript
constructor(id, name, email, type) {
    // ignore irrelevant code
    this._id = id;
    this._name = name;
    this._email = email;
    this._type = type;
}
get id() {
    return this._id;
}
```

### Inheritance
Both class Buyer and class Seller are children of class User. <br>
In file User.js,
```javascript
export default class User {}
```
In file Buyer.js,
```javascript
import User from "./User.js";
export default class Buyer extends User {}
```
In file Seller.js,
```javascript
import User from "./User.js";
export default class Seller extends User {}
```

### Polymorphism
Both Buyer and Seller has makeOffer() method but different results come up when calling it. <br>
In file Buyer.js,
```javascript
makeOffer(negotiation, offerPrice, reason) {
    if (this.id != negotiation.buyer.id) {
        throw new Error("FAILED ATTEMPT: unauthorized user tried to make an offer\n");
    }
    negotiation.addOffer(this.name, this.type, offerPrice, reason);
}
```
In file Seller.js,
```javascript
makeOffer(negotiation, offerPrice, reason) {
    if (this.id != negotiation.buyer.id) {
        throw new Error("FAILED ATTEMPT: unauthorized user tried to make an offer\n");
    }
    negotiation.addOffer(this.name, this.type, offerPrice, reason);
}
```


## SOLID Principles

### Single Responsibility
The class User handle only details for User. <br>
See file User.js for details.

### Open-closed
My Factory and Builder Pattern allow more subclasses and methods to be added without modifying existing logic. <br>
See file UserFactory.js and OrderBuilder.js for details.

### Liskov Substitution
Similar to polymorphism.
In file main.js,
```javascript
buyer1.viewOffer(negotiation1);
seller1.viewOffer(negotiation1);
```
In file Buyer.js,
```javascript
viewOffer(negotiation) {
    if (this.id != negotiation.buyer.id) {
        throw new Error("FAILED ATTEMPT: unauthorized user tried to view an offer\n");
    }
    const latestOffer = negotiation.viewOffer();
    console.log(`The latest offer: ${latestOffer.type} ${latestOffer.name} bargain ${latestOffer.offerPrice}\n`);
}
```
In file Seller.js,
```javascript
viewOffer(negotiation) {
    if (this.id != negotiation.buyer.id) {
        throw new Error("FAILED ATTEMPT: unauthorized user tried to view an offer\n");
    }
    const latestOffer = negotiation.viewOffer();
    console.log(`The latest offer: ${latestOffer.type} ${latestOffer.name} bargain ${latestOffer.offerPrice}\n`);
}
```

### Interface Segregation
Both class Buyer and Seller import that they need from the User. <br>
See file User.js, Buyer.js, and Seller.js for details.

### Dependency Inversion
Not explicitly implemented.


## Design Patterns

### Module Pattern
In file main.js,
```javascript
import Buyer from "./code/Buyer.js";
import Seller from "./code/Seller.js";
```
In file Buyer.js,
```javascript
export default class Buyer extends User {}
```
In file Seller.js,
```javascript
export default class Seller extends User {}
```

### Factory Pattern
In file UserFactory.js,
```javascript
static createUser(userId, userName, email, type) {
    switch(type) {
        case "buyer":
            return new Buyer(userId, userName, email, type);
        case "seller":
            return new Seller(userId, userName, email, type);
        default:
            throw new Error("ERROR: invalid type");
    }
}
```
And more details in UserFactory.js. <br>

### Builder Pattern
In file Buyer.js,
```javascript
placeOrder(orderId, orderItem) {
    const newOrder = new OrderBuilder()
        .setId(orderId)
        .setItem(orderItem)
        .setBuyer(this)
        .build();
    this._myOrderList.push(newOrder);
    newOrder.generateInvoice();
    return newOrder;
}
```
And more details in OrderBuilder.js. <br>

### Repository Pattern
Seller._myItemList acts as a repository for items, which is a basic implement of this pattern.
In file Seller.js,
```javascript
constructor(userId, userName, email, type) {
    super(userId, userName, email, type);
    this._myItemList = [];
}
listItem(itemId, itemName, description, initialPrice) {
    const newItem = new Item(itemId, itemName, description, initialPrice, this);
    this._myItemList.push(newItem);
    return newItem;
}
```

### Why Good
Module Pattern keeps logic hidden and restricts direct access, preventing unintended modifications. <br>
Factory Pattern decouples object creation from implementation to avoid duplications, and it is easier to maintain. <br>
Builder Pattern allows a complex object to be composed with multiple simpler elements, which is more flexible. <br>
Repository Pattern simply centralizes data management and increases maintainability.


## Counterexample for Used Design Pattern

### Counterexample for Module Pattern
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

### Counterexample for Factory Pattern
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

### Counterexample for Builder Pattern
```javascript
class CarBuilder {
    constructor() {
        this.engine = null;
        this.color = null;
        this.wheels = null;
    }
    setEngine(engine) {
        this.engine = engine; // ❌ No method chaining
    }
    setColor(color) {
        this.color = color; // ❌ No method chaining
    }
    setWheels(wheels) {
        this.wheels = wheels; // ❌ No method chaining
    }
    build() {
        return new Car(this.engine, this.color, this.wheels);
    }
}
class Car {
    constructor(engine, color, wheels) {
        this.engine = engine;
        this.color = color;
        this.wheels = wheels;
    }
    getInfo() {
        return `Car with ${this.engine} engine, ${this.color} color, and ${this.wheels} wheels.`;
    }
}
// ❌ Incorrect usage
const builder = new CarBuilder();
builder.setEngine("V8");
builder.setColor("Red");
builder.setWheels(4);
const car = builder.build();
console.log(car.getInfo()); // Output: "Car with V8 engine, Red color, and 4 wheels."
```

### Counterexample for Repository Pattern
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


