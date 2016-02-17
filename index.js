var _ = require('lodash');

var FormFiller = {
  checkItems: function(elementIds) {
    elementIds.forEach(function(id, index) {
      var el = document.getElementsById(id);
      el.checked = true;
    });
  },
  
  selectOption: function(selectTagIds, indexToSelect) {
    selectTagIds.forEach(function(id, index) {
      var el = document.getElementById(id);
      el[indexToSelect].selected = true;
    });
  },
  
  fill: function(map) {
    if (_.isArray(map.check)) {
      this.checkItems(map.check);
    };
    
    if (!_.isEmpty(map.select)) {
      if (_.isArray(map.select.items)) {
        this.selectOption(map.select.items, map.select.index || 0);
      }
    };
  },
  
  init: function(map, className) {
    var self = this;
    var el = className || 'form-filler';
    var button = document.getElementsByClassName(el);

    button.addEventListener('click', function() {
      self.fill(map);
    });    
  }
};

module.exports = FormFiller;