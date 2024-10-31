import CustomerModel from "../models/CustomerModel.js";

import {customer_array} from "../db/database.js";

import {loadCustomers} from "./OrderController.js";

// ==============customer section================

$(document).ready(function () {
    $("#id-input").val(generateCustomerId());
});

//==================Mobile Validation==============

const validateMobileNumber = (contact) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(contact);
}

//=================generateCustomerId===============

let generateCustomerId = function generateCustomerId() {

    let id = customer_array.length + 1;
    return "C" + id.toString().padStart(3, '0'); // Pad with zeros to make it "C001", "C002", etc.
}

//==================loadCustomerTable=================

const loadCustomerToTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item, index) => {
        console.log(item);

        let data = `<tr>
            <td>${item.customer_id}</td>
            <td>${item.customer_name}</td>
            <td>${item.customer_address}</td>
            <td>${item.contact}</td>
            <td class="row-actions"><button class="btn btn-danger" id="delete-customer">Delete</button></td>
        </tr>`
        $('#customerTableBody').append(data);

    });
}

let customerCount = 0;
$('#customer-count').text(customerCount);

//================Register Customer=====================

$('#register_btn').on('click', function () {
    let customer_id = generateCustomerId();
    let customer_name = $('#name-input').val();
    let customer_address = $('#address-input').val();
    let contact = $('#contact').val();

    if (customer_name.length == 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Name!",
        });
    } else if (customer_address.length == 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Address!",
        });
    } else if (!validateMobileNumber(contact)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Contact Number!",
        });
    } else {
        let customer = new CustomerModel(
            customer_id,
            customer_name,
            customer_address,
            contact
        );

        if (customer_array.push(customer)) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Customer has been saved successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            loadCustomerToTable();

            loadCustomers();

            clearForm();

            customer_array.push(customer);

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Customer not been saved!!",

            });
        }

    }

});

//==========load customer details to inputFields=================

let selected_customer_index = null;

$('#customerTableBody').on('click', 'tr', function () {

    let index = $(this).index();

    selected_customer_index = index;

    let customer_obj = customer_array[index];

    let customer_id = customer_obj.customer_id;
    let customer_name = customer_obj.customer_name;
    let customer_address = customer_obj.customer_address;
    let contact = customer_obj.contact;

    $('#id-inputt').val(customer_id);
    $('#name-inputt').val(customer_name);
    $('#address-inputt').val(customer_address);
    $('#contactt').val(contact);
});

//=================Update Customer==================

$('#customer_update_btn').on('click', function () {

    let index = selected_customer_index;

    let customer_id = $('#id-inputt').val();
    let customer_name = $('#name-inputt').val();
    let customer_address = $('#address-inputt').val();
    let contact = $('#contactt').val();

    let customer = new CustomerModel(
        customer_array[index].customer_id,
        customer_name,
        customer_address,
        contact
    );

    customer_array[selected_customer_index] = customer;

    loadCustomerToTable();

    clearForm();

    selected_customer_index = null;
});

//=================clear customer form=================

$('#customer_clear_btn').on('click', function () {

    clearForm();

});
p
function clearForm() {

    $('#id-input').val(generateCustomerId());
    $('#name-input').val("");
    $('#address-input').val("");
    $('#contact').val("");

    $('#id-inputt').val("");
    $('#name-inputt').val("");
    $('#address-inputt').val("");
    $('#contactt').val("");
}

$('#delete-customer').on('click', function () {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            customer_array.splice(selected_customer_index);

            loadCustomerToTable();
            clearForm();
            generateCustomerId();

            Swal.fire({
                title: "Deleted!",
                text: "Customer has been deleted.",
                icon: "success"
            });


        }
    });
});





































