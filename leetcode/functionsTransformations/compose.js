/* 
2629. Function Composition
https://leetcode.com/problems/function-composition
Type: Easy

Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

The function composition of an empty list of functions is the identity function f(x) = x.

You may assume each function in the array accepts one integer as input and returns one integer as output.

Example 1:
Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
Output: 65
Explanation:
Evaluating from right to left ...
Starting with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65

Example 2:
Input: functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
Output: 1000
Explanation:
Evaluating from right to left ...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000

Example 3:
Input: functions = [], x = 42
Output: 42
Explanation:
The composition of zero functions is the identity function
 
Constraints:
-1000 <= x <= 1000
0 <= functions.length <= 1000
all functions accept and return a single integer
*/
/**
 * @param {Function[]} functions
 * @return {Function}
 */
/* 
Approach I: Function Composition using Iteration
Runtime: 62 ms Beats 67.48%
*/
var compose = function (functions) {
  return function (x) {
    const N = functions.length;
    let result = x;
    for (let i = N - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

/* 
Approach II: Handling This context
When using function composition, it's important to consider how the this context of the original functions is preserved. Although the provided test cases may not explicitly test for this, handling the this context correctly can be crucial in real-world scenarios.

Runtime: 62 ms Beats 67.48%
*/
var compose = function (functions) {
  return function (x) {
    const N = functions.length;
    let result = x;
    for (let i = N - 1; i >= 0; i--) {
      result = functions[i](this, result);
    }
    return result;
  };
};

//Example of when we need to handle this context
const obj = {
  value: 1,
  increment: function () {
    this.value++;
    return this.value;
  },
  double: function () {
    this.value *= 2;
    return this.value;
  },
};

// Composing the methods without preserving `this`
const badCompose = function (functions) {
  return function (x) {
    let result = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

const badComposedFn = badCompose([obj.increment, obj.double]);
console.log(badComposedFn(1)); // This will return NaN, because `this` is not `obj` inside `increment` and `double`

// Composing the methods while preserving `this`
const goodCompose = function(functions, context) {
  return function(x) {
    let result = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i].call(context, result);
    }
    return result;
  };
};

const goodComposedFn = goodCompose([obj.increment, obj.double], obj);
console.log(goodComposedFn(1));  // This works as expected, because `this` is `obj` inside `increment` and `double`

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
