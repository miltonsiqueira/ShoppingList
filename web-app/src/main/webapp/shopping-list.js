/*global jQuery, itemsList*/
(function ($, itemsList) {
  "use strict";

  var
    CURRENCY_SYMBOL = "€",
    $shoppingList = $("#shoppingList"),
    $prodId = $("#prod"),
    $list = $("#list"),
    itemsAdded = {},
    rebuildItemsListFromItemsAdded = function () {

      itemsList = [];
      Object.keys(itemsAdded).forEach(function (key) {
        if (itemsAdded[key] || itemsAdded[key] === 0) {
          itemsList.push(itemsAdded[key]);
        }
      });

    },
    addNewItem = function (item, productSelected) {

      var
        $rowDiv,
        $itemName,
        $divSelectedProd,
        $form,
        $inputVarItemsList,
        $inputVarItemName;

      if (item && !itemsAdded[item]) {

        $itemName = $("<span class='item'>" + item + "</span>");

        $form = $("<form>");
        $inputVarItemsList = $("<input type='hidden' name='itemsList'>");
        $inputVarItemName = $("<input type='hidden' name='itemName' value='" + item + "'>");

        $rowDiv = $("<div class='shoppingListItem border'>")
          .hide()
          .prependTo($list)
          .append($form);

        $form
          .append($itemName)
          .append($inputVarItemsList)
          .append($inputVarItemName)
          // TODO change this button for a search icon
          .append($("<button class='price-button' type='submit' formaction='select-product.html' formmethod='get'>" + CURRENCY_SYMBOL + "</button>")
            .on("click", function () {

              rebuildItemsListFromItemsAdded();

              $inputVarItemsList.val(JSON.stringify(itemsList));

            }))
          .append($("<button class='remove-button'>x</button>")
            .on("click", function () {
              $rowDiv.fadeOut(300, function () {
                $rowDiv.remove();
                itemsAdded[item] = null;
              });
            }));

        if (productSelected) {
          $("<div class='productDetails'>")
            .appendTo($form)
            .append("<span class='product'>" + productSelected.productName + "</span>")
            .append("<span class='place'>" + productSelected.place + "</span>")
            .append("<span class='price'>" + productSelected.price + "</span>");
        }

        itemsAdded[item] = {
          name: item,
          productSelected: productSelected
        };

        $rowDiv.fadeIn(500);

      }

    },
    addNewItemFromInput = function () {
      addNewItem($prodId.val().trim());
      $prodId.val("").focus();
    },
    i;

  $("#add").on("click", addNewItemFromInput);

  $prodId
    .val("")
    .focus()
    .keypress(function (event) {
      var keycode = (event.keyCode || event.which);
      if (keycode === 13) {
        addNewItemFromInput();
      }
    });

  if (itemsList) {
    itemsList = JSON.parse(itemsList);
  } else {
    itemsList = [];
  }

  // add in reverse order because the rows of the list are added through "prepend"
  for (i = 0; i < itemsList.length; i++) {
    addNewItem(itemsList[i].name, itemsList[i].productSelected);
  }
}(jQuery, itemsList));
