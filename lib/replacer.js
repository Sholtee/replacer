/********************************************************************************
*  replacer.js                                                                  *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

module.exports = (src, context, markup = /#{([^#\n]+)}/g) => src.replace(markup, (match, expression) => (new Function(...Object.keys(context), 'return ' + expression)).call(null, ...Object.values(context)));