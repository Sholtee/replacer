/********************************************************************************
*  replacer.js                                                                  *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

module.exports = (src, context) => src.replace(/#{(.+)}/g, (match, expression) => (new Function(...Object.keys(context), 'return ' + expression)).call(null, ...Object.values(context)));