import { useState, useEffect } from 'react';

const debounce = (callback, ms) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback();
    }, ms);
  };
};

export default function useWindowSize() {
  const [size, setSize] = useState(() => {
    // set size when component is mounted
    if (typeof window !== 'undefined') {
      return [window.innerWidth, window.innerHeight];
    }
  });

  useEffect(() => {
    const updateWindowSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    const debouncedResizeHandler = debounce(updateWindowSize, 500);

    window.addEventListener('resize', debouncedResizeHandler);

    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, [size]);

  return size;
}
