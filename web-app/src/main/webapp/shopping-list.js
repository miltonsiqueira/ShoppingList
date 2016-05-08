/*global jQuery, document, utils*/
(function ($, document, utils) {
  "use strict";



  var
    CURRENCY_SYMBOL = "€",
    params = utils.params(),
    shoppingList = utils.shoppingList,
    
    $prodId,
    $list,
    itemsAdded = {},
    i;

  function rebuildItemsListFromItemsAdded() {

    shoppingList = [];
    Object.keys(itemsAdded).forEach(function (key) {
      if (itemsAdded[key] || itemsAdded[key] === 0) {
        shoppingList.push(itemsAdded[key]);
      }
    });

  }

  function addNewItem(shoppingItem) {

    var
      $rowDiv,
      $itemName,
      $divSelectedProd,
      $form,
      $inputVarShoppingList,
      $inputVarShoppingItem,
      $removeButton,
      $searchProductButton,
      productSelected = shoppingItem.productSelected;

    if (shoppingItem.name && !itemsAdded[shoppingItem.name]) {

      $itemName = $("<span class='item'>" + shoppingItem.name + "</span>");
      $form = $("<form>");
      $inputVarShoppingList = $("<input type='hidden' name='shoppingList'>");
      $inputVarShoppingItem = $("<input type='hidden' name='shoppingItem' value='" + shoppingItem.name + "'>");
      $removeButton = $("<button class='remove-button'>x</button>")
        .on("click", function () {
          $rowDiv.fadeOut(300, function () {
            $rowDiv.remove();
            itemsAdded[shoppingItem.name] = null;
          });
        });

      // TODO change this button for a search icon
      $searchProductButton = $("<button class='price-button' type='submit' formaction='select-product.html' formmethod='get'>" + CURRENCY_SYMBOL + "</button>")
        .on("click", function () {

          rebuildItemsListFromItemsAdded();

          $inputVarShoppingList.val(JSON.stringify(shoppingList));

        });

      $rowDiv = $("<div class='shoppingListItem border'>")
        .hide()
        .prependTo($list)
        .append($removeButton)
        .append($form);

      $form
        .append($itemName)
        .append($inputVarShoppingList)
        .append($inputVarShoppingItem)
        .append($searchProductButton);

      if (productSelected) {
        $("<div class='productDetails'>")
          .appendTo($form)
          .append("<span class='product'>" + productSelected.productName + "</span>")
          .append("<span class='place'>@" + productSelected.place + "</span>")
          .append("<span class='price'>" + CURRENCY_SYMBOL + productSelected.price + "</span>");
      }

      itemsAdded[shoppingItem.name] = shoppingItem;

      $rowDiv.fadeIn(500);

    }

  }

  function addNewItemFromInput() {
    addNewItem($prodId.val().trim());
    $prodId.val("").focus();
  }

  $(document).ready(function () {
    
    $list = $("#list");
    $prodId = $("#prod");
    
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

    if (shoppingList) {
      shoppingList = JSON.parse(shoppingList);
    } else {
      shoppingList = [];
    }

    shoppingList.forEach(function (shoppingItem, i) {
      addNewItem(shoppingItem);
    });

  });
  
}(jQuery, document, utils));