/********************************************************************************
*  replacer.js                                                                  *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

(function(module){
module.exports = replacer;

replacer.markups = generateMarkups({DEFAULT: ['#{', '}'], ERB: ['<%=', '%>'], DOUBLE_BRACES: ['{{', '}}']});

replacer.compile = function(src, markup = replacer.markups.DEFAULT) {
    const funcCache = {};

    for (var ar; ar = markup.exec(src);) {
        var [, escapeChar, expression] = ar;

        expression = normalizeExpression(expression);
        if (!escapeChar && !(expression in funcCache))
            funcCache[expression] = new Function('ctx', `with(ctx) { return ${expression}; }`);
    }

    replace.$$expressions = Object.keys(funcCache);
    return replace;

    function replace(context) {
        return src.replace(markup, (match, escape, expression) => {
            if (escape) return match.substring(1);

            expression = normalizeExpression(expression);
            return funcCache[expression](context);
        });
    }
};

function replacer(src, context, markup) {return replacer.compile(src, markup)(context);}

function normalizeExpression(expression) {return expression.replace(/([ \t]+)/g, '');}

function generateMarkups(ctx) {
    return Object.entries(ctx).reduce((acu, [key, [ipStart, ipEnd]]) => Object.assign(acu, {
        [key]: new RegExp(`(\\\\?)${ipStart}(((?!\r\n|\n|\r|${ipStart}).)*)${ipEnd}`, 'g')
    }), {});
}
})(module);