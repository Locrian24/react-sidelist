import { useEffect, useRef } from 'react';
import { Target } from '../types/contextTypes';
import TOCContext from '../context/TOCContext';

// ** A stripped/typed version of https://github.com/n8tb1t/use-scroll-position/blob/master/src/useScrollPosition.jsx

/**
 * Adds Element to TOC List and manages viewport intersection events
 * @param element Element to include in TOC
 * @param id Unique identifier for the element, also used for in-page navigation
 */
function useTOCHeader(element: Target, id: string): void {
  const { determineActiveSection, addSection } = TOCContext.useContainer();

  const observer = useRef<IntersectionObserver>();
  const intersected = useRef<boolean>(false);

  const callback = () => {
    determineActiveSection(element, id);
  };

  const startObserver = () => {
    if (element?.current && observer?.current)
      observer.current.observe(element.current);
  };

  const stopObserver = () => {
    if (element?.current && observer?.current) {
      observer.current.unobserve(element.current);
      observer.current.disconnect();
      observer.current = undefined;
    }
  };

  const handleIntersection = (entries: Array<IntersectionObserverEntry>) => {
    const entry = entries[0] || {};
    const { isIntersecting, intersectionRatio } = entry;
    const isInViewport =
      typeof isIntersecting !== 'undefined'
        ? isIntersecting
        : intersectionRatio > 0;

    if (!intersected.current && isInViewport) {
      intersected.current = true;
      window.addEventListener('scroll', callback);
      return;
    }

    if (intersected.current && !isInViewport) {
      intersected.current = false;
      window.removeEventListener('scroll', callback);
    }
  };

  const initObserver = () => {
    if (!observer?.current)
      observer.current = new IntersectionObserver(handleIntersection, {
        threshold: 0,
      });
  };

  /** EFFECTs */

  useEffect(() => {
    initObserver();
    startObserver();

    return () => {
      console.log('unmounting');

      window.removeEventListener('scroll', callback);
      stopObserver();
    };
  }, []);

  useEffect(() => {
    const { current } = element;
    addSection({ element: current, id });
  }, []);
}

export default useTOCHeader;
