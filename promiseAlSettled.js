const allSettled = (promises) => {
  const wrappedPromises = promises.map((promise) =>
    promise
      .then((value) => ({ state: "fulfilled", value }))
      .catch((reason) => ({ state: "rejected", reason }))
  );
  Promise.all(wrappedPromises);
};

//compact
const allSettled2 = (promises) =>
  Promise.all(
    promises.map((promise) =>
      promise
        .then((value) => ({ state: "fulfilled", value }))
        .catch((reason) => ({ state: "rejected", reason }))
    )
  );

//polyfill
if (Promise && !Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(
      promises.map(function (promise) {
        return promise
          .then(function (value) {
            return { state: "fulfilled", value: value };
          })
          .catch(function (reason) {
            return { state: "rejected", reason: reason };
          });
      })
    );
  };
}
