import Ember from 'ember';

export default Ember.Controller.extend({
  levelOneDisplayed: false,
  //levelOneSelection - set in router
  levelTwoDisplayed: false,
  levelTwoSelection: [],
  productsToDisplay: null,
  actualMinMaxPrice: function () {
    return getMinMaxPrice(this.get('availableItemsNoPriceLimits'));
  }.property('availableItemsNoPriceLimits'),
  priceRange: function () {
    var range = {
      'min': [this.get('actualMinMaxPrice')[0]],
      'max': [this.get('actualMinMaxPrice')[1]]
    };
    return range;
  }.property('actualMinMaxPrice'),
  levelOneItems: function () {
    //TODO: Mark which one is selected
    var modelItems = this.get('model');
    return modelItems.filter(function (item) {
      return !('parent' in item);
    });
  }.property(''),
  levelTwoItems: function () {
    //TODO: Mark which ones are selected
    var that = this;
    return this.get('model').filter(function (item) {
      if ('parent' in item) {
        return (item.parent === that.get('levelOneSelection.id'));
      } else {
        return false;
      }
    });
  }.property('levelOneSelection'),
  levelTwoSelectionString: function() {
    if (this.get('levelTwoSelection').length > 1) {
      return "Multiple...";
    } else if (this.get('levelTwoSelection').length === 1) {
      return (this.get('levelTwoSelection'))[0].name;
    }
    return "All";
  }.property('levelTwoSelection'),
  availableItems: function () {
    return getAvailableItems(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('model'), this.get('displayedMinPrice'), this.get('displayedMaxPrice'));
  }.property('levelOneSelection', 'levelTwoSelection', 'displayedMinPrice', 'displayedMaxPrice'),
  availableItemsNoPriceLimits: function () {
    return getAvailableItems(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('model'));
  }.property('levelOneSelection', 'levelTwoSelection'),
  noItemsFound: function () {
    if (this.get('productsToDisplay') === null) {
      return false;
    } else {
      return (this.get('productsToDisplay').length === 0);
    }
  }.property('productsToDisplay'),
  actions: {
    levelOneClicked: function () {
      this.set('levelTwoDisplayed', false);
      this.set('levelOneDisplayed', !this.get('levelOneDisplayed'));
    },
    levelTwoClicked: function () {
      this.set('levelOneDisplayed', false);
      this.set('levelTwoDisplayed', !this.get('levelTwoDisplayed'));
    },
    levelOneSelectionClicked: function (selectionId) {
      var selectedItem = this.get('model').filter(function (item) {
        return (item.id === selectionId);
      })[0];
      this.set('levelOneSelection', selectedItem);
      this.set('levelTwoSelection', []);
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice', this.get('actualMinMaxPrice')[1]);
    },
    levelTwoSelectionClicked: function (selectionId) {
      var selectedItem = this.get('model').filter(function (item) {
        return (item.id === selectionId);
      })[0];
      this.set('levelTwoSelection', toggleSelectionInList(selectedItem, Ember.copy(this.get('levelTwoSelection'))));
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice', this.get('actualMinMaxPrice')[1]);
    },
    viewProductsClicked: function () {
      this.set('productsToDisplay', this.get('availableItems'));
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
function getAvailableItems(levelTwoSelection, levelTwoItems, items, userMinPrice, userMaxPrice) {
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
    return (check === true);
  });
}

/**
 * Get the min and max price of all items in the list.
 * In the interest of Functional Programming, there are no side effects.
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

/**
 * If the item is in the list, it will be removed. If it is not in the list, it will be added.
 * In the interest of Functional Programming, there are no side effects.
 * @param newItem Item to be added or removed.
 * @param list  List of items.
 * @returns {*} The modified list.
 */
function toggleSelectionInList(newItem,list) {
  var idx = -1;
  list.forEach(function(item, index) {
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
