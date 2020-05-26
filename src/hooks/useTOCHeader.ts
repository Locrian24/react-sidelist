import { RefObject, useEffect, useState, useRef } from 'react';

type Target = RefObject<Element>;

// ** A stripped/typed version of https://github.com/n8tb1t/use-scroll-position/blob/master/src/useScrollPosition.jsx
function getYScrollPosition({
  element = false,
}: {
  element: Target | false;
}): number {
  if (!element) return 0;

  const target = element ? element.current : document.body;
  const position = target?.getBoundingClientRect() || { top: 0 };

  return position.top;
}

interface ScrollRange {
  min: number;
  max: number;
}

function useTOCHeader(element: Target, range: ScrollRange): void {
  const [active, setActive] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver>();
  const intersected = useRef<boolean>(false);

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

  const isActive = (topPosition: number): boolean => {
    const { min, max } = range;
    const bottomPosition = topPosition + (element.current?.scrollHeight || 0);

    const topStatus =
      topPosition < max ? (topPosition > min ? 'in' : 'above') : 'below';
    const bottomStatus =
      bottomPosition < max ? (bottomPosition > min ? 'in' : 'above') : 'below';

    // Section is active if one of the following is true:
    // Top "in" - Bottom ">"
    // Top ">" - Bottom "in"
    // Top "<" - Bottom ">"

    const inRange = !(
      (topStatus === 'above' && bottomStatus === 'above') ||
      (topStatus === 'below' && bottomStatus === 'below')
    );

    return inRange;
  };

  const handleScroll = () => {
    const position = getYScrollPosition({ element });
    const newActive = isActive(position);

    setActive(newActive);
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
      window.addEventListener('scroll', handleScroll);
      return;
    }

    if (intersected.current && !isInViewport) {
      intersected.current = false;
      window.removeEventListener('scroll', handleScroll);
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
      window.removeEventListener('scroll', handleScroll);
      stopObserver();
    };
  }, [element.current]);
}

export default useTOCHeader;
