/*
When a function is created, it has access to a reference to all the variables
declared around it, also known as it's lexical environment. 
The combination of the function and its enviroment is called a closure.
 */

function createAdder(a) {
  return function (b) {
    const sum = a + b;
    return sum;
  };
}
const f = createAdder(4);
console.log(f(3)); // 7
