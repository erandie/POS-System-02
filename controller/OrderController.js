import {customer_array, item_array, order_array, cart_arr, orderDetail_arr} from "../db/database.js";
import OrderModel from "../models/OrderModel.js";
import OrderDetailModel from "../models/OrderDetailModel.js";

export function loadCustomers() {

    $("#customers").empty();
    $("#customers").append('<option value="">Select a Customer</option>');

    customer_array.forEach(item => {
        let option = `<option value="${item._customer_id}">${item._customer_id}</option>`;
        $("#customers").append(option);
    });
}

export function loadItems() {
    $('#itemsId').empty();
    $('#itemsId').append(`<option value = ""> Select An Item</option>`);
    item_array.forEach(item => {
        let option = `<option value = "${item._item_id}">${item._item_id}</option>>`
        $("#itemsId").append(option);
    });
}

$(document).ready(function () {
    $("#orderId").val(generateOrderId());
    loadCustomers();
    loadItems();
});

let generateOrderId = function generateOrderId() {
    let order_id = order_array.length + 1;
    return "Or" + order_id.toString().padStart(3, '0');
};

$("#itemsId").on('change', function () {

    let id = $(this).val();
    let item = item_array.find(item => item._item_id === id);
    if (item) {
        $("#itemName").val(item._item_name);
        $("#itemUnitPrice").val(item._unit_price);
        $('#itemQtyOnHand').val(item._quantity);
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
        $("#customerName").val('');
    }
});

const loadCartTable = () => {
    $('#poTableBody').empty();
    cart_arr.forEach(item => {
        let data = `<tr>
                         <td>${item.item_code}</td>
                        <td>${item.description}</td>
                        <td>${item.qty}</td>
                        <td>${item.unit_price}</td>
                        <td>${item.total}</td>
                    </tr>`;
        $('#poTableBody').append(data);
    });
}

$('#addToCartBtn').on('click', function () {
    let item_code = $("#itemsId").val();
    let description = $("#itemName").val();
    let unit_price = parseFloat($("#itemUnitPrice").val());
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

    $('#totalAmount').val(cart_arr.reduce((sum, item) => sum + item.total, 0).toFixed(2));


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

function updateItemArray(){
    let item_code = $("#itemsId").val();
    let item = item_array.find(item => item.item_code === item_code);
    let qty = parseInt($("#itemQty").val());

    if (item) {
        item._quantity -= qty;
    } else {
        console.error("Item Not Found");
    }
}

$("#placeOrderBtn").on('click', function () {
    let order_id = generateOrderId();
    let date = $("#orderDate").val();
    let customer_id =  $("#customers").val();
    let total = cart_arr.reduce((sum, item) => sum + item.total, 0);

    if (cart_arr.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No items in the cart!",
        });
        return;
    }

    let order = new OrderModel(order_id, customer_id, date, total);
    order_array.push(order);

    cart_arr.forEach(item => {
        let orderDetail = new OrderDetailModel(order_id, item.item_code, item.quantity, item.unit_price);
        orderDetail_arr.push(orderDetail);
    });

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Order placed successfully",
        showConfirmButton: false,
        timer: 1500
    });

    clearOrderForm();

});

function clearOrderForm(){
    $("#itemsId").val('');
    $("#itemUnitPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
    $("#itemQtyOnHand").val('');
    $("#orderId").val('');
    $("#orderDate").val('');
    $("#customers").val('');
    $("#customerName").val('');
    $("#poTableBody").val('');
   cart_arr.length = 0;
}

function clearItemInputs(){
    $("#itemsId").val('');
    $("#itemUnitPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
    $("#customers").val('');
    $("#customerName").val('');
}



































