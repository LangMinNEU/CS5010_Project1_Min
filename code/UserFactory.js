import Buyer from "./Buyer.js";
import Seller from "./Seller.js";

/**
 * It helps create new users.
 * @class UserFactory
 */
export default class UserFactory {

    /**
     * This is the new method for order creation.
     * @param {number} userId 
     * @param {string} userName 
     * @param {string} email 
     * @param {string} type 
     * @returns {Buyer|Seller}
     * @throws {Error}
     */
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

}