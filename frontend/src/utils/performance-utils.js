// Memoization utility
export const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Batch updates utility
export const batchUpdates = (updates) => {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      updates.forEach(update => update());
      resolve();
    });
  });
};

// Lazy loading utility
export const lazyLoad = (importFn) => {
  return React.lazy(() => {
    return new Promise(resolve => {
      requestIdleCallback(() => {
        resolve(importFn());
      });
    });
  });
};

// RAF throttle
export const rafThrottle = (fn) => {
  let scheduled = false;
  return (...args) => {
    if (scheduled) return;
    
    scheduled = true;
    requestAnimationFrame(() => {
      fn(...args);
      scheduled = false;
    });
  };
}; 