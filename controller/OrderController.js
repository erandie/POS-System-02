import { customer_array, item_array, order_array, cart_arr, orderDetail_arr } from "../db/database.js";
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
    $('#itemsId').append(`<option value="">Select An Item</option>`);
    item_array.forEach(item => {
        let option = `<option value="${item._item_id}">${item._item_id}</option>`;
        $("#itemsId").append(option);
    });
}

$(document).ready(function () {
    $("#orderId").val(generateOrderId());
    loadCustomers();
    loadItems();
});

let generateOrderId = function () {
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
        $("#itemUnitPrice").val("");
        $("#itemQtyOnHand").val("");
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
    cart_arr.forEach((item, index) => {
        let data = `<tr>
                         <td>${item.item_code}</td>
                         <td>${item.description}</td>
                         <td>${item.qty}</td>
                         <td>${item.unit_price}</td>
                         <td>${item.total}</td>
                         <td><button class="removeItem" style="background-color: #dc3545; color: white; font-weight: bold; border-radius: 10%; border: none" data-index="${index}">Remove</button></td>
                    </tr>`;
        $('#poTableBody').append(data);
    });

    $(".removeItem").on("click", function () {
        let index = $(this).data("index");
        cart_arr.splice(index, 1); // Remove item from cart array
        loadCartTable(); // Refresh the cart table
        loadTotalAmount(); // Update the total amount
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

    let cart_item = {
        item_code,
        description,
        unit_price,
        qty,
        total
    };

    cart_arr.push(cart_item);
    loadCartTable();
    loadTotalAmount();

    updateItemArray(item_code, qty);
    $("#itemQtyOnHand").val(qtyOnHand - qty);

    clearItemInputs();
});

const loadTotalAmount = () => {
    let totalAmount = cart_arr.reduce((sum, item) => sum + item.total, 0).toFixed(2);
    $('#totalAmount').val(totalAmount);
};

function updateItemArray(item_code, qty) {
    let item = item_array.find(item => item._item_id === item_code);
    if (item) {
        item._quantity -= qty;
    } else {
        console.error("Item Not Found");
    }
}

$("#placeOrderBtn").on('click', function () {
    let order_id = generateOrderId();
    let date = $("#orderDate").val();
    let customer_id = $("#customers").val();
    let total = parseFloat($("#totalAmount").val());

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
        let orderDetail = new OrderDetailModel(order_id, item.item_code, item.qty, item.unit_price);
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
    cart_arr.length = 0; // Clear cart array after placing order
    loadCartTable(); // Refresh table to show empty cart
    $("#totalAmount").val("0.00"); // Reset total amount
});

function clearOrderForm() {
    $("#itemsId").val('');
    $("#itemUnitPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
    $("#itemQtyOnHand").val('');
    $("#orderId").val(generateOrderId());
    $("#orderDate").val('');
    $("#customers").val('');
    $("#customerName").val('');
}

function clearItemInputs() {
    $("#itemsId").val('');
    $("#itemUnitPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
}
