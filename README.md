# ember-cli-fast-table
Speed up table re-rendering by wrapping up array elements into objects to prevent Ember from tearing down and re-creating existing views.

The new Glimmer rendering engine on Ember 1.13 fixes this performance killer. If you are not on 1.13 yet, I strongly recommend you to upgrade, but if you are somewhat stuck on Ember 1.12, this addon can be your friend.

## Usage:
Let's say that you have the following computed property and template for a large table:
```Javascript
import Ember from 'ember';
export default Ember.Component.extend({
  tableData: function(){
    var ret;
    // some computation here...
    return ret;
  }.property('someChangingAttr')
});
```

```
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

You can rewrite your computed property and template with fast-table:
```Javascript
import Ember from 'ember';
import FastTable from '../../utils/fast-table';
export default Ember.Component.extend({
  init: function(){
    this._super();
    this._tableData = FastTable.create();
  },
  tableData: function(){
    var tabelData = this.get('_tableData');
    return tableData;
  }.property('someChangingAttr')
});
```

```
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

