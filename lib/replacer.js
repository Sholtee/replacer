/********************************************************************************
*  replacer.js                                                                  *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

(function(module){
module.exports = replacer;

replacer.markups = Object
    .entries({DEFAULT: ['#{', '}'], ERB: ['<%=', '%>']})
    .reduce((acu, [key, [ipStart, ipEnd]]) => Object.assign(acu, {
        [key]: new RegExp(`(\\\\?)${ipStart}(((?!\r\n|\n|\r|${ipStart}).)*)${ipEnd}`, 'g')
    }), {});

replacer.compile = function(src, markup = replacer.markups.DEFAULT) {
    const funcCache = {};

    for (var ar; ar = markup.exec(src);) {
        var [, escapeChar, expression] = ar;

        expression = replacer.$$normalizeExpression(expression);
        if (!escapeChar && !(expression in funcCache))
            funcCache[expression] = new Function('ctx', `with(ctx) { return ${expression}; }`);
    }

    return function replace(context) {
        return src.replace(markup, (match, escape, expression) => {
            if (escape) return match.substring(1);

            expression = replacer.$$normalizeExpression(expression);
            return funcCache[expression](context);
        });
    };
};

replacer.$$normalizeExpression = function(expression) {return expression.replace(/([ \t]+)/g, '');};

function replacer(src, context, markup) {
    return replacer.compile(src, markup)(context);
}

})(module);