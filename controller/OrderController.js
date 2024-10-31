import {customer_array, item_array, order_array, cart_arr} from "../db/database.js";
import OrderModel from "../models/OrderModel.js";
import OrderDetailModel from "../models/OrderDetailModel.js";

export function loadCustomers() {

    $("#customers").empty();
    $("#customers").append('<option value="">Select a customer</option>');

    customer_array.forEach(item => {
        let option = `<option value="${item.customer_id()}">${item.customer_id}</option>`;
        $("customers").append(option);
    });
}

export function loadItems() {
    $('#items').empty();
    $('#items').append(`<option value = ""> Select An Item</option>`);
    item_array.forEach(item => {
        let option = `<option value = "${item._item_id}">${item._item_id}</option>>`
        $("#items").append(option);
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

$("#items").on('change', function () {

    let id = $(this).val();
    let item = item_array.find(item => item.item_id === id);
    if (item) {
        $("#itemName").val(item._item_name);
        $("#unitPrice-03").val(item._unit_price);
        $('#qtyOnHand').val(item._quantity);
    } else {
        $("#itemName").val("");
        $("#unitPrice-03").val("");
        $("#qtyOnHand").val("");
    }

});

$("#customers").on('change', function () {
    let selectedId = $(this).val();
    let customer = customer_array.find(item => item._customer_id === selectedId);
    if (customer) {
        $("#customerName").val(customer._customer_name);
    } else {
        $("#customerName").val(' ');
    }
});

const loadCartTable = () => {
    $('#orderTableBody').empty();
    cart_arr.forEach(item => {
        let data = `<tr>
                        <td>${item.item_id}</td>
                        <td>${item.item_name}</td>
                        <td>${item.unit_price}</td>
                        <td>${item.quantity()}</td>
                        <td>${item.total}</td>
                    </tr>`;
        $('#orderTableBody').append(data);
    });
}

$('#save_order_btn').on('click', function () {
    let item_code = $("#items").val();
    let description = $("#itemName").val();
    let unit_price = parseFloat($("#itemPrice").val());
    let qtyOnHand = parseInt($("#itemQtyOnHand").val());
    let qty = parseInt($("#itemQty").val());

    if (qty > qtyOnHand) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough quantity!",
        });
        return;
    }

    if (!item_code || !description || isNaN(unit_price) || isNaN(qty) || qty <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Empty or invalid fields!",
        });
        return;
    }

    let total = unit_price * qty;

    let cart_item = {
        item_code,
        description,
        unit_price,
        qty,
        total
    };

    cart_arr.push(cart_item);
    loadCartTable();
    updateItemArray();
    clearItemInputs();
});



































