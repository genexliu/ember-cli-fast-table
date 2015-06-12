# ember-cli-fast-table
Speed up table re-rendering by wrapping up array elements into objects to prevent Ember from tearing down and re-creating existing views.

The new Glimmer rendering engine on Ember 1.13 fixes this performance killer. If you are not on 1.13 yet, I strongly recommend you to upgrade, but if you are somewhat stuck on Ember 1.12, this addon can be your friend.

## Usage
Let's say that you have the following template and computed property for a large table tableData that changes when someChangingAttr gets updated:
```html
<table>
  {{#each row in tableData}}
  <tr>
    {{#each cell in row}}
    <td>{{cell}}</td>
    {{/each}}
  </tr>
  {{/each}}
</table>
```

```Javascript
import Ember from 'ember';

export default Ember.Component.extend({

  tableData: function(){
    var tableData = [],
        i = 0,
        num_rows = 10,
        new_row = [1,2,3,4,5];
    for (; i < num_rows; ++i) {
      tableData[i] = new_row;
    }
    return tableData;
  }.property('someChangingAttr')

});
```


You can rewrite your template and computed property with fast-table:
```html
<table>
  {{#each row in tableData}}
  <tr>
    {{#each cell in row}}
    <td>{{cell.data}}</td>  {{! use cell.data instead }}
    {{/each}}
  </tr>
  {{/each}}
</table>
```

```Javascript
import Ember from 'ember';
import FastTable from 'ember-cli-fast-table/utils/fast-table';

export default Ember.Component.extend({

  init: function(){
    this._super();
    this._tableData = FastTable.create();
  },

  tableData: function(){
    var tableData = this.get('_tableData'),
        i = 0,
        num_rows = 10,
        new_row = [1,2,3,4,5];
    for (; i < num_rows; ++i) {
      tableData.replace(i, 1, [new_row]);
    }
    return tableData;
  }.property('someChangingAttr')

});
```

## Under the Hood
fast-table and fast-array extend ```Ember.MutableArray``` and implement ```objectAt(idx)``` and ```replace(idx, amt, objects)``` with other KVO-compliant methods that Ember provides (```this.set()```, ```this.get()```, etc). Thus you can use [the interface that ```Ember.MutableArray``` defines](http://emberjs.com/api/classes/Ember.MutableArray.html) on fast-table and fast-array, and all your observers, computed properties and templates get updated.

