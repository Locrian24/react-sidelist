import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { Target } from '../types/contextTypes';

function useTOC(initialState = null) {
  const [sectionList, setSectionList] = useState<SectionList>([]);
  const [activeSection, setActiveSection] = useState<string | null>(
    initialState
  );

  /**
   * Gets the Y-axis co-ord of the top of the element given
   * @param element Element that will be tracked
   */
  function getYScrollPosition(element = false as Target | false): number {
    if (!element) return 0;

    const target = element ? element.current : document.body;
    const position = target?.getBoundingClientRect() || { top: 0 };

    return position.top;
  }

  /**
   * Determines if the given element is "active"
   * @param element Element being tracked
   * @returns If the element meets the criteria that will define it as "active"
   */
  function isActive(element: Target): boolean {
    // TODO: Change to user defined value
    const { min, max } = { min: 0, max: 120 };

    const topPos = getYScrollPosition(element);
    const bottomPosition = topPos + (element.current?.scrollHeight || 0);

    const topStatus = topPos < max ? (topPos > min ? 'in' : 'above') : 'below';
    const bottomStatus =
      bottomPosition < max ? (bottomPosition > min ? 'in' : 'above') : 'below';

    // Section is active if one of the following is true:
    // Top "in" - Bottom ">"
    // Top ">" - Bottom "in"
    // Top "<" - Bottom ">"

    // TODO: What if fast scroll goes to middle of section and misses the top being in the range
    const inRange = !(
      (topStatus === 'above' && bottomStatus === 'above') ||
      (topStatus === 'below' && bottomStatus === 'below')
    );

    return inRange;
  }

  /**
   * Determines if the given element is active and updates the context state
   * @param element Element to check if active
   */
  const determineActiveSection = (element: Target, id: string): void => {
    if (!element) return;

    const active = isActive(element);
    if (!active) return;

    // TODO: What happens when multiple elements are "active"
    setActiveSection((prev: string | null) => (prev !== id ? id : prev));
  };

  /**
   * Adds the section to the state array
   * @param element Element ref to be added
   */
  const addSection = ({ element, id }: Section) => {
    if (!element) return;

    // TODO Don't support dynamically added sections in thier correct position
    setSectionList((prev: SectionList) => [...prev, { element, id }]);
  };

  return {
    determineActiveSection,
    addSection,
    sectionList,
    activeSection,
  };
}

export default createContainer(useTOC);
