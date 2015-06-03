import ElemWrappedArray from './fast-array';

export default ElemWrappedArray.extend({
  elemCtor: ElemWrappedArray,

  rawDataAt(idx) {
    return this.getEmberArray().objectAt(idx).toArray();
  },

  swapAt(idx, elem) {
    var arr = this.getEmberArray().objectAt(idx);
    arr.replace(0, arr.length, elem);
  },

  toArray() {
    return this.getEmberArray().map(function(arr) {
      return arr.toArray();
    });
  }
});
