const assert1 = require('assert');

// 1. Load stealthy-require
var stealthyRequire = require('stealthy-require');
// This does nothing but loading the code.
// It has no side-effects like patching the module loader or anything.
 
// Any regular require works as always.
var request1 = require('got');
 
// 2. Call stealthyRequire with passing the require cache and a callback.
var requestFresh = stealthyRequire(require.cache, function () {
 
    // 2a. Before this callback gets called the require cache is cleared.
 
    // 2b. Any require taking place here takes place on a clean require cache.
    // Since the require call is part of the user's code it also works with module bundlers.
    return require('got');
    // Anything returned here will be returned by stealthyRequire(...).
 
    // 2c. After this callback gets called the require cache is
    // - cleared again and
    // - restored to its old state before step 2.
 
});
 
// Any regular require again works as always.
// In this case require returns the cached request module instance.
var request2 = require('got');
 
// And voilà:

assert1(request1 === request2, 'Should be true') // -> true
assert1(! (request1 === requestFresh), 'Should be false') // -> false
