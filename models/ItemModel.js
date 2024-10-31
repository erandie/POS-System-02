export default class ItemModel {
    constructor(item_id, item_name, quantity, unit_price) {
        this._item_id = item_id;
        this._item_name = item_name;
        this._quantity = quantity;
        this._unit_price = unit_price;
    }


    get item_id() {
        return this._item_id;
    }

    set item_id(value) {
        this._item_id = value;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(value) {
        this._item_name = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get unit_price() {
        return this._unit_price;
    }

    set unit_price(value) {
        this._unit_price = value;
    }
}