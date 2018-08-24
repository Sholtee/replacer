# Replacer

A replacer that supports interpolation.

## Installation

### Package

via npm:

```bash
$ npm install @sholtee/replacer
```

## API

```js
var replace = require('@sholtee/replacer');

// compile
var result = replace('Some #{val_1} with #{fn()}.', {
    val_1: 'string',
    fn: () => 'extra'
});

console.log(result); // will print: "Some string with extra."
```

### Paramz

 - `src`  The source string to be processed
 - `context`  The context in which the interpolation will be applied

## License

MIT