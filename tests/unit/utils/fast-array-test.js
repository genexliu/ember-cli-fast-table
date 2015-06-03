import fastArray from '../../../utils/fast-array';
import { module, test } from 'qunit';

module('fastArray');

test('it works', function(assert) {
  var result = fastArray.create();
  assert.ok(result);
});

test('it replaces', function(assert) {
  var arr = fastArray.create();
  var elem1, elem2;

  arr.replace(0, 0, 1);
  assert.deepEqual(arr.toArray(), [1]);
  assert.equal(arr.length, 1);
  arr.replace(1, 0, 2);
  assert.deepEqual(arr.toArray(), [1, 2]);
  assert.equal(arr.length, 2);

  arr.replace(100, 0, 3);
  assert.deepEqual(arr.toArray(), [1, 2, 3]);
  assert.equal(arr.length, 3);
  assert.equal(arr.rawDataAt(0), 1);
  assert.equal(arr.rawDataAt(1), 2);
  assert.equal(arr.rawDataAt(2), 3);

  arr.replace(1, 2, [4, 5]);
  assert.deepEqual(arr.toArray(), [1, 4, 5]);
  assert.equal(arr.length, 3);
  assert.equal(arr.rawDataAt(1), 4);

  arr.replace(1, 1, [6, 7]);
  assert.deepEqual(arr.toArray(), [1, 6, 7, 5]);
  assert.equal(arr.length, 4);
  assert.equal(arr.rawDataAt(1), 6);
  assert.equal(arr.rawDataAt(3), 5);

  arr.replace(10, 1, [8, 9]);
  assert.deepEqual(arr.toArray(), [1, 6, 7, 5, 8, 9]);
  assert.equal(arr.length, 6);
  assert.equal(arr.rawDataAt(1), 6);
  assert.equal(arr.rawDataAt(4), 8);

  arr.replace(-1, 1, [10, 11]);
  assert.deepEqual(arr.toArray(), [1, 6, 7, 5, 8, 10, 11]);
  assert.equal(arr.length, 7);

  arr.replace(-10, 5, [12, 13]);
  assert.deepEqual(arr.toArray(), [12, 13, 10, 11]);
  assert.equal(arr.length, 4);

  arr.replace(1, 100, [14, 15]);
  assert.deepEqual(arr.toArray(), [12, 14, 15]);
  assert.equal(arr.length, 3);

  elem1 = arr.getEmberArray().objectAt(1);
  elem2 = arr.getEmberArray().objectAt(2);
  arr.replace(1, 1, [16, 17]);
  assert.deepEqual(arr.toArray(), [12, 16, 17, 15]);
  assert.ok(elem1 === arr.getEmberArray().objectAt(1), 'Wrapper of replaced element does not change');
  assert.ok(elem2 === arr.getEmberArray().objectAt(2), 'Wrapper of inserted element does not change');
});

test('insertAt works', function(assert) {
  var arr = fastArray.create();
  arr.insertAt(0, 1);
  assert.deepEqual(arr.toArray(), [1]);
  arr.insertAt(1, {'xd': 'xd'});
  assert.deepEqual(arr.toArray(), [1, {'xd': 'xd'}]);
  arr.insertAt(1, 2);
  assert.deepEqual(arr.toArray(), [1, 2, {'xd': 'xd'}]);
});
