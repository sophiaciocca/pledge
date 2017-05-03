'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

//executor: the callback to the "new Promise" 
//ex:
/*

const fs = reqiure ('fs');

new $Promise(function(resolve, reject) {
    fs.readFile('./1.txt', function (err, contents) {
        if (err) return reject(err);
        resolve(contents);
    })
});


//NOTE:
executor might not be defined -- like, someone might call new Promise() without an executor.

*/
const fs = require('fs');

fs.readFile('')


function $Promise (executor) {

    this._state = 'pending';
    this._value;
    this._handlerGroups = [];

    if (typeof executor === 'function') {
        executor(this._internalResolve.bind(this), this._internalReject.bind(this));
    }
    
}

$Promise.prototype._internalResolve = function(value) {
    if (this._state === 'pending') {
        this._value = value;
        this._state = 'fulfilled';
        //call callHandlers, to go ahead and get started on the success stuff
        this._callHandlers();
    }
}

$Promise.prototype._internalReject = function(reason) {
    if (this._state === 'pending') {
        this._value = reason;
        this._state = 'rejected';
        //call callHandlers, to go ahead and get started on the error stuff
        this._callHandlers();
    } 
}

$Promise.prototype.then = function(successCb, errorCb) {

    //building a list
    var newHandler = {
        successCb: null,
        errorCb: null
    };

    //if onFulfilled is a function, put it in the array; otherwise, store it as null
    if (typeof successCb === 'function') {
        newHandler.successCb = successCb;
    }

    //same for onRejected
    if (typeof errorCb === 'function') {
        newHandler.errorCb = errorCb;
    }

    this._handlerGroups.push(newHandler);

    //if promise is already fulfilled/rejected, call it now! (call callHandlers)
    if (this._state !== 'pending') {
        this._callHandlers();
    }

}


$Promise.prototype._callHandlers = function() {

    //if fulfilled, call success handler
    if (this._state === 'fulfilled') {

        //go thru all of handler groups
        this._handlerGroups.forEach(function (item) {
            const successFn = item.successCb;
            //invoke it 
            successFn(this._value);
        }, this) //<<note: use 'this' argument on forEach to keep this intact
    }

    //otherwise, if rejected, call rejected handler (_callHandlers will never be called if still pending)
    else {
        //go thru all of handler groups
        this._handlerGroups.forEach(function (item) {
            const failFn = item.errorCb;
            //invoke it 
            if (isFn(failFn)) { ///have to check if its a function b/c bubbling -- might sometimes be null
                failFn(this._value);
        }, this) //<<note: use 'this' argument on forEach to keep this intact
    }

    //now, forget about them, after you've dealt with all the goroups
    this._handlerGroups = [];

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
