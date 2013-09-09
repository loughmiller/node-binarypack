/*jslint node: true */

"use strict";

var binarypack = require('../lib/binarypack.js');

function testPackUnpack(test, data) {
    console.log('packing: ', data);
    var buffer = binarypack.pack(data);
    console.log('unpacking');
    test.strictEqual(binarypack.unpack(buffer), data);
}


exports.integers = {
    testInt32 : function (test) {

        var i,
            int32Max = Math.pow(2, 31) - 1;

        for (i=1; i<=int32Max; i*=2) {

            // test positive
            testPackUnpack(test, i);

            // test negative
            testPackUnpack(test, i * -1);

            // test + 1
            testPackUnpack(test, i + 1);

            // test - 1
            testPackUnpack(test, i - 1);

            // test negative + 1
            testPackUnpack(test, (i + 1) * -1);

            // test negative - 1
            testPackUnpack(test, (i - 1) * -1);
        }

        testPackUnpack(test, int32Max);

        testPackUnpack(test, int32Max * -1);

        test.done();
    },

    testUInt32 : function (test) {

        testPackUnpack(test, Math.pow(2, 31));

        testPackUnpack(test, Math.pow(2, 32) - 1);

        test.done();
    },

    testInt64 : function (test) {
        testPackUnpack(test, Math.pow(2, 31) * -1);

        testPackUnpack(test, Math.pow(2, 32));

        testPackUnpack(test, Math.pow(2, 32) * -1);

        testPackUnpack(test, Math.pow(2, 48));

        testPackUnpack(test, Math.pow(2, 48) * -1);

        // largest integer available in javascript
        testPackUnpack(test, Math.pow(2, 53));

        testPackUnpack(test, Math.pow(2, 53) * -1);

        test.done();
    }

};
