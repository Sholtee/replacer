/********************************************************************************
*  test.js                                                                      *
*  Author: Denes Solti                                                          *
********************************************************************************/
'use strict';

const
    replace = require('../lib/replacer.js'),
    test    = require('tape');

test('multiple interpolation test', t => {
    t.plan(1);

    const
        actual   = replace('Some #{val_1} with #{val_2}.', {
            val_1: 'text',
            val_2: 'extra'
        }),
        expected = 'Some text with extra.';

    t.equal(actual, expected);
});

test('function test', t => {
    t.plan(1);

    const
        actual   = replace('Print #{fn({val: "me"})}.', {fn: obj => obj.val}),
        expected = 'Print me.';

    t.equal(actual, expected);
});

test('escaping test', t => {
    t.plan(1);
    
    const
        actual = replace('Some #{val} with \\#{escaped} content.', {
            val: 'text',
            escaped: 'should not print'
        }),
        expected = "Some text with #{escaped} content.";

    t.equal(actual, expected);
});