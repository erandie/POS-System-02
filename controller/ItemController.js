import ItemModel from "../models/ItemModel.js";

import { item_array } from "../db/database.js";

//===============generate Item Code================

let generateItemCode = function generateItemCode() {
    let item_id = item_array.length + 1;
    return "I" + item_id.toString().padStart(3, '0');
};

//==================Item Section====================

$(document).ready(function () {
    $("#id-input-02").val(generateItemCode());
});

//=================load item table==================

const loadItemToTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item, index) => {
        console.log(item);

        let data = `<tr>
            <td>${item.item_id}</td>
            <td>${item.item_name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit_price}</td>
            <td class="row-actions"><button class="btn btn-danger" id="delete-item">Delete</button></td>
        </tr>`
        $('#itemTableBody').append(data);
    });
}

//======================Save Item===============

$('#add_item_btn').on('click', function () {

    let item_id = generateItemCode();
    let item_name = $('#name-input-02').val();
    let quantity = $('#quantity').val();
    let unit_price = $('#unitPrice').val();

    let item = new ItemModel(
        item_id,
        item_name,
        quantity,
        unit_price
    );

    item_array.push(item);

    loadItemToTable();

    clearForm();
});

function clearForm() {

    $('#id-input-02').val(generateItemCode());
    $('#name-input-02').val("");
    $('#quantity').val("");
    $('#unitPrice').val("");

    $('#id-inputt-02').val("");
    $('#name-inputt-02').val("");
    $('#quantity-02').val("");
    $('#unitPrice-02').val("");

}

//====================load item details to input fields=================

let selected_item_index = null;

$('#itemTableBody').on('click', 'tr', function () {

    let index = $(this).index();

    selected_item_index = index;

    let item_obj = item_array[index];

    let item_id = item_obj.item_id;
    let item_name = item_obj.item_name;
    let quantity = item_obj.quantity;
    let unit_price = item_obj.unit_price;

    $('#id-inputt-02').val(item_id);
    $('#name-inputt-02').val(item_name);
    $('#quantity-02').val(quantity);
    $('#unitPrice-02').val(unit_price);
});

//=====================Update Item=====================

$('#item_update_btn').on('click', function () {

    let index = selected_item_index;

    let item_id = $('#id-inputt-02').val();
    let item_name = $('#name-inputt-02').val();
    let quantity = $('#quantity-02').val();
    let unit_price = $('#unitPrice-02').val();

    let item = new ItemModel(
        item_array[index].item_id,
        item_name,
        quantity,
        unit_price
    );

    item_array[selected_item_index] = item;

    loadItemToTable();

    clearForm();

    selected_item_index = null;

});

//==================clear items========================

$('#clear_item_btn').on('click', function () {
    clearForm();
});

//========================delete item=============================

function deleteItem(item_id) {
    // Find the index of the customer with the specified ID
    const itemIndex = item_array.findIndex(item => item.item_id === item_id);

    if (itemIndex === -1) {
        alert("Item not found.");
        return;
    }

    // Use SweetAlert for confirmation
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Remove the customer from the array
            item_array.splice(itemIndex, 1);

            // Save to local storage


            // Update the displayed customer list

            loadItemToTable();

            // Show success message
            Swal.fire(
                'Deleted!',
                'The customer has been deleted.',
                'success'
            );
            console.log(`Customer with ID ${item_id} deleted successfully.`);


        }
    });
}

// Handle deletion from the edit modal
$('#delete-item').on('click', function() {
    const item_id = $('#id-inputt-02').text(); // Get the ID of the customer to delete
    deleteItem(item_id);
});
































