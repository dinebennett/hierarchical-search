import Ember from 'ember';

export default Ember.Component.extend({

  start: undefined,
  step: undefined,
  margin: undefined,
  limit: undefined,
  connect: false,
  orientation: "horizontal",
  direction: "ltr",
  behaviour: "tap",
  animate: true,

  min: 0,
  max: 100,
  range: Ember.computed("min", "max", function () {
    console.log("getting range " + this.get('min') + " " + this.get('max'));
    return {
      min: this.get('min'),
      max: this.get('max')
    };
  }),

  didInsertElement: function () {
    console.log("didInsertElement");
    this.slider = this.$().noUiSlider({
      start: this.get('start'),
      step: this.get('step'),
      margin: this.get('margin'),
      limit: this.get('limit'),
      range: this.get('range'),
      connect: this.get('connect'),
      orientation: this.get('orientation'),
      direction: this.get('direction'),
      behaviour: this.get('behaviour'),
      animate: this.get('animate')
    });

    var _this = this,
      elem = this.$();

    elem.on("change", function () {
      Ember.run(function () {
        _this.sendAction('change', _this.slider.val());
      });
    });

    if (!Ember.isEmpty(this.get('slide'))) {
      elem.on("slide", function () {
        Ember.run(function () {
          _this.sendAction('slide', _this.slider.val());
        });
      });
    }
  },

  willDestroyElement: function () {
    this.slider[0].destroy();
  },

  setVal: Ember.observer('start', function () {
    if (this.slider) {
      var val = this.get('start');
      this.slider.val(val);
    }
  }),

  setRange: Ember.observer('range', function () {
    var that = this;
    //console.log("rebuilding " + that.get('range').min + " " + that.get('range').max);
    //console.log("rebuilding " + that.get('start')[0] + " " + that.get('start')[1]);
    this.slider = this.$().noUiSlider({
      start: that.get('start'),
      step: that.get('step'),
      margin: that.get('margin'),
      limit: that.get('limit'),
      connect: that.get('connect'),
      orientation: that.get('orientation'),
      direction: that.get('direction'),
      behaviour: that.get('behaviour'),
      animate: that.get('animate'),
      range: {
        min: that.get('range').min,
        max: that.get('range').max
      }
    }, true);
  })

});
