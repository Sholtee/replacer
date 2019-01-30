# Replacer

A replacer that supports interpolation.

## Installation

### Package

via npm:

```bash
$ npm install @sholtee/replacer
```

## API

### replacer()
Renders a template with the given context.

#### Parameters

- `src` The source string to be processed
- `context` The context (object) which contains the interpolation variables 
- `[markup]` Optional regex to override the interpolation markup (default is `#{...}`)
 
#### Returns
The rendered string.

#### Usage example:

```js
const replace = require('@sholtee/replacer');
.
.
.

// render
const result = replace('Some #{val} with #{fn()} and \\#{escaped content}.', {
    val: 'string',
    fn: () => 'extra'
});

console.log(result); // will print: "Some string with extra and #{escaped content}."
```

### replacer.compile()
Compiles a template into a function that can be evaluated for rendering

#### Parameters

- `src`  The source string to be processed
- `[markup]` Optional regex to override the interpolation markup (default is `#{...}`)
 
#### Returns
A rendering function which has the following one parameter

- `context`  The context (object) which contains the interpolation variables 
 
#### Usage example:

```js
const replacer = require('@sholtee/replacer');
.
.
.

// compile
const replace = replacer.compile('Some #{val} with #{fn()} and \\#{escaped content}.');
 
// render 
const result = replace({
    val: 'string',
    fn: () => 'extra'
});

console.log(result); // will print: "Some string with extra and #{escaped content}."
```

### markups
Replacer comes with several built in markup styles (default is `#{...}`) available via the this property. You may use the consts found here as the `markup` parameter (see before). Note, you can even use arbitrary regex to define markups.

#### Built in styles

- DEFAULT: `#{...}`
- ERB: `<%=...%>`
- DOUBLE_BRACES: `{{...}}`  

#### Usage example:

```js
const replace = require('@sholtee/replacer');
.
.
.

// render
const result = replace('Some <%= val %>.', {val: 'string'}, replace.markups.ERB);

console.log(result); // will print: "Some string."
```

## Version history

- 0.0.1: Initial release
- 0.0.2: Using regexp to determine markups
- 0.0.3: Overridable markup
- 0.0.4: 
  1. Fixed multiple interpolation issue
  2. Support for escaped interpolation
- 0.0.5: Removed parameter `escapeChar`
- 0.0.6: Regex cosmetics
- 0.0.7:
  1. Added `compile()` API
  2. Added `markups` property

## License

MIT