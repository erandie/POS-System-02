export default class CustomerModel{
    constructor(customer_id, customer_name, customer_address, contact) {
        this._customer_id = customer_id;
        this._customer_name = customer_name;
        this._customer_address = customer_address;
        this._contact = contact;
    }


    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    get customer_address() {
        return this._customer_address;
    }

    set customer_address(value) {
        this._customer_address = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }
}