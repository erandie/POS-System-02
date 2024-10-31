import {customer_array, item_array, order_array} from "../db/database.js";
import OrderModel from "../models/OrderModel.js";
import OrderDetailModel from "../models/OrderDetailModel.js";

export function loadCustomers() {

    $("#customers").empty();
    $("#customers").append('<option value="">Select a customer</option>');

    customer_array.forEach(item => {
        let option = `<option value="${item._customer_id()}">${item._customer_id}</option>`;
        $("customers").append(option);
    });
}

export function loadItems() {
    $('#itemSea').empty();
    $('#itemSea').append(`<option value = ""> Select An Item</option>`);
    item_array.forEach(item => {
        let option = `<option value = "${item._item_id}">${item._item_id}</option>>`
        $("#itemSea").append(option);
    });
}

$(document).ready(function () {
    $("#orderId").val(generateOrderId());
    loadCustomers();
    loadItems();
});

let generateOrderId = function generateOrderId() {
    let order_id = order_array.length + 1;
    return "0" + order_id.toString().padStart(3, '0');
};

































