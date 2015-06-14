import FastArray from './fast-array';

export default FastArray.extend({
  elemCtor: FastArray,

  rawDataAt(idx) {
    return this.getEmberArray().objectAt(idx).toArray();
  },

  swapAt(idx, elem) {
    var arr = this.getEmberArray().objectAt(idx);
    arr.replace(0, arr.get('length'), elem);
  },

  toArray() {
    return this.getEmberArray().map(function(arr) {
      return arr.toArray();
    });
  }
});
