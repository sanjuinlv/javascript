class MyPromise {
  //Promise methods are static
  static all(promises) {
    if (promises.length == 0) return Promise.resolve([]);
    //stores the result of promises
    let results = [];
    let resolveCount = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            //we need to store the result in order of promise array so we need to use index
            results[index] = value;
            resolveCount++;
            if (resolveCount === promises.length) {
              //we are done with all promises.
              resolve(results);
            }
          })
          .catch((err) => reject(err));
      });
    });
  }
}

/* handling case when input is 
all([1,2,3, Promise.resolve(4)]) => should resolve right away with [1, 2, 3, 4]
all([1,2,3, Promise.reject('error')]) => should reject
*/
class MyPromise {
  //Promise methods are static
  static all(promises) {
    if (promises.length == 0) return Promise.resolve([]);
    //stores the result of promises
    let results = [];
    let resolveCount = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (promise instanceof Promise) {
          promise
            .then((value) => {
              //we need to store the result in order of promise array so we need to use index
              results[index] = value;
              resolveCount++;
              if (resolveCount === promises.length) {
                //we are done with all promises.
                resolve(results);
              }
            })
            .catch((err) => reject(err));
        } else {
          results[index] = promise;
        }
        if (results.length === promises.length) {
          resolve(results);
        }
      });
    });
  }
}

//reduce solution
Promise.all = function promiseAllReduce(values) {
  return values.reduce((accumulator, value) => {
    return accumulator.then((results) => {
      return Promise.resolve(value).then((result) => {
        return [...results, result];
      });
    });
  }, Promise.resolve([]));
};
