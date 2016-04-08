// TODO review variable name 'item' is used to define a suggestion in the shopping list, but it's used in some iterators
/*global jQuery, console, itemName, itemsList */
(function ($, console, itemName, itemsList) {
  "use strict";

  var products;
  $.ajax({
    url: "products.json",
    dataType: "json",
    type: "get",
    error: function (data) {
      console.log("Error on getting the products.json");
    },
    success: function (data) {
      products = data.products;

      var

        CURRENCY_SYMBOL = "€",

        formatCurrency = function (number) {
          return CURRENCY_SYMBOL + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },

        createProductsList = function (itemName) {
          var getProductsFromItemName = function (itemName) {

              var regExpItemName = new RegExp(itemName, "i");


              return products.filter(function (item) {
                return item.name.search(regExpItemName) !== -1;
              });

            },
            prods = getProductsFromItemName(itemName),
            $prods = $("#products"),
            addRow = function (product) {
              var $prices = $("<div>"),
                $row = $("<div class='selectProductItem border'>"),
                $form = $("<form method='get' action='shopping-list.html'>"),
                $inputVarItemsList = $("<input type='hidden' name='itemsList'>");

              $row
                .appendTo($prods)
                .append($form);

              $form
                .append("<div><span name='product'>" + product.name + "</span></div>")
                .append($prices);

              product.prices.forEach(function (item) {
                var $selectButton = $("<button type='submit' class='select-button'>Select</button>");
                $("<div class='row'>")
                  .appendTo($prices)
                  .append("<span class='place' name='place'>" + "@" + item.place + "</span>")
                  .append("<span class='price' name='price'>" + formatCurrency(item.value) + "</span>")
                  .append($selectButton)
                  .append($inputVarItemsList);


                $selectButton.on("click", function () {

                  var shoppingListItem = itemsList.find(function (shoppingListItem) {
                    return shoppingListItem.name === itemName;
                  });

                  shoppingListItem.productSelected = {
                    productName: product.name,
                    place: item.place,
                    price: item.value
                  };

                  $inputVarItemsList.val(JSON.stringify(itemsList));

                });

              });
            };

          $prods.empty();

          prods.forEach(function (item) {
            addRow(item);
          });

        };


      if (itemsList) {
        itemsList = JSON.parse(itemsList);
      } else {
        itemsList = [];
      }

      if (itemsList) {

        $("#itemName").text(itemName);
        createProductsList(itemName);

        $("#cancelSelection").on("click", function () {
          $("#inputReturn").val(JSON.stringify(itemsList));
        });

      }
    }

  });

}(jQuery, console, itemName, itemsList));
