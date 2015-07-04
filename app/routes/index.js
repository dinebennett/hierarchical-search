import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {

    //TODO: This could be fetched from an API eventually.

    var items = [
      {id: 1, name: "Ingredients", icon: "img/icon-bakeware.png"}, //Level 1
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
      {id: 20, name: "Deliberately Empty Category", parent: 4},

      {id: 21, name: "Flour", parent: 5, price: 35, brand: "Snowflake", image: "img/products/snowflake-cake-wheat-flour.jpg"}, //Level 3, Parent: Dry Ingredients
      {id: 22, name: "Baking Powder", parent: 5, price: 30, brand: "Snowflake"},
      {id: 23, name: "Baking Soda", parent: 5, price: 25, brand: "Royal"},
      {id: 24, name: "Cocoa", parent: 5, price: 50, brand: "Nestle"},

      {id: 25, name: "Eggs", parent: 6, price: 40, brand: "Nulaid"}, //Level 3, Parent: Dairy
      {id: 26, name: "Full Cream Milk", parent: 6, price: 12, brand: "Clover", image: "img/products/clover-milk.jpg"},
      {id: 27, name: "Low Fat Milk", parent: 6, price: 12, brand: "Clover"},
      {id: 28, name: "Butter", parent: 6, price: 50, brand: "Clover"},

      {id: 29, name: "White Sugar", parent: 7, price: 35, brand: "Hullets", image: "img/products/hullets-white.jpg"}, //Level 3, Parent: Sugars
      {id: 30, name: "Brown Sugar", parent: 7, price: 35, brand: "Hullets"},
      {id: 31, name: "Castor Sugar", parent: 7, price: 40, brand: "Hullets"},
      {id: 32, name: "Icing Sugar", parent: 7, price: 50, brand: "Hullets"},

      {id: 33, name: "Pink Food Colouring", parent: 8, price: 50, brand: "Cake Flora"}, //Level 3, Parent: Colours and Flavours
      {id: 34, name: "Blue Food Colouring", parent: 8, price: 50, brand: "Cake Flora"},
      {id: 35, name: "Vanilla Extract", parent: 8, price: 119, brand: "Nielsen Massey", image: "img/products/vanilla-extract.jpg"},
      {id: 36, name: "Rose Water", parent: 8, price: 80, brand: "Nielsen Massey"},

      {id: 37, name: "Rainbow Vermicelli", parent: 9, price: 45, brand: "Nicoletta"}, //Level 3, Parent: "Sprinkles and Confetti"
      {id: 38, name: "Silver Vermicelli", parent: 9, price: 55, brand: "Nicoletta"},
      {id: 39, name: "Pink/Red/White Hearts", parent: 9, price: 50, brand: "Nicoletta"},
      {id: 40, name: "Angel Drops", parent: 9, price: 39, brand: "Nicoletta", image: "img/products/angel-drops.jpg"},

      {id: 41, name: "Birthday Candles", parent: 10, price: 12, brand: "Party Time"},
      {id: 42, name: "Zoo Animals", parent: 10, price: 40, brand: "Party Time"},
      {id: 43, name: "Superhero Toppers", parent: 10, price: 90, brand: "Ginger Ray", image: "img/products/superhero-toppers.jpg"},
      {id: 44, name: "Paper Hearts", parent: 10, price: 65, brand: "Ginger Ray"},

      {id: 45, name: "Mini Smarties", parent: 11, price: 45, brand: "Nestle", image: "img/products/mini-smarties.jpg"},
      {id: 46, name: "Chocolate Malt Balls", parent: 11, price: 41, brand: "Cadbury"},
      {id: 47, name: "Chopped Nuts", parent: 11, price: 45, brand: "Baking Supplies"},
      {id: 48, name: "Speckled Eggs", parent: 11, price: 20, brand: "Mister Sweet"},

      {id: 49, name: "Brown Wrappers x100", parent: 12, price: 55, brand: "Baking Supplies", image: "img/products/brown-wrappers.jpg"},
      {id: 50, name: "White Wrappers x100", parent: 12, price: 65, brand: "Baking Supplies"},
      {id: 51, name: "Red Polka Dot Wrappers", parent: 12, price: 49, brand: "Sweetly Does It"},
      {id: 52, name: "Polka Dot Wrappers x60", parent: 12, price: 55, brand: "Sweetly Does It"},

      {id: 53, name: "Stoneware Mixing Bowl", parent: 13, price: 460, brand: "Le Creuset", image: "img/products/mixing-bowl.jpg"},
      {id: 54, name: "Traditional Mixing Bowl", parent: 13, price: 299, brand: "Kitchen Craft"},
      {id: 55, name: "Mixing Bowls, Set of 3", parent: 13, price: 449, brand: "Kitchen Aid"},
      {id: 56, name: "Stainless Steel Bowls", parent: 13, price: 269, brand: "Kitchen Craft"},

      {id: 57, name: "12 Hole Cupcake Pan", parent: 14, price: 299, brand: "Master Class", image: "img/products/cupcake-pan.jpg"},
      {id: 58, name: "12 Hole Mini Cupcake Pan", parent: 14, price: 440, brand: "Master Class"},
      {id: 59, name: "Deep Round Cake Pan", parent: 14, price: 210, brand: "Master Class"},
      {id: 60, name: "Square Cake Pan", parent: 14, price: 189, brand: "Master Class"},

      {id: 61, name: "Cookie Sheet", parent: 15, price: 269, brand: "Wilton", image: "img/products/baking-sheet.jpg"},
      {id: 62, name: "Non-Stick Baking Tray", parent: 15, price: 199, brand: "Master Class"},
      {id: 63, name: "Non-Stick Baking Sheet", parent: 15, price: 450, brand: "Le Creuset"},
      {id: 64, name: "Non-Stick Cooling Rack", parent: 15, price: 179, brand: "Master Class"},

      {id: 65, name: "Ultimate Bakeware Set", parent: 16, price: 1419, brand: "Master Class", image: "img/products/bakeware-set.jpg"},
      {id: 66, name: "Blowtorch Ramekin Set", parent: 16, price: 449, brand: "Kitchen Craft"},
      {id: 67, name: "Junior Cake Baking Set", parent: 16, price: 435, brand: "Le Creuset"},
      {id: 68, name: "Macaron Gift Set", parent: 16, price: 629, brand: "Sweetly Does It"},

      {id: 69, name: "Beechwood Spatula", parent: 17, price: 149, brand: "Cake Boss", image: "img/products/spatula.jpg"},
      {id: 70, name: "Fine Mesh Sieves", parent: 17, price: 149, brand: "Master Class"},
      {id: 71, name: "Cake Batter Dispenser", parent: 17, price: 120, brand: "Sweetly Does It"},
      {id: 72, name: "Slim Digital Kitchen Scale", parent: 17, price: 649, brand: "ADE"},

      {id: 73, name: "Icing Nozzle", parent: 18, price: 39, brand: "Sweetly Does It", image: 'img/products/nozzle.jpg'},
      {id: 74, name: "Professional Icing Bag", parent: 18, price: 90, brand: "Master Class"},
      {id: 75, name: "Palette Knife", parent: 18, price: 229, brand: "Wusthof"},
      {id: 76, name: "Decorating Bag Holder", parent: 18, price: 300, brand: "Wilton"},

      {id: 77, name: "Kitchen Aid Mixer", parent: 19, price: 7500, brand: "Kitchen Aid", image: 'img/products/kitchen-aid.jpg' },
      {id: 78, name: "Premier Major Stand Mixer", parent: 19, price: 4800, brand: "Kenwood"},
      {id: 79, name: "Hand Mixer", parent: 19, price: 319, brand: "Kenwood"},
      {id: 80, name: "kMix Hand Mixer", parent: 19, price: 1100, brand: "Kenwood"}

    ];
    return items;
  },
  setupController: function (controller, model) {
    var minMaxPrices = getMinMaxPrices(model);
    controller.set('displayedMinPrice', minMaxPrices[0]);
    controller.set('displayedMaxPrice', minMaxPrices[1]);
    controller.set('levelOneSelection', null);
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
