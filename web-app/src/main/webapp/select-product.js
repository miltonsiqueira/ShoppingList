/*global jQuery, window, utils */
(function ($, document, console, utils) {
  "use strict";

  var CURRENCY_SYMBOL = "€",
    requestParameters = utils.params(),
    shoppingItem = requestParameters.shoppingItem,
    shoppingList = requestParameters.shoppingList;

  function formatCurrency(number) {
    return CURRENCY_SYMBOL + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  function updateShoppingListWithTheSelectedPrice(productName, placeName, productValue) {
    var shoppingListItem = shoppingList.find(function (shoppingListItem) {
      return shoppingListItem.name === shoppingItem;
    });

    shoppingListItem.productSelected = {
      productName: productName,
      place: placeName,
      price: productValue
    };
  }

  function createProductItemElements(product) {
    var $prices = $("<div>"),

      // Contains all elements from the ShoppingList
      $inputVarItemsList = $("<input type='hidden' name='shoppingList'>"),

      $row = $("<div class='selectProductItem border'>"),
      $form = $("<form method='get' action='shopping-list.html'>");

    $form
      .append($inputVarItemsList)
      .append("<div><span name='product'>" + product.name + "</span></div>")
      .append($prices)
      .appendTo($row);

    product.prices.forEach(function (item) {
      var $selectButton = $("<button type='submit' class='select-button'>Select</button>");
      $("<div>")
        .appendTo($prices)
        .append("<span class='place' name='place'>" + "@" + item.place + "</span>")
        .append("<span class='price' name='price'>" + formatCurrency(item.value) + "</span>")
        .append($selectButton)
        .append($inputVarItemsList);

      $selectButton.click(function () {

        updateShoppingListWithTheSelectedPrice(product.name, item.place, item.value);

        $inputVarItemsList.val(JSON.stringify(shoppingList));

      });

    });

    return $row;
  }

  function createProductList(prods) {
    var $prods = $("#products")
      .empty();

    prods.forEach(function (item) {
      $prods.append(createProductItemElements(item));
    });
  }

  function loadProductList(prods) {

    if (shoppingList) {
      shoppingList = JSON.parse(shoppingList);
    } else {
      shoppingList = [];
    }

    if (shoppingList) {

      $("#shoppingItem").text(shoppingItem);
      createProductList(prods);

      $("#cancelSelection").on("click", function () {
        $("#inputCancel").val(JSON.stringify(shoppingList));
      });

    }
  }


  $(document).ready(function () {
    var parameters = {
      name: shoppingItem
    };
    $.getJSON("api/product", parameters)
      .fail(function (jqxht, textStatus, error) {
        var err = textStatus + ", " + error;
        console.error("Request Failed: " + err);
      })
      .done(loadProductList);
  });

}(jQuery, window.document, window.console, utils));