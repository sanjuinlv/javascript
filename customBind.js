let friend = {
  name: "Alvin",
  age: 23,
};

function friendInfo(food) {
  return `Our friend ${this.name}, is ${this.age} years old. He likes to eat ${food}`;
}

Function.prototype.myBind = function (context) {
  const fn = this;
  return function () {
    return fn.apply(context, [...arguments]);
  };
};

const boundTwo = friendInfo.myBind(friend);
console.log(boundTwo("salad")); // Our friend Alvin, is 23 years old. He likes to eat salad

//passing argument from bind function as well
let obj = {
  name: "Jack",
};

let myFunc = function (id, city) {
  console.log(`${this.name}, ${id}, ${city}`); // id will be undefined
};

// Accepting any number of arguments passed to myBind
Function.prototype.myBind = function (obj, ...args) {
  let func = this;
  // Accepting arguments passed to newFunc
  return function (...newArgs) {
    func.apply(obj, [...args, ...newArgs]);
  };
};

let newFunc = myFunc.myBind(obj, "a_random_id");
newFunc("New York"); // Jack, a_random_id, New York
