/********************************************************************************
*  replacer.js                                                                  *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

module.exports = function replacer(src, context) {
    const gen = extract(src);

    for(var ret; ret = gen.next().value;){
        const evaluated = myEval(ret.expression, context);

        src = src.replace(ret.match, evaluated);
    }

    return src;

    function* extract(content){
      var
          matchStart = -1,
          nested = 0;

      for(var i = 0; i < content.length; i++){
          switch(true){
              case matchStart === -1 && content[i] === '#' && content[i + 1] === '{':
                  matchStart = i++;
                  break;
              case matchStart >= 0 && content[i] === '{':
                  nested++;
                  break;
              case matchStart >= 0 && content[i] === '}':
                  if (nested) {
                      nested--;
                      break;
                  }

                  yield {
                      match:      content.substring(matchStart, i + 1),
                      expression: content.substring(matchStart + 2, i)
                  };

                  matchStart = -1;
          }
      }
    }

    function myEval(expression, opts){
      return (new Function(...Object.keys(opts), 'return ' + expression)).call(null, ...Object.values(opts));
    }
};