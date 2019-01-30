/********************************************************************************
*  test.js                                                                      *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

(function(require) {
const
    replace = require('../lib/replacer.js'),
    test    = require('tape');

test('normalizing test', t => {
    t.plan(4);
    
    ['#{obj1.prop+obj2.call()}  #{obj1.prop+obj2.call()} ', '#{  obj1.prop +        obj2.call() }  #{obj1.prop+obj2.call()} '].forEach(template => {
        const  expressions = replace.compile(template).$$expressions;
        t.equal(expressions.length, 1);
        t.equal(expressions[0], 'obj1.prop+obj2.call()');
    });
});

[[replace.markups.DEFAULT, '#{', '}'], [replace.markups.ERB, '<%=', '%>'], [replace.markups.DOUBLE_BRACES, '{{', '}}']].forEach(([markup, ipStart, ipEnd]) => {

test('multiple interpolation test', t => {
    t.plan(1);

    const
        actual   = replace(`Some ${ipStart}val_1${ipEnd} with ${ipStart}val_2${ipEnd}.`, {
            val_1: 'text',
            val_2: 'extra'
        }, markup),
        expected = 'Some text with extra.';

    t.equal(actual, expected);
});

test('function test', t => {
    t.plan(1);

    const
        actual   = replace(`Print ${ipStart}fn({val: "me"})${ipEnd}.`, {fn: obj => obj.val}, markup),
        expected = 'Print me.';

    t.equal(actual, expected);
});

test('escaping test', t => {
    t.plan(1);
    
    const
        actual = replace(`Some ${ipStart}val${ipEnd} with \\${ipStart}escaped${ipEnd} content.`, {
            val: 'text',
            escaped: 'should not print'
        }, markup),
        expected = `Some text with ${ipStart}escaped${ipEnd} content.`;

    t.equal(actual, expected);
});

test('compile test', t => {
    t.plan(3);

    const replaceFn = replace.compile(`Some ${ipStart}val_1${ipEnd} with ${ipStart}val_2${ipEnd}.`, markup);
    t.ok(typeof replaceFn === 'function');

    t.equal(replaceFn({val_1: 'text', val_2: 'extra'}), 'Some text with extra.');
    t.equal(replaceFn({val_1: 'meat', val_2: 'pasta'}), 'Some meat with pasta.');
});
});
})(require);