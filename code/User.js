export default class User {

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

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get type() {
        return this._type;
    }

    getUserInfo() {
        console.log(`    User ID: ${this._id}\n    User Name: ${this._name}\n    Email: ${this._email}\n    Type: ${this._type}\n`);
    }

    resetName(newName) {
        this._name = newName;
    }

}