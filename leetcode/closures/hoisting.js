/* 
Function hoising is when a function can be used before it is initialized.
we can only do this if we declare functions with function keyword
*/
function createFunction() {
  //the function 'f' is returned before it is initialized.
  return f;
  function f(a, b) {
    const sum = a + b;
    return sum;
  }
}
const f = createFunction();
console.log(f(3, 4)); //7
