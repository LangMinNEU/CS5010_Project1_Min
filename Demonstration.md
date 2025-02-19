# Demonstration

## OOP pillars

### Abstraction
All the classes abstract properties 

### Encapsulation


### Inheritance
Both class Buyer and class Seller are children of class User.
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




## SOLID Principles

### Single Responsibility
The class User handle only details for User.

### Open-closed

### Liskov Substitution

In file main.js,
```javascript
buyer1.viewOffer(negotiation1);
seller1.viewOffer(negotiation1);
```
In file Buyer.js,
```javascript

```
In file Seller.js,
```javascript

```

### Interface Segregation


### Dependency Inversion



## Design Patterns

### Moduel Pattern
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
In file main.js,
```javascript
import Seller from "./code/Seller.js";
const seller1 = Seller.createSeller(++userIdCounter, "Tiana", "tiana@example.com", "seller");
```
In file Seller.js,
```javascript
export default class Buyer extends User {
    static createBuyer(userId, userName, email, type) {
        return new Buyer(userId, userName, email, type);
    }
}
```

### Proxy Pattern
In file main.js,

