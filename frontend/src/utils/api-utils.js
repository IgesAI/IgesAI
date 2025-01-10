export const fetchWithRetry = async (url, options, retries = 3) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json();
      }

      if (response.status === 429) {
        // Rate limit hit - exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
        continue;
      }

      throw new Error(`API Error: ${response.status}`);
    } catch (error) {
      lastError = error;
      
      if (i === retries - 1) break;
      
      // Wait before retrying
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }

  throw lastError;
};

export const withCache = (key, ttl = 5 * 60 * 1000) => {
  const cache = new Map();

  return function decorator(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
      const cacheKey = `${key}-${JSON.stringify(args)}`;
      const cached = cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.data;
      }

      const result = await originalMethod.apply(this, args);
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    };

    return descriptor;
  };
}; 