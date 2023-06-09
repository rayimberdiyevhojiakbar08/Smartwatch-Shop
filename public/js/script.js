const btn = document.querySelectorAll("button[data-id]");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

let total = document.getElementById("total");

plus.addEventListener("click", () => {
    const quantity = document.getElementById("quantity");
    let total = document.getElementById("total");
    get_total_cost(parseInt( quantity.value) + 1, total);
});

minus.addEventListener("click", () => {
    const quantity = document.getElementById("quantity");
    let total = document.getElementById("total");
    get_total_cost(quantity.value - 1, total);
});

function get_total_cost(quantity, total) {
    
    $.ajax({
        url:"/total_cost",
        method:"POST",
        data: {
            id, 
            quantity,
            total: total.textContent
         },
        dataType:"JSON",
        success: function(data) {
            // window.location.reload();
            total.textContent = '$' + data.total;
        }
    });
}

btn.forEach(tag => {
tag.addEventListener("click", () => {
    let id = tag.getAttribute("data-id");
    var quantity = $('#quantity').val();

    $.ajax({
        url: "/add-to-cart",
        method: "POST",
        data: { 
          id,
          quantity
        },
        dataType: "JSON",
        success: function(data) {
          const count_items = document.getElementById("count-items");
          const set = new Set(data.map(item => item.data._id));
          count_items.textContent = set.size;
        }
      });
})
});


//     let plus = document.querySelectorAll(".plus-btn");
//     let minus = document.querySelectorAll(".minus-btn");
//     let total = document.querySelectorAll(".total");
//     let quantity = document.querySelectorAll(".item-quantity");
//     let buy_cost = document.querySelectorAll(".buy_cost");
//     let stotal = document.getElementById("stotal")
//     let total_cart = document.getElementById("total_cart");

// for (let i = 0; i < plus.length; i++) {
//   plus[i].addEventListener("click", () => {
//     let id = plus[i].getAttribute('data-id');
//     get_total_cost(parseInt(quantity[i].value) + 1, total[i], id);
//     let currentQuant = parseInt(quantity[i].value) + 1
//     total_Summa_Cart(currentQuant, id)
//   });

//   minus[i].addEventListener("click", () => {
//     let id = minus[i].getAttribute('data-id');
//     if(quantity[i].value === 0) {
//         quantity[i].value = 1
//     }
//     get_total_cost(parseInt(quantity[i].value) - 1, total[i], id);
//     let currentQuant = parseInt(quantity[i].value) - 1
//     total_Summa_Cart(currentQuant, id)
//   });
// }

//     function get_total_cost(quantity, total, id) {
//         $.ajax({
//             url:"/total_cart",
//             method:"POST",
//             data: {
//                 id, 
//                 quantity,
//                 total: total.textContent
//              },
//             dataType:"JSON",
//             success: function(data) {
//                 //window.location.reload();
//                 //console.log(data);
//                 total.textContent = "$" + data.total;
//                 if (data.quantity !== undefined && data.quantity !== null) {
//                     let quantityInput = $("#quantity_" + id); // Assuming you have unique IDs for each quantity input
//                     quantityInput.val(data.quantity);
//                 }

//             }
//         });
//     }