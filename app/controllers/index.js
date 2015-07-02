import Ember from 'ember';

export default Ember.Controller.extend({
  levelOneDisplayed: false,
  //levelOneSelection - set in router
  levelTwoDisplayed: false,
  levelTwoSelection: null,
  productsToDisplay: null,
  priceRange: function () {
    var range = {
      'min': [this.get('actualMinMaxPrice')[0]],
      'max': [this.get('actualMinMaxPrice')[1]]
    };
    return range;
  }.property('actualMinMaxPrice'),
  actualMinMaxPrice: function () {
    return getMinMaxPrice(this.get('availableItemsNoPriceLimits'));
  }.property('availableItemsNoPriceLimits'),
  noItemsFound: function () {
    if (this.get('productsToDisplay') === null) {
      return false;
    } else {
      return (this.get('productsToDisplay').length === 0);
    }
  }.property('productsToDisplay'),
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
  availableItems: function () {
    return getAvailableItems(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('model'), this.get('displayedMinPrice'), this.get('displayedMaxPrice'));
  }.property('levelOneSelection', 'levelTwoSelection', 'displayedMinPrice', 'displayedMaxPrice'),
  availableItemsNoPriceLimits: function () {
    return getAvailableItems(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('model'));
  }.property('levelOneSelection', 'levelTwoSelection'),
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
      this.set('levelTwoSelection', null);
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice', this.get('actualMinMaxPrice')[1]);
    },
    levelTwoSelectionClicked: function (selectionId) {
      var selectedItem = this.get('model').filter(function (item) {
        return (item.id === selectionId);
      })[0];
      this.set('levelTwoSelection', selectedItem);
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

// In the interest of Functionl Programming, these method has no side effects ;)
function getAvailableItems(levelTwoSelection, levelTwoItems, items, userMinPrice, userMaxPrice) {
  var levelTwoCategoriesToInclude = [];
  if (levelTwoSelection !== null) {
    levelTwoCategoriesToInclude.push(levelTwoSelection);
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
