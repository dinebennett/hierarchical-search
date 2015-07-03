import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {

    //TODO: This could be fetched from an API eventually.

    var items = [
      {id: 1, name: "Ingredients"}, //Level 1
      {id: 2, name: "Decorations"},
      {id: 3, name: "Bakeware"},
      {id: 4, name: "Tools"},

      {id: 5, name: "Dry Ingredients", parent: 1}, //Level 2, Parent: Ingredients
      {id: 6, name: "Dairy", parent: 1},
      {id: 7, name: "Sugars", parent: 1},
      {id: 8, name: "Colours and Flavours", parent: 1},

      {id: 9, name: "Sprinkles and Confetti", parent: 2}, //Level 2,  Parent: Decorations
      {id: 10, name: "Non-Edible Toppers", parent: 2},
      {id: 11, name: "Nuts and Candy", parent: 2},
      {id: 12, name: "Wrappers", parent: 2},

      {id: 13, name: "Mixing Bowls", parent: 3}, //Level 2, Parent: Bakeware
      {id: 14, name: "Baking Tins", parent: 3},
      {id: 15, name: "Sheets and Racks", parent: 3},
      {id: 16, name: "Baking Sets", parent: 3},

      {id: 17, name: "Preparation Tools", parent: 4}, //Level 2, Parent: Tools
      {id: 18, name: "Decorating Tools", parent: 4},
      {id: 19, name: "Mixers", parent: 4},
      {id: 20, name: "Other Pastry Tools", parent: 4},

      {id: 21, name: "Flour", parent: 5, price: 35, brand: "Snowflake"}, //Level 3, Parent: Dry Ingredients
      {id: 22, name: "Baking Powder", parent: 5, price: 30, brand: "Snowflake"},
      {id: 23, name: "Baking Soda", parent: 5, price: 25, brand: "Royal"},
      {id: 24, name: "Cocoa", parent: 5, price: 50, brand: "Nestle"},

      {id: 25, name: "Eggs", parent: 6, price: 40, brand: "Nulaid"}, //Level 3, Parent: Dairy
      {id: 26, name: "Full Cream Milk", parent: 6, price: 12, brand: "Clover"},
      {id: 27, name: "Low Fat Milk", parent: 6, price: 12, brand: "Clover"},
      {id: 28, name: "Butter", parent: 6, price: 50, brand: "Clover"},

      {id: 29, name: "White Sugar", parent: 7, price: 35, brand: "Hullets"}, //Level 3, Parent: Sugars
      {id: 30, name: "Brown Sugar", parent: 7, price: 35, brand: "Hullets"},
      {id: 31, name: "Castor Sugar", parent: 7, price: 40, brand: "Hullets"},
      {id: 32, name: "Icing Sugar", parent: 7, price: 50, brand: "Hullets"},

      {id: 33, name: "Pink Food Colouring", parent: 8, price: 50, brand: "Cake Flora"}, //Level 3, Parent: Colours and Flavours
      {id: 34, name: "Blue Food Colouring", parent: 8, price: 50, brand: "Cake Flora"},
      {id: 35, name: "Vanilla Extract", parent: 8, price: 100, brand: "Nielsen Massey"},
      {id: 36, name: "Rose Water", parent: 8, price: 80, brand: "Nielsen Massey"},

      {id: 37, name: "Rainbow Vermicelli", parent: 9, price: 45, brand: "Nicoletta"}, //Level 3, Parent: "Sprinkles and Confetti"
      {id: 38, name: "Silver Vermicelli", parent: 9, price: 55, brand: "Nicoletta"},
      {id: 39, name: "Pink/Red/White Hearts", parent: 9, price: 50, brand: "Nicoletta"},
      {id: 40, name: "Rainbow Stars", parent: 9, price: 50, brand: "Nicoletta"}

    ];
    return items;
  },
  setupController: function (controller, model) {
    var minMaxPrices = getMinMaxPrices(model);
    controller.set('displayedMinPrice', minMaxPrices[0]);
    controller.set('displayedMaxPrice', minMaxPrices[1]);
    controller.set('levelOneSelection', model[0]);
    controller.set('model', model);
  }
});

function getMinMaxPrices(items) {
  var itemsWithPrices = items.filter(function (item) {
    return ('price' in item);
  });
  if (itemsWithPrices.length < 1) {
    return [0, 2000];
  }
  var min = itemsWithPrices.sort(function (a, b) {
    if (a.price === b.price) {
      return 0;
    } else {
      return (a.price > b.price ? 1 : -1);
    }
  })[0].price;
  var max = itemsWithPrices.sort(function (a, b) {
    if (a.price === b.price) {
      return 0;
    } else {
      return (a.price < b.price ? 1 : -1);
    }
  })[0].price;
  return [min, max];
}
