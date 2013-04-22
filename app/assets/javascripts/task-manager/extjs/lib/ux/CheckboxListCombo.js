// Note: add the styles shown in the comment at the end of this code block to your .css
Ext.ns('Ext.ux.form');	// create namespace
Ext.define('Ext.ux.form.CheckboxListCombo', {
  extend: 'Ext.form.field.ComboBox',
  alias: 'widget.checkboxlistcombo',

  /**
   * The following options were added to extend the ComboBox to provide additional functionality.
   * The are now 4 possible display values in the text box of the combo:
   * (1) .emptyText
   * (2) .displayField - if only one item is selected
   * (3) optional .briefDisplayField - if 2 or more items are selected
   * (4) optional {nn} briefSummaryTitle - if more than a certain number of items are selected (and all won't fit)
   * These features are only used if the values below are not falsy
   */
  briefDisplayField: false, 	// store field to use if there are multiple items selected (if not false)
  briefDisplayLimit: false, 	// max # of "briefDisplayField" items to display, after which "## {briefSummaryTitle}" is displayed
  briefSummaryTitle: false, 	// string to display if there are too many selected items for the display box
  displayList: "",			      // will hold the delimited list of all selections (may not be in the combo if too many, but can be used as desired)
  firstItemChecksAll: false, 	// if true then the first item is ignored other than for this purpose (value must be falsy)
  allSelectedTitle: false,	  // if not set, it will be set to the displayValue of the first item

  constructor: function(config) {
    Ext.ux.form.CheckboxListCombo.superclass.constructor.call(this, config);
  },

  initComponent: function () {
    if (this.briefDisplayField) {
      this.briefDisplayTpl = Ext.create('Ext.XTemplate', '<tpl for=".">{[typeof values === "string" ? values : values.' + this.briefDisplayField + ']}<tpl if="xindex < xcount">' + this.delimiter + '</tpl></tpl>');
    }
    Ext.ux.form.CheckboxListCombo.superclass.initComponent.apply(this, arguments);
    this.listConfig.checkboxComboId = this.id; // for firstItem checking (see below)
  },

  getDisplayValue: function () {
    this.displayList = this.displayTplData && this.displayTplData.length 
    ? (this.briefDisplayTpl || this.displayTpl).apply(this.displayTplData)
    : "";
    var ttl = this.allSelected
    ? this.allSelectedTitle || "[" + this.emptyText + "]"
    : (
      (this.briefDisplayLimit && this.briefSummaryTitle && this.displayTplData && this.displayTplData.length > this.briefDisplayLimit) 
      ? (this.displayTplData.length) + " " + this.briefSummaryTitle
      : this.displayList
    );
    return ttl || this.emptyText;
  },

  lastQuery: '', // prevents clearing of the list after initial setValue
  listConfig: {
    getInnerTpl: function (displayField) {
      return '<tpl for="."><div><img src="' + Ext.BLANK_IMAGE_URL + '" ' + 'class="ux-checkboxlistcombo-icon">{' + (displayField || 'text') + ':htmlEncode}</div></tpl>';
    },
    // from here down it's all about the first item checking/unchecking all others
    previousAllChecked: false,
    previousCheckCount: 0,
    listeners: {
      beforeselect: function ( me, node, selections, options ) {
        // since selectionChange does not provide info on which node changed,
        // we need to determine whether the all item was selected...
        var combo = Ext.getCmp(me.view.checkboxComboId);
        me.view.somethingChecked = true;
        me.view.allChecked = combo && combo.firstItemChecksAll && !node.data[combo.valueField];
        return true;
      },
      selectionchange: function (dataViewModel, selections, options) {
        var me = dataViewModel,combo = Ext.getCmp(me.view.checkboxComboId), 
        storeRecs, recs = [], d, i, j, nChecked, vField, dField, allState, allNodes, allItem, 
        grayCls = "ux-checkboxcombolist-tri",
        somethingChecked = me.view.somethingChecked,
        allChecked = me.view.allChecked;
        me.view.somethingChecked = false;
        me.view.allChecked = false; // beforeselect doesn't fire on deselect
        if (combo && combo.firstItemChecksAll) {
          allNodes = me.view.getNodes();
          if (allNodes.length) {
            allItem = Ext.get(allNodes[0]);
            vField = combo.valueField;
            dField = combo.displayField;
            storeRecs = Ext.clone(me.store.getRange(0));
            for (i=nChecked=0;i<storeRecs.length;i++) {
              d = storeRecs[i].data;
              d.checked = false;
              for (j=0;selections && !d.checked && j<selections.length;j++) {
                if (selections[j].data[vField] == d[vField]) {
                  d.checked = true;
                  if (i>0) {
                    nChecked++;
                  } else if (!combo.allSelectedTitle) {
                    combo.allSelectedTitle = d[dField];
                  }
                }
              }
              recs.push(d);
            }
            allState =  ( ( recs[0].checked && allChecked ) || (nChecked == recs.length-1 && somethingChecked)) 
            ? 1 
            : ( 0 < nChecked && nChecked < recs.length-1 ? 2 : 0);

            me.view.suspendEvents();// suspend events, though selectAll & deselectAll send them anyway
            me.suspendEvents();
            switch (allState) {
              case 0:		// None
                //me.deselectAll(true); // Nope, doesn't suspend events
                combo.allSelected = false;
              allItem.removeCls(grayCls);
              setTimeout(function () { me.deselectAll(false); },1); // suspendEvent is ignored, so we hack using a timer
              break;
              case 1:		// All
                //me.selectAll(true); // Nope, doesn't suspend events
                combo.allSelected = true;
              allItem.removeCls(grayCls);
              setTimeout(function () { me.selectAll(false); },1); // suspendEvent is ignored, so we hack using a timer
              break;
              case 2:		// Some (gray out the ALL item)
                allItem.addCls(grayCls);
              combo.allSelected = false;
              me.deselect(0,true); // in this case the suspendEvent flag works
              break;
            }
            me.resumeEvents();// resume events, though selectAll & deselectAll send them anyway
            me.view.resumeEvents();
          }
        }
      }
    }
  }
});
