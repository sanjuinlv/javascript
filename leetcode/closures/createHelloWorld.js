/**
 * @return {Function}
 */

/* 
Runtime: 51 ms Beats 52.57%
Memory: 49.35 MB Beats 8.67%
*/
var createHelloWorld = function() {
    
    return function(...args) {
        return "Hello World";
    }
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */