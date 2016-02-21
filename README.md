# form-filler

[![wercker status](https://app.wercker.com/status/bbecf5724c20b9dab349e0272a1d23c4/s/master "wercker status")](https://app.wercker.com/project/bykey/bbecf5724c20b9dab349e0272a1d23c4)

Fill forms with a single button for faster development and testing.

## Installation
The easiest way to use `form-filler` is to install it from NPM.

```bash
$ npm install form-filler@latest --save-dev
```

## Basic Usage

* Say you have this form:

```html
<form id="form-id">
  <input type="checkbox" id="check1"/>
  <label>Check 1</label>
  
  <label for="radio1">Radio 1</label> 
  <input type="radio" name="radiogroup" id="radio1" value="radio1" /> 
  
  <select id="select1">
    <option>1</option>
    <option value="testing">testing</option>
    <option>3</option>
  </select>

  <select id="select2">
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>

  <select id="select3">
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
  
  <input type="text" id="text1"/>
  <input type="text" id="text2"/>

  <textarea id="textarea1"></textarea>
</form>
```

* Add a button to help you fill the form. Give it a custom class or use the following class name:
  
```html
<button class="form-filler">Fill Form</button>
```

* In you JavaScript code initialize the `form-filler`. This will bind a `click` event to the button you set up in the previous step and fill out the form with the object you've provided: 

```javascript
var FormFiller = require('form-filler');

var map = {check: ["check1"],
           radio: ["radio1"],
           select: [{id: "select1", value: "testing"},
                    "select2",
                    {id: "select3", index: 0}],
           text: [{id: "text1", text: "Testing some text here!"},
                  "text2",
                  {id: "textarea1", long: true}]};

FormFiller.fill(map);
```

* The map is a key-value object which supports the following:
  
  * Keys
    * `check` for checkboxes.
    * `radio` for radio buttons.
    * `select` for select tags.
    * `text` for text fields and textareas.
  
  * Values:
    * `check` key: Array of plain IDs, e.g: `["id1", "id2"]`.
    * `radio` key: Array of plain IDs, e.g: `["id1", "id2"]`.
    * `select` key: Array of plain IDs (last option is selected), e.g: `["id1", "id2"]`, or a mixture of:
      * Plain IDs (last option is selected), e.g: `"id1"`
      * Maps:
        * `{id: "element-id-here", value: "value-of-option"}`
        * `{id: "element-id-here", index: 1}`
          * `index` is the index of the option to be selected (staring at 0)
    * `text` key: Array of plain IDs, e.g: `["id1", "id2"]`, or a mixture of:
      * Plain IDs, e.g: `"id1"`
      * Maps:
        * `{id: "element-id-here", text: "Your custom text here!"}`
        * `{id: "textarea-id-here", long: true}`
          * `long` will fill the textarea/text field with long text.


## Advanced Usage

* You can provide the `fill` function a custom class name for the fill button we added in a previous step:

```javascript
FormFiller.fill(map, "custom-button-class");
```

* If you just want to fill the entire form, use the `fillAll` function, and provide a form ID:

```javascript
FormFiller.fillAll("your-form-id");

// OR
FormFiller.fillAll("your-form-id", "custom-button-class");
```

## API Reference

* `FormFiller.fill(map[, buttonClassName]);`
* `FormFiller.fillAll(formId[, buttonClassName]);`

* `form-filler` is the default `buttonClassName`.

## Motivation

We have previously built our own custom form filler on one of our projects and decided that this is much more valuable as a library.

## Tests

Test are in the `test/` directory.

Run tests using:

```bash
$ npm test
```

## Contributing

* Fork it
* Create your feature branch
* Add your changes, and add a test for the changes.
* Run tests using

```bash
  $ npm test
```
* Make sure everything is passing
* Push to the branch
* Create a new Pull Request

## License

Copyright (c) 2016 ButterCloud LLC.

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.