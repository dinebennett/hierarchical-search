import Ember from 'ember';

export default Ember.Controller.extend({

  levelOneDisplayed: false,

  levelOneSelection: null,

  levelTwoDisplayed: false,

  levelTwoSelection: [],

  brandsDisplayed: false,

  brandsSelection: [],

  displayProducts: false,

  displayWelcome: function() {

    if (this.get('displayProducts')) {
      return false;
    } else if ((this.get('levelOneDisplayed'))) {
      return false
    } else if ((this.get('levelTwoDisplayed'))) {
      return false
    } else if ((this.get('brandsDisplayed'))) {
      return false
    }

    return true;

  }.property('displayProducts','levelOneDisplayed','levelTwoDisplayed', 'brandsDisplayed'),

  enableSubCategories: function () {
    return (Ember.isBlank(this.get('levelOneSelection')) ? true : false);
  }.property('levelOneSelection'),

  noProductsFound: function() {
    return (this.get('availableItems').length > 0 ? false : true);
  }.property('availableItems'),

  levelOneChevron: function () {
    return (this.get('levelOneDisplayed') ? "glyphicon glyphicon-chevron-right" : "glyphicon glyphicon-chevron-down");
  }.property('levelOneDisplayed'),

  levelTwoChevron: function () {
    return (this.get('levelTwoDisplayed') ? "glyphicon glyphicon-chevron-right" : "glyphicon glyphicon-chevron-down");
  }.property('levelTwoDisplayed'),

  brandsChevron: function () {
    return (this.get('brandsDisplayed') ? "glyphicon glyphicon-chevron-right" : "glyphicon glyphicon-chevron-down");
  }.property('brandsDisplayed'),

  actualMinMaxPrice: function () {
    return getMinMaxPrice(this.get('availableItemsNoBrandsOrPriceLimits'));
  }.property('availableItemsNoBrandsOrPriceLimits'),

  priceRange: function () {
    var range = {
      'min': [this.get('actualMinMaxPrice')[0]],
      'max': [this.get('actualMinMaxPrice')[1]]
    };
    return range;
  }.property('actualMinMaxPrice'),

  levelOneItems: function () {
    var allLevelOneItems = this.get('model').filter(function (item) {
      return !('parent' in item);
    });
    if (Ember.isBlank(this.get('levelOneSelection'))) {
      return allLevelOneItems;
    } else {
      return markSelectedItemsInArray(allLevelOneItems, [this.get('levelOneSelection')]);
    }
  }.property('levelOneSelection'),

  allLevelTwoItems: function () {
    var that = this;
    var allLevelTwoItems = this.get('model').filter(function (item) {
      var check = false;

      that.get('levelOneItems').forEach(function(levelOneItem) {
        if (('parent' in item) && (item.parent === levelOneItem.id)) {
          check = true;
        }
      });
      return check;
    });
    return markSelectedItemsInArray(allLevelTwoItems, this.get('levelTwoSelection'));
  }.property('model'),

  levelTwoItems: function () {
    var that = this;
    if (Ember.isBlank(this.get('levelOneSelection'))) {
      return this.get('allLevelTwoItems');
    }
    var allLevelTwoItems = this.get('model').filter(function (item) {
      if ('parent' in item) {
        return (item.parent === that.get('levelOneSelection.id'));
      } else {
        return false;
      }
    });
    return markSelectedItemsInArray(allLevelTwoItems, this.get('levelTwoSelection'));
  }.property('levelOneSelection', 'levelTwoSelection'),

  availableItems: function () {
      var items = getAvailableItems(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('model'), this.get('brandsSelection'),
        this.get('displayedMinPrice'), this.get('displayedMaxPrice'));
    return sortItemsByPrice(items);
  }.property('levelOneSelection', 'levelTwoSelection', 'brandsSelection', 'displayedMinPrice', 'displayedMaxPrice'),

  availableItemsNoBrandsOrPriceLimits: function () {
    return getAvailableItems(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('model'), []);
  }.property('levelOneSelection', 'levelTwoSelection'),

  availableBrands: function () {
    var brands = [];
    this.get('availableItemsNoBrandsOrPriceLimits').forEach(function (item) {
      if (('brand' in item) && !(isBrandInList(item.brand, brands))) {
        brands.push({name: item.brand});
      }
    });
    return markSelectedBrandsInArray(brands, this.get('brandsSelection'));
  }.property('availableItemsNoBrandsOrPriceLimits', 'brandsSelection'),

  levelOneSelectionString: function () {
    if (this.get('levelOneSelection') === null) {
      return "Choose Your Product";
    } else {
      return this.get('levelOneSelection').name;
    }
  }.property('levelTwoSelection','levelOneSelection'),

  levelTwoSelectionString: function () {
    if (this.get('levelTwoSelection').length > 1) {
      return "Multiple Selections...";
    } else if (this.get('levelTwoSelection').length === 1) {
      return (this.get('levelTwoSelection'))[0].name;
    } else if (this.get('levelOneSelection') !== null) {
      return "All " + this.get('levelOneSelection.name');
    } else {
      return "All";
    }
  }.property('levelTwoSelection','levelOneSelection'),

  brandSelectionString: function () {
    if (this.get('brandsSelection').length > 1) {
      return "Multiple Brands...";
    } else if (this.get('brandsSelection').length === 1) {
      return (this.get('brandsSelection'))[0].name;
    }
    return "All Brands";
  }.property('brandsSelection'),

  actions: {
    levelOneClicked: function () {
      this.set('levelTwoDisplayed', false);
      this.set('brandsDisplayed', false);
      this.set('levelOneDisplayed', !this.get('levelOneDisplayed'));
    },
    levelTwoClicked: function () {
      this.set('levelOneDisplayed', false);
      this.set('brandsDisplayed', false);
      this.set('levelTwoDisplayed', !this.get('levelTwoDisplayed'));
    },
    brandsClicked: function () {
      this.set('levelOneDisplayed', false);
      this.set('levelTwoDisplayed', false);
      this.set('brandsDisplayed', !this.get('brandsDisplayed'));
    },
    resetAll: function() {
      var selectedItem = this.get('model')[0];
      this.set('displayProducts', false);
      this.set('levelOneDisplayed', false);
      this.set('levelTwoDisplayed', false);
      this.set('brandsDisplayed', false);
      this.set('levelOneSelection', null);
      this.set('levelTwoSelection', []);
      this.set('brandsSelection', []);
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice', this.get('actualMinMaxPrice')[1]);
    },
    levelOneSelectionClicked: function (selectionId) {
      var selectedItem = this.get('model').filter(function (item) {
        return (item.id === selectionId);
      })[0];
      this.set('levelOneSelection', selectedItem);
      this.set('levelTwoSelection', []);
      this.set('brandsSelection', []);
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice', this.get('actualMinMaxPrice')[1]);
    },
    levelTwoSelectionClicked: function (selectionId) {
      var selectedItem = this.get('model').filter(function (item) {
        return (item.id === selectionId);
      })[0];
      this.set('brandsSelection', []);
      this.set('levelTwoSelection', toggleSelectionInList(selectedItem, Ember.copy(this.get('levelTwoSelection'))));
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice', this.get('actualMinMaxPrice')[1]);
    },
    brandSelectionClicked: function (brand) {
      this.set('brandsSelection', toggleBrandInList(brand, Ember.copy(this.get('brandsSelection'))));
    },
    viewProductsClicked: function () {
      this.set('levelOneDisplayed', false);
      this.set('levelTwoDisplayed', false);
      this.set('brandsDisplayed', false);
      this.set('displayProducts', true);
    },
    sliderChanged: function (value) {
      this.set('displayedMinPrice', Math.floor(value[0]));
      this.set('displayedMaxPrice', Math.floor(value[1]));
    },
    sliderSliding: function (value) {
      this.set('displayedMinPrice', Math.floor(value[0]));
      this.set('displayedMaxPrice', Math.floor(value[1]));
    }
  }
});

/**
 * Gets the list of available items according to criteria given.
 * In the interest of Functional Programming, there are no side effects.
 * @param levelTwoSelection The user's selection of level two items.
 * @param levelTwoItems All level two items.
 * @param items All items.
 * @param userMinPrice The user selected minimum price.
 * @param userMaxPrice The user selected maximum price.
 * @returns {*} All available items.
 */
function getAvailableItems(levelTwoSelection, levelTwoItems, items, brandsToInclude, userMinPrice, userMaxPrice) {
  var levelTwoCategoriesToInclude = [];
  if (levelTwoSelection.length > 0) {
    levelTwoCategoriesToInclude = levelTwoSelection;
  } else {
    levelTwoCategoriesToInclude = levelTwoItems;
  }
  return items.filter(function (item) {
    var check = false;
    levelTwoCategoriesToInclude.forEach(function (levelTwoItem) {
      if (Ember.isBlank(userMinPrice) || Ember.isBlank(userMinPrice) && ('parent' in item)) {
        if ((item.parent === levelTwoItem.id)) {
          check = true;
        }
      } else if ('parent' in item) {
        if ((item.parent === levelTwoItem.id) && (item.price >= userMinPrice) && (item.price <= userMaxPrice)) {
          check = true;
        }
      }
    });

    if ((brandsToInclude.length > 0) && !isBrandInList(item.brand, brandsToInclude)) {
      check = false;
    }

    return (check === true);
  });
}

/**
 * Get the min and max price of all items in the list.
 * In the interest of Functional Programming, there are no side effects.
 *
 * @param items An array of items.
 * @returns {*} An array of format [min, max].
 */
function getMinMaxPrice(items) {
  if (items.length < 1) {
    return [0, 2000];
  }
  var min = items.sort(function (a, b) {
    if (a.price === b.price) {
      return 0;
    } else {
      return (a.price > b.price ? 1 : -1);
    }
  })[0].price;
  var max = items.sort(function (a, b) {
    if (a.price === b.price) {
      return 0;
    } else {
      return (a.price < b.price ? 1 : -1);
    }
  })[0].price;
  return [min, max];
}

function sortItemsByPrice(items) {
  return items.sort(function (a, b) {
    if (a.price === b.price) {
      return 0;
    } else {
      return (a.price > b.price ? 1 : -1);
    }
  });
}

/**
 * If the item is in the list, it will be removed. If it is not in the list, it will be added.
 * In the interest of Functional Programming, there are no side effects.
 *
 * @param newItem Item to be added or removed.
 * @param list  List of items.
 * @returns {*} The modified list.
 */
function toggleSelectionInList(newItem, list) {
  var idx = -1;
  list.forEach(function (item, index) {
    if (item.id === newItem.id) {
      idx = index;
    }
  });
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(newItem);
  }
  return list;
}

/**
 * Adds selected = true to all the selected items.
 * In the interest of Functional Programming, there are no side effects.
 *
 * @param array
 * @param selectedItems
 * @returns {*}
 */
function markSelectedItemsInArray(array, selectedItems) {
  if (selectedItems === null) {
    return array;
  }
  return array.map(function (item) {
    var emberItem = Ember.Object.create(item);
    selectedItems.forEach(function (selectedItem) {
      if (item.id === selectedItem.id) {
        emberItem.selected = true;
      }
    });
    return emberItem;
  });
}

/**
 * Toggles brand in list. If the brand is already in the list, it will be removed. Otherwise, it will be added.
 *
 * @param brand Name of the brand to toggle
 * @param brandList List of brands
 * @returns {*} The resulting list of brands
 */
function toggleBrandInList(brand, brandList) {
  var idx = -1;
  brandList.forEach(function (brandListItem, index) {
    if (brandListItem.name === brand) {
      idx = index;
    }
  });
  if (idx > -1) {
    brandList.splice(idx, 1);
  } else {
    brandList.push({name: brand});
  }
  return brandList;
}

/**
 * Checks whether a brand name exists in the list.
 * @param brand
 * @param brandList
 * @returns {boolean} True if it does exist, false if it doesn't.
 */
function isBrandInList(brand, brandList) {
  var isInList = false;
  brandList.forEach(function (brandListItem) {
    if (brandListItem.name === brand) {
      isInList = true;
    }
  });
  return isInList;
}

/**
 * Takes the list of brands and sets selected = true where brands have been selected.
 *
 * @param allBrands
 * @param selectedBrands
 * @returns {*}
 */
function markSelectedBrandsInArray(allBrands, selectedBrands) {
  return allBrands.map(function (brand) {
    var brandObject = Ember.Object.create(brand);
    selectedBrands.forEach(function (selectedBrand) {
      if (brand.name === selectedBrand.name) {
        brandObject.selected = true;
      }
    });
    return brandObject;
  });
}
