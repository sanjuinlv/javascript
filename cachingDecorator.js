function cachingDecorator(fn, cache = new Map()) {
  //custom hash function as per need
  function hash(args) {
    args = [...args];
    let hash = "";
    args.forEach((arg) => {
      hash += arg;
    });
    return hash;
  }
  return (...args) => {
    let key = hash(args);
    // console.log(`args: ${args}`);
    // console.log(`key: ${key}`);
    if (cache.has(key)) {
      // console.log(`cache hit`)
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function square(num) {
  return num * num;
}
//usage
const squareDecorator = cachingDecorator(square);
squareDecorator(4);
squareDecorator(4);

//.ts version
class Cache {
  /**
   * Returns caching decorator for a given function call which usually take longer time to get a resource over the network.
   * We can use this caching decorator to cache the result of a method result to speed up the UI processing.
   * The example usage is as following:
   *   // A function which takes long time to get the resource over the network
   *   function load(arg1, arg2) {
   *      // fetch something over the network
   *      return  <result>;
   *   }
   *   // now we can wrap the load function with caching decorator
   *   // this load can cache the result
   *   load = getCachingDecorator(load);
   *   // for the first call it will return the result after getting the resource
   *   load("arg1", "arg2");
   *   // on next call with same args it will return the result from cache
   *   load("arg1", "arg2");
   *
   *   The cache is creating every time we getCachingDecorator() and it will use same as long as you same decorator reference.
   *   In case you want to create decorator with your own cache you may do it.
   *   const myCache = new Map();
   *   load = getCachingDecorator(load, myCache);
   */

  static getCachingDecorator(func, cache = new Map()) {
    //creates the hash key from given arguments by concatenating them.
    function hash(args) {
      const argsArray = [...args];
      let hash = "";
      argsArray.forEach((arg) => {
        hash += arg;
      });
      return hash;
    }
    return (...args) => {
      const key = hash(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func(...args);
      cache.set(key, result);
      return result;
    };
  }
}

export default Cache;
