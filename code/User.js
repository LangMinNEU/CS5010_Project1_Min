/**
 * Represent a user.
 * @class User
 */
export default class User {

    /**
     * Create a new user.
     * @constructor
     * @param {number} id - as the user's id
     * @param {string} name - as the user's name
     * @param {string} email - as the user's email
     * @param {string} type - either buyer or seller
     */
    constructor(id, name, email, type) {

        // Check the validation of arguments
        if (!id || typeof id !== "number" || id <= 0) {
            throw new Error("INPUT ERROR: invalid user ID\n");
        }
        if (!name || typeof name !== "string") {
            throw new Error("INPUT ERROR: invalid user name\n");
        }
        if (!email || typeof email !== "string" || !(email.includes("@"))) {
            throw new Error("INPUT ERROR: invalid user email\n");
        }
        if (!type || typeof type !== "string" || !["buyer", "seller"].includes(type.toLowerCase())) {
            throw new Error("INPUT ERROR: invalid user type\n");
        }

        this._id = id;
        this._name = name;
        this._email = email;
        this._type = type;
    }

    /**
     * @returns {number} - user id
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {string} - user name
     */
    get name() {
        return this._name;
    }

    /**
     * @returns {string} - user email
     */
    get email() {
        return this._email;
    }

    /**
     * @returns {string} - user type
     */
    get type() {
        return this._type;
    }

    /**
     * Print all the info of a user.
     * @returns {void}
     */
    getUserInfo() {
        console.log(`    User ID: ${this._id}\n    User Name: ${this._name}\n    Email: ${this._email}\n    Type: ${this._type}\n`);
    }

    /**
     * Reset the name of a user.
     * @param {string} newName 
     * @returns {void}
     */
    resetName(newName) {
        this._name = newName;
    }

}