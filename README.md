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
var replace = require('@sholtee/replacer');

// render
var result = replace('Some #{val} with #{fn()} and \\#{escaped content}.', {
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
var replacer = require('@sholtee/replacer');

// compile
const replace result = replacer.compile('Some #{val} with #{fn()} and \\#{escaped content}.');
 
// render 
const result = replace({
    val: 'string',
    fn: () => 'extra'
});

console.log(result); // will print: "Some string with extra and #{escaped content}."
```

## License

MIT