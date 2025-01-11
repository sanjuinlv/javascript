/* 
We can use rest syntax to access all the passed arguments as an array.
*/
function f(...args) {
  const sum = args[0] + args[1];
  return sum;
}
console.log(f(3, 4)); // 7

function log(inputFunction) {
  return function (...args) {
    console.log("Input", args);
    const result = inputFunction(...args);
    console.log(`Output`, result);
    return result;
  };
}
const f = log((a, b) => a + b);
f(1, 2); //
