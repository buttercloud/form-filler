var _ = require('lodash');

var FormFiller = {
  _fillInput: function(id, text, isLongText) {
    var lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    var el = document.getElementById(id);
    var value = isLongText ? lorem : (text || "This is text.");
    el.value = value;
  },

  _checkItems: function(elementIds) {
    elementIds.forEach(function(id) {
      var el = document.getElementById(id);
      el.checked = true;
    });
  },
  
  _selectOption: function(selectTagIds, index) {
    selectTagIds.forEach(function(id) {
      var el = document.getElementById(id);
      el[index].selected = true;
    });
  },

  _fillTextFields: function(inputs) {
    var self = this;

    inputs.forEach(function(input, i) {
      if (_.isPlainObject(input)) {
        if (_.has(input, 'id')) {
          self._fillInput(input.id, input.text, input.long || false);
        };
      } else {
        self._fillInput(input);
      };
    });
  },

  _fill: function(map) {
    if (_.isArray(map.check)) {
      this._checkItems(map.check);
    };
    
    if (!_.isEmpty(map.select)) {
      if (_.isArray(map.select.items)) {
        this._selectOption(map.select.items, map.select.index || map.select.items.length - 1);
      };
    };
    
    if (_.isArray(map.text)) {
      this._fillTextFields(map.text);
    };
    
    if (_.isArray(map.radio)) {
      this._checkItems(map.radio)
    };
  },
  
  init: function(map, className) {
    var self = this;
    var el = className || 'form-filler';
    var button = document.getElementsByClassName(el)[0];

    button.addEventListener('click', function() {
      self._fill(map);
    });    
  }
};

module.exports = FormFiller;