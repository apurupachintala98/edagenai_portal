import { useState, useEffect, useRef, RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

// Custom hook to observe element dimensions
export const useResizeObserver = <T extends HTMLElement | null>(
  elementRef: RefObject<T>
): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      // We only care about the first entry as we're observing a single element
      const entry = entries[0];
      if (entry) {
        // contentRect provides the size of the content box (padding but no border/margin)
        // You might also use entry.borderBoxSize or entry.devicePixelContentBoxSize
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(currentElement);

    // Initial measurement
    setSize({
      width: currentElement.getBoundingClientRect().width,
      height: currentElement.getBoundingClientRect().height,
    });

    return () => {
      observer.unobserve(currentElement);
      observer.disconnect(); // Disconnect the observer when the component unmounts
    };
  }, [elementRef]); // Dependency on elementRef ensures it re-runs if the ref target changes

  return size;
};