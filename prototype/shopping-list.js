/*global jQuery, carbonCalc, console */
(function ($) {
  "use strict";

  var data = {
      products: [{
        name: "Red apples",
        prices: [
          {
            value: 1.79,
            place: "Lidl"
          }]
      }, {
        name: "Cream crackers - Tesco",
        prices: [
          {
            value: 0.26,
            place: "Tesco"
          }]
      }, {
        name: "Organic Oats - Flahavan's",
        prices: [
          {
            value: 2.67,
            place: "Tesco"
          }]
      }, {
        name: "Batata Palha Tradicional - Visconti",
        prices: [
          {
            value: 2.50,
            place: "Mercado Brasileiro (near by SEDA)"
          }]
      }, {
        name: "Cork Flakes - Tesco",
        prices: [
          {
            value: 1.49,
            place: "Tesco"
          }]
      }, {
        name: "Milk dairy free - Koko",
        prices: [
          {
            value: 1.99,
            place: "Holland & Barrett"
          }]
      }, {
        name: "Water - Ballygowan",
        prices: [
          {
            value: 1.00,
            place: "EuroGiant"
          }]
      }, {
        name: "Cotton Buds",
        prices: [
          {
            value: 0.89,
            place: "Tesco"
          }]
      }, {
        name: "Bread Loaf Seed - Wholesome",
        prices: [
          {
            value: 1.09,
            place: "Lidl"
          }]
      }, {
        name: "Microwave popcorn - Spar",
        prices: [
          {
            value: 1.50,
            place: "Spar"
          }]
      }, {
        name: "Organic Spaghetti - Tesco",
        prices: [
          {
            value: 1.04,
            place: "Tesco"
          }]
      }, {
        name: "Microwave popcorn - Kelvin",
        prices: [
          {
            value: 2.77,
            place: "Tesco"
          }]
      }, {
        name: "Cherry Tomato",
        prices: [
          {
            value: 0.79,
            place: "Lidl"
          }]
      }, {
        name: "Red grapes Punnet",
        prices: [
          {
            value: 1.49,
            place: "Lidl"
          }]
      }, {
        name: "Banana loose",
        prices: [
          {
            value: 1.25,
            place: "Lidl"
          }]
      }, {
        name: "Garlig Baguettes",
        prices: [
          {
            value: 0.75,
            place: "Lidl"
          }]
      }, {
        name: "Rocket Leaves - Meadow Fresh",
        prices: [
          {
            value: 0.99,
            place: "Lidl"
          }]
      }, {
        name: "Organic Smoked Salmon",
        prices: [
          {
            value: 2.99,
            place: "Lidl"
          }]
      }, {
        name: "Milled Linseed Sesame",
        prices: [
          {
            value: 2.59,
            place: "Lidl"
          }]
      }, {
        name: "Olive oil",
        prices: [
          {
            value: 3.29,
            place: "Lidl"
          }]
      }, {
        name: "Nutella",
        prices: [
          {
            value: 2.69,
            place: "Lidl"
          }]
      }, {
        name: "Filled tuna in brine",
        prices: [
          {
            value: 1.29,
            place: "Lidl"
          }]
      }, {
        name: "Sweet potatoes",
        prices: [
          {
            value: 1.39,
            place: "Lidl"
          }]
      }, {
        name: "Avocado",
        prices: [
          {
            value: 2.69,
            place: "Lidl"
          }]
      }, {
        name: "Chestnut mushroom",
        prices: [
          {
            value: 0.89,
            place: "Lidl"
          }]
      }, {
        name: "Carrots",
        prices: [
          {
            value: 0.49,
            place: "Lidl"
          }]
      }, {
        name: "Baby Leaf Spinach",
        prices: [
          {
            value: 1.49,
            place: "Lidl"
          }]
      }, {
        name: "Peppers Mixed",
        prices: [
          {
            value: 1.59,
            place: "Lidl"
          }]
      }, {
        name: "Greek Yorgut Strawberry",
        prices: [
          {
            value: 1.49,
            place: "Lidl"
          }]
      }, {
        name: "Gouda Cheese Slices",
        prices: [
          {
            value: 1.49,
            place: "Lidl"
          }]
      }, {
        name: "Organic Spaghetti",
        prices: [
          {
            value: 0.89,
            place: "Lidl"
          }]
      }, {

        name: "Strawberry",
        prices: [
          {
            value: 2.99,
            place: "Lidl"
          },
          {
            value: 3.10,
            place: "Tesco"
          },
          {
            value: 1.00,
            place: "Street Market"
          }]
      }]
    },

    CURRENCY_SYMBOL = "€",

    $shoppingList = $("#shoppingList"),
    $selectProduct = $("#selectProduct"),
    goToShoppingList = function () {
      $selectProduct.hide();
      $shoppingList.fadeIn(200);
    },
    goToSelectProduct = function () {
      $shoppingList.hide();
      $selectProduct.fadeIn(200);
    },
    formatNumber = function (number) {
      return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    formatCurrency = function (number) {
      return CURRENCY_SYMBOL + formatNumber(number);
    },
    $prodId = $("#prod"),
    $list = $("#list"),
    itemsAdded = {},

    createProductsList = function ($itemName, $shoppingListItem) {
      var getProductsFromItemName = function (itemName) {
          var regExpItemName = new RegExp(itemName, "i");
          return data.products.filter(function (item) {
            return item.name.search(regExpItemName) != -1;
          });
        },
        prods = getProductsFromItemName($itemName.text()),
        $prods = $("#products"),
        addRow = function (product) {
          var $prices = $("<div>"),
            $row = $("<div class='selectProductItem border'>");

          $row
            .appendTo($prods)
            .append("<div><span>" + product.name + "</span></div>")
            .append($prices);

          product.prices.forEach(function (item) {
            var $selectButton = $("<button>Select</button>");
            $("<div class='row'>")
              .appendTo($prices)
              .append("<span class='place'>" + "@" + item.place + "</span>")
              .append("<span class='price'>" + formatCurrency(item.value) + "</span>")
              .append($selectButton);
            $selectButton.on("click", function () {
              $shoppingListItem.find(".productDetails").remove();
              $("<div class='productDetails'>")
                .appendTo($shoppingListItem)
                .append("<span class='product'>" + product.name + "</span>")
                .append("<span class='place'>" + "@" + item.place + "</span>")
                .append("<span class='price'>" + formatCurrency(item.value) + "</span>");


              goToShoppingList();
            });
          });
        };

      $prods.empty();

      prods.forEach(function (item) {
        addRow(item);
      });

    },

    addNewItem = function () {

      var item = $prodId.val().trim(),
        $rowDiv,
        $itemName,
        $divSelectedProd;

      if (item && !itemsAdded[item]) {

        $itemName = $("<span class='item'>" + item + "</span>");

        $rowDiv = $("<div class='shoppingListItem border'>")
          .hide()
          .prependTo($list)
          .append($itemName)
          .append($("<button class='price-button'>" + CURRENCY_SYMBOL + "</button>")
            .on("click", function () {
              goToSelectProduct();
              createProductsList($itemName, $rowDiv);
            }))
          .append($("<button class='remove-button'>x</button>")
            .on("click", function () {
              $rowDiv.fadeOut(300, function () {
                $rowDiv.remove();
                itemsAdded[item] = null;
              });
            }));


        itemsAdded[item] = item;
        $prodId.val("").focus();
        $rowDiv.fadeIn(500);

      }

    };

  $("#add").on("click", addNewItem);
  $("#cancelSelection").on("click", goToShoppingList);

  $prodId
    .val("")
    .focus()
    .keypress(function (event) {
      var keycode = (event.keyCode || event.which);
      if (keycode === 13) {
        addNewItem();
      }
    });

}(jQuery));
