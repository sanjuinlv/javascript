class MyPromise {
  //Promise methods are static
  static all(promises) {
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
