Role('Siesta.ux.Element', {
  methods: {
    isElementShow: function(el, desc) {
      name = el.name || el.id || el.itemId;
      this.isInView(el, desc || 'Element[' + name + '] is visible');
    },

    isElementHidden: function(el, desc) {
      name = el.name || el.id || el.itemId;
      this.ok(el.isHidden(), desc || 'Element[' + name + '] is invisible');
    }
  }
});
