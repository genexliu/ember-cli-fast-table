import Ember from 'ember';

// placeholder object key
var DUMMY = 'data';

export default Ember.Object.extend(Ember.MutableArray, {
  elemCtor: Ember.Object,

  init() {
    this._super(...arguments);
    this._array = Ember.A([]);
    this.length = 0;
  },

  getEmberArray() {
    return this.get('_array');
  },

  rawDataAt(idx) {
    return Ember.get(this.getEmberArray().objectAt(idx), DUMMY);
  },

  swapAt(idx, elem) {
    Ember.set(this.getEmberArray().objectAt(idx), DUMMY, elem);
  },

  toArray() {
    return this.getEmberArray().map(function(elem) {
      return elem.get(DUMMY);
    });
  },

  objectAt(idx) {
    return this.getEmberArray().objectAt(idx);
  },

  replace(idx, amt, objects) {
    var args = [].concat(objects);
    if (amt <= 0 && args.length === 0) {
      return;
    }

    var _array = this.getEmberArray();
    var length = this.get('length');

    var start = (idx >= 0 ? idx : length + idx);
    start = (start >= length ? length : start);
    start = (start < 0 ? 0 : start);

    amt = (amt >= 0 ? amt : 0);
    var end = (start + amt > length ? length : start + amt);

    var new_len = length - (end - start) + args.length;
    var i, delta;
    if (new_len === length) {
      for (i = 0; i < args.length; ++i) {
        this.swapAt(i + start, args[i]);
      }
    } else if (new_len > length) {
      // pad _array, and then work backwards from new_len
      delta = new_len - length;
      for (i = 0; i < delta; ++i) {
        _array.pushObject(this.elemCtor.create());
      }
      for (i = length - 1; i >= end; --i) {
        this.swapAt(i + delta, this.rawDataAt(i));
      }
      for (i = 0; i < args.length; ++i) {
        this.swapAt(i + start, args[i]);
      }
    } else {
      // work forwards from start, and then truncate _array
      delta = length - new_len;
      for (i = 0; i < args.length; ++i) {
        this.swapAt(i + start, args[i]);
      }
      for (i = end; i < length; ++i) {
        this.swapAt(i - delta, this.rawDataAt(i));
      }
      _array.replace(new_len, delta);
    }

    this.length = new_len;

    // calling enumerableContentDidChange() is required by doc
    this.enumerableContentDidChange();
  }
});