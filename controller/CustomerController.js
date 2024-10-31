import CustomerModel from "../models/CustomerModel.js";

import {customer_array} from "../db/database.js";

// ==============customer section================

$(document).ready(function () {
    $("#id-input").val(generateCustomerId());
});

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
        </tr>`
        $('#customerTableBody').append(data);

    });
}

//================Register Customer=====================

$('#register_btn').on('click', function () {
    let customer_id = generateCustomerId();
    let customer_name = $('#name-input').val();
    let customer_address = $('#address-input').val();
    let contact = $('#contact').val();

   let customer = new CustomerModel(
       customer_id,
       customer_name,
       customer_address,
       contact
   );

   customer_array.push(customer);

   loadCustomerToTable();

   clearForm();

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





































