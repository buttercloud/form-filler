var _ = require('lodash');

var FormFiller = {
  _fillTextField: function(el, text, isLongText) {
    var lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    var value = isLongText ? lorem : (text || "This is text.");
    el.value = value;
  },

  _checkItem: function(el) {
    el.checked = true;
  },

  _selectOption: function(el, index) {
    el[index].selected = true;
  },

  _checkItemsWithIds: function(elementIds) {
    var self = this;

    elementIds.forEach(function(id) {
      var el = document.getElementById(id);
      self._checkItem(el);
    });
  },

  _selectOptionsWithIds: function(selectTagIds, index) {
    var self = this;

    selectTagIds.forEach(function(id) {
      var el = document.getElementById(id);
      self._selectOption(el, index);
    });
  },

  _fillTextFieldsWithIds: function(inputs) {
    var self = this;

    inputs.forEach(function(input, i) {
      if (_.isPlainObject(input)) {
        if (_.has(input, 'id')) {
          var el = document.getElementById(input.id);
          self._fillTextField(el, input.text, input.long || false);
        };
      } else {
        var el = document.getElementById(input);
        self._fillTextField(el);
      };
    });
  },

  _fill: function(map) {
    if (_.isArray(map.check)) {
      this._checkItemsWithIds(map.check);
    };
    
    if (!_.isEmpty(map.select)) {
      if (_.isArray(map.select.items)) {
        this._selectOptionsWithIds(map.select.items, map.select.index || map.select.items.length - 1);
      };
    };
    
    if (_.isArray(map.text)) {
      this._fillTextFieldsWithIds(map.text);
    };
    
    if (_.isArray(map.radio)) {
      this._checkItemsWithIds(map.radio)
    };
  },
  
  _fillAllForm: function(formId) {
    var self = this;
    var formEl = document.getElementById(formId);
    var children = formEl.children;

    for (var i = 0; i < children.length; i++) {
      var el = children[i];

      switch (el.nodeName) {
        case "INPUT":
          el.type === "text" ? self._fillTextField(el, null, false) : self._checkItem(el);
          break;
        case "SELECT":
          self._selectOption(el, el.length - 1);
          break;
        case "TEXTAREA":
          self._fillTextField(el, null, true);
          break;
        default:
      }
    }
  },

  _bindAndInit: function(className, fillFn) {
    var self = this;
    var el = className || 'form-filler';
    var button = document.getElementsByClassName(el)[0];

    button.addEventListener('click', function() {
      fillFn();
    });    
  },

  init: function(map, className) {
    this._bindAndInit(className, this._fill.bind(this, map));
  },

  fillAll: function(formId, className) {
    this._bindAndInit(className, this._fillAllForm.bind(this, formId));
  }
};

module.exports = FormFiller;