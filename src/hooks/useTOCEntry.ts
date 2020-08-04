import { useEffect, useRef } from 'react';
import { TOCContainer } from '../context/TOCContext';
import ParentChildContext from '../context/ParentChildContext';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

/**
 * Hook to initialise and modify a Table of Contents Section
 * @param element Ref of HTMLElement to be considered a ref in Table of COntents
 * @param sectionObj Object of necessary information for the table of contents
 * @param callback (optional) Callback for when the section is considered "active"
 */
function useTOCEntry(
  element: React.RefObject<HTMLElement> | null,
  sectionObj: Pick<Section, 'id' | 'text'>,
  callback: Function = noop
) {
  const { determineActiveSection, addSection } = TOCContainer.useContainer();
  const { parents, addChild } = ParentChildContext.useContainer();
  const { id, text } = sectionObj;

  const observer = useRef<IntersectionObserver>();
  const intersected = useRef<boolean>(false);

  const callbacks = () => {
    // eslint-disable-next-line no-unused-expressions
    element && determineActiveSection(element, id);
    callback();
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

    // entering viewport
    if (!intersected.current && isInViewport) {
      intersected.current = true;
      window.addEventListener('scroll', callbacks);
      return;
    }

    // leaving viewport
    if (intersected.current && !isInViewport) {
      intersected.current = false;
      window.removeEventListener('scroll', callbacks);

      // ?: Remove as activeSection?
    }
  };

  const initObserver = () => {
    if (!observer?.current)
      observer.current = new IntersectionObserver(handleIntersection, {
        threshold: 0,
      });
  };

  /** EFFECTS */

  useEffect(() => {
    initObserver();
    startObserver();

    return () => {
      window.removeEventListener('scroll', callbacks);
      stopObserver();
    };
  }, []);

  useEffect(() => {
    if (!element) return;

    addSection({ element, id, text, parents });
    addChild(id);
  }, []);
}

export default useTOCEntry;
