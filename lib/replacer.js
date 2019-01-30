/********************************************************************************
*  replacer.js                                                                  *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

(function(module){
module.exports = replace;

replace.compile = function(src, markup = /(\\?)#{(((?!\n|#{).)*)}/g) {
    const funcCache = {};

    for (var ar; ar = markup.exec(src);) {
        const [, escapeChar, expression] = ar;
        if (!escapeChar && !(expression in funcCache))
            funcCache[expression] = new Function('ctx', `with(ctx) { return ${expression}; }`);
    }

    return function replace(context) {
        return src.replace(markup, (match, escapeChar, expression) => !escapeChar
            ? funcCache[expression](context)
            : match.substring(1));
    };
};

function replace(src, context, markup) {
    return replace.compile(src, markup)(context);
}

})(module);