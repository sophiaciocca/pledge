'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:


function $Promise (executor) {

    this._state = 'pending';
    this._value;

    if (typeof executor === 'function') {
        executor(this._internalResolve.bind(this), this._internalReject.bind(this));
    }
    
}

$Promise.prototype._internalResolve = function(value) {
// console.log("value", this._value);
    if (this._state === 'pending') {
        this._value = value;
        this._state = 'fulfilled';
    }

}

$Promise.prototype._internalReject = function(reason) {

    if (this._state === 'pending') {
        this._value = reason;
        this._state = 'rejected';
    }
    
}





/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
