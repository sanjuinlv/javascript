/* 
Throttling is a technique used to limit the execution of an event handler function,
even when this event triggers continuously due to user actions. The common use cases
 are browser resizing, window scrolling etc.

The below example creates a throttle function to reduce the number of events for
each pixel change and trigger scroll event for each 100ms except for the first event.
*/
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      //call first time
      func.apply(this, args);
      //throttle until timeout
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 100);
});

const throttle2 = (f, timeout = 100) => {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      //call first time
      f.apply(this, args);
      //throttle until timeout
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, timeout);
    }
  };
};
