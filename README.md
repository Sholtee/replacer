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
var result = replace('Some #{val} with #{fn()}.', {
    val: 'string',
    fn: () => 'extra'
});

console.log(result); // will print: "Some string with extra."
```

### Paramz

 - `src`  The source string to be processed
 - `context`  The context in which the interpolation will be applied
 - `[markup]` Optional regex to override the interpolation markup (default is `#{...}`)
 
## License

MIT