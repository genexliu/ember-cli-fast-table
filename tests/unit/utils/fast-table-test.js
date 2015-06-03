import fastTable from '../../../utils/fast-table';
import { module, test } from 'qunit';

module('fastTable');

test('it works', function(assert) {
  var result = fastTable.create();
  assert.ok(result);
});

test('it replaces', function(assert) {
  var table = fastTable.create();
  var elem1, elem2;

  table.replace(0, 0, [[1]]);
  assert.deepEqual(table.toArray(), [[1]]);
  assert.deepEqual(table.objectAt(0).toArray(), [1]);
  assert.equal(table.length, 1);
  table.replace(1, 0, [[2]]);
  assert.deepEqual(table.toArray(), [[1], [2]]);
  assert.equal(table.length, 2);

  table.replace(100, 0, 3);
  assert.deepEqual(table.toArray(), [[1], [2], [3]]);
  assert.equal(table.length, 3);
  assert.deepEqual(table.objectAt(0).toArray(), [1]);
  assert.deepEqual(table.objectAt(1).toArray(), [2]);
  assert.deepEqual(table.objectAt(2).toArray(), [3]);

  table.replace(1, 2, [[4], [5]]);
  assert.deepEqual(table.toArray(), [[1], [4], [5]]);
  assert.equal(table.length, 3);
  assert.deepEqual(table.objectAt(1).toArray(), [4]);

  elem1 = table.getEmberArray().objectAt(1);
  elem2 = table.getEmberArray().objectAt(2);
  table.replace(1, 1, [16, 17]);
  assert.deepEqual(table.toArray(), [[1], [16], [17], [5]]);
  assert.ok(elem1 === table.getEmberArray().objectAt(1), 'Wrapper of replaced element does not change');
  assert.ok(elem2 === table.getEmberArray().objectAt(2), 'Wrapper of inserted element does not change');
});

test('insertAt works', function(assert) {
  var table = fastTable.create();
  table.insertAt(0, [1]);
  assert.deepEqual(table.toArray(), [[1]]);
  table.insertAt(1, [{'xd': 'xd'}]);
  assert.deepEqual(table.toArray(), [[1], [{'xd': 'xd'}]]);
  table.insertAt(1, [2]);
  assert.deepEqual(table.toArray(), [[1], [2], [{'xd': 'xd'}]]);
});

