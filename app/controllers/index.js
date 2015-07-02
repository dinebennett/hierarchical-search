import Ember from 'ember';

export default Ember.Controller.extend({
  levelOneDisplayed: false,
  //levelOneSelection - set in router
  levelTwoDisplayed: false,
  levelTwoSelection: null,
  productsToDisplay: null,
  priceRange: function() {
    var range = {
      'min': [  this.get('actualMinMaxPrice')[0] ],
      'max': [ this.get('actualMinMaxPrice')[1] ]
    };
    return range;
  }.property('actualMinMaxPrice'),
  actualMinMaxPrice: function() {

    if (this.get('availableItemsNoPriceLimits').length < 1) {
      return [0,2000];
    }
    var min = this.get('availableItemsNoPriceLimits').sort(function (a, b) {
      if (a.price === b.price) {
        return 0;
      } else {
        return (a.price > b.price ? 1 : -1);
      }
    })[0].price;

    var max = this.get('availableItemsNoPriceLimits').sort(function (a, b) {
      if (a.price === b.price) {
        return 0;
      } else {
        return (a.price < b.price ? 1 : -1);
      }
    })[0].price;

    return [min,max];

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
    return getAvailableItemsInPriceRange(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('userMinPrice'), this.get('userMaxPrice'), this.get('model'));
  }.property('levelOneSelection', 'levelTwoSelection', 'userMinPrice', 'userMaxPrice'),
  availableItemsNoPriceLimits: function () {
    return getAvailableItemsWithNoPriceLimits(this.get('levelTwoSelection'), this.get('levelTwoItems'), this.get('model'));
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

      this.set('userMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('userMaxPrice', this.get('actualMinMaxPrice')[1]);
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice',  this.get('actualMinMaxPrice')[1]);


    },
    levelTwoSelectionClicked: function (selectionId) {
      var selectedItem = this.get('model').filter(function (item) {
        return (item.id === selectionId);
      })[0];
      this.set('levelTwoSelection', selectedItem);

      this.set('userMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('userMaxPrice', this.get('actualMinMaxPrice')[1]);
      this.set('displayedMinPrice', this.get('actualMinMaxPrice')[0]);
      this.set('displayedMaxPrice',  this.get('actualMinMaxPrice')[1]);

    },
    viewProductsClicked: function () {
      this.set('productsToDisplay', this.get('availableItems'));
    },
    sliderChanged: function (value) {
      debugger;;
      this.set('userMinPrice', Math.floor(value[0]));
      this.set('userMaxPrice', Math.floor(value[1]));
      this.set('displayedMinPrice', Math.floor(value[0]));
      this.set('displayedMaxPrice', Math.floor(value[1]));
    },
    sliderSliding: function (value) {
      debugger;;
      this.set('displayedMinPrice', Math.floor(value[0]));
      this.set('displayedMaxPrice', Math.floor(value[1]));
    }
  }

});

// In the interest of Functionl Programming, these method has no side effects ;)
function getAvailableItemsInPriceRange(levelTwoSelection, levelTwoItems, userMinPrice, userMaxPrice, items) {

  var levelTwoCategoriesToInclude = [];
  if (levelTwoSelection !== null) {
    levelTwoCategoriesToInclude.push(levelTwoSelection);
  } else {
    levelTwoCategoriesToInclude = levelTwoItems;
  }

  return items.filter(function (item) {
    var check = false;
    levelTwoCategoriesToInclude.forEach(function (levelTwoItem) {
      if ('parent' in item) {
        if ((item.parent === levelTwoItem.id) && (item.price >= userMinPrice) && (item.price <=userMaxPrice)) {
          check = true;
        }
      }
    });
    return (check === true);
  });

}

function getAvailableItemsWithNoPriceLimits(levelTwoSelection, levelTwoItems, items) {

  var levelTwoCategoriesToInclude = [];
  if (levelTwoSelection !== null) {
    levelTwoCategoriesToInclude.push(levelTwoSelection);
  } else {
    levelTwoCategoriesToInclude = levelTwoItems;
  }

  return items.filter(function (item) {
    var check = false;
    levelTwoCategoriesToInclude.forEach(function (levelTwoItem) {
      if ('parent' in item) {
        if ((item.parent === levelTwoItem.id) ) {
          check = true;
        }
      }
    });
    return (check === true);
  });

}
