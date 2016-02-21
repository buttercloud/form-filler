var _ = require('lodash');

var FormFillerUtil = {
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

  _selectOptionWithValue: function(el, value) {
    var options = el.options;
    var index = _.findIndex(el.options, function(o) { return o.value === value });

    this._selectOption(el, index);
  },

  _checkItemsWithIds: function(elementIds) {
    var self = this;

    elementIds.forEach(function(id) {
      var el = document.getElementById(id);

      if (el) {
        self._checkItem(el);
      }
    });
  },

  _selectOptionsWithIds: function(selects) {
    var self = this;

    selects.forEach(function(select) {
      if (_.isPlainObject(select)) {
        if (_.has(select, 'id')) {
          var el = document.getElementById(select.id);

          if (el) {
            if (_.has(select, "index") &&
                !_.has(select, "value")) {
              self._selectOption(el, select.index);
            } else if (_.has(select, "value") &&
                      !_.has(select, "index")) {
              self._selectOptionWithValue(el, select.value);
            }
          }
        }
      } else {
        var el = document.getElementById(select);

        if (el) {
          self._selectOption(el, el.length - 1);
        }
      }
    });
  },

  _fillTextFieldsWithIds: function(inputs) {
    var self = this;

    inputs.forEach(function(input, i) {
      if (_.isPlainObject(input)) {
        if (_.has(input, 'id')) {
          var el = document.getElementById(input.id);

          if (el) {
            self._fillTextField(el, input.text, input.long || false);
          }
        }
      } else {
        var el = document.getElementById(input);

        if (el) {
          self._fillTextField(el);
        }
      }
    });
  },

  _fill: function(map) {
    if (_.isArray(map.check)) {
      this._checkItemsWithIds(map.check);
    }

    if (_.isArray(map.radio)) {
      this._checkItemsWithIds(map.radio);
    }

    if (_.isArray(map.select)) {
      this._selectOptionsWithIds(map.select);
    }
    
    if (_.isArray(map.text)) {
      this._fillTextFieldsWithIds(map.text);
    }
  },
  
  _fillAllForm: function(formId) {
    var self = this;
    var formEl = document.getElementById(formId);

    if (formEl) {
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
    }
  },

  _bindAndInit: function(className, fillFn) {
    var self = this;
    var name = className || 'form-filler';
    var button = document.getElementsByClassName(name)[0];

    if (button) {
      button.addEventListener('click', function() {
        fillFn();
      });
    }
  }
};

var FormFiller = {
  fill: function(map, className) {
    FormFillerUtil._bindAndInit(className, FormFillerUtil._fill.bind(FormFillerUtil, map));
  },

  fillAll: function(formId, className) {
    FormFillerUtil._bindAndInit(className, FormFillerUtil._fillAllForm.bind(FormFillerUtil, formId));
  }
};

module.exports = FormFiller;