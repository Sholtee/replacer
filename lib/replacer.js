/********************************************************************************
*  replacer.js                                                                  *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

module.exports = (src, context, markup = /\\?#{([^#\n]+)}/g, escapeChar = '\\') => src.replace(markup, (match, expression) => match.startsWith(escapeChar)
    ? match.substring(1)
    : (new Function(...Object.keys(context), 'return ' + expression)).call(null, ...Object.values(context)));