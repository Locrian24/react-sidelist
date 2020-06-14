import React, { useState, PropsWithChildren, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { Target } from '../types/contextTypes';
import TOCChildrenWrapper from '../components/TOCChildren';

function useTOC(initialState = null) {
  const [sectionList, setSectionList] = useState<SectionList>({});
  const [parentList, setParentList] = useState<Array<string>>([]);
  const [activeSection, setActiveSection] = useState<string | null>(
    initialState
  );
  const [activeParents, setActiveParents] = useState<Array<string>>([]);

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
    const { min, max } = { min: 0, max: 80 };

    const topPos = getYScrollPosition(element);
    const bottomPosition = topPos + 150;
    // const bottomPosition = topPos + (element.current?.scrollHeight || 0);

    const topStatus = topPos < max ? (topPos > min ? 'in' : 'above') : 'below';
    const bottomStatus =
      bottomPosition < max ? (bottomPosition > min ? 'in' : 'above') : 'below';

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
  const addSection = ({ element, id, text, parent }: Section) => {
    if (!element) return;

    // TODO Don't support dynamically added sections in thier correct position
    // ? List order comes from order of adding to state list rather than actual order
    setSectionList((prev: SectionList) => ({
      ...prev,
      [id]: { element, id, text, parent },
    }));
  };

  /**
   * Returns the nested level of a parent/activeSection
   */
  const getDepth = () => {
    return activeParents.length - 2;
  };

  /**
   * Aggregate all ancestors of a node
   * @param primaryParent the id of the deepest parent
   */
  const aggregateParents = useCallback(
    (
      primaryParent: string,
      currentParents = [] as Array<string>
    ): Array<string> => {
      if (!sectionList[primaryParent]?.parent) return [primaryParent];

      const { parent } = sectionList[primaryParent];

      return [
        primaryParent,
        ...aggregateParents(parent, [...currentParents, primaryParent]),
      ];
    },
    [sectionList]
  );

  return {
    determineActiveSection,
    addSection,
    sectionList,
    activeSection,
    activeParents,
    setActiveParents,
    aggregateParents,
  };
}

export const TOCContainer = createContainer(useTOC);

export const TOCProvider = ({
  initialSection,
  children,
}: PropsWithChildren<{ initialSection: string }>) => {
  return (
    <TOCContainer.Provider initialState={initialSection}>
      <TOCChildrenWrapper parent="root">{children}</TOCChildrenWrapper>
    </TOCContainer.Provider>
  );
};
