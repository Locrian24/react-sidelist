import React, { useState, PropsWithChildren } from 'react';
// TODO: Switch everything to native context api
import { createContainer } from 'unstated-next';
import TOCChildrenWrapper from '../components/TOCChildren';

function useTOCContext(initialState: ProviderProps | undefined) {
  const { initialSection, range } = initialState || {};
  const [sectionList, setSectionList] = useState<SectionList>({});
  const [activeSection, setActiveSection] = useState<string>(
    initialSection || ''
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
    const { min, max } = range || { min: 0, max: 80 };

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
    setActiveSection((prev: string | undefined) => (prev !== id ? id : prev));
  };

  /**
   * Adds the section to the state array
   * @param element Element ref to be added
   */
  const addSection = ({
    element,
    id,
    text,
    parents,
  }: Omit<Section, 'index'>) => {
    if (!element) return;

    // TODO Don't support dynamically added sections in thier correct position
    // ? List order comes from order of adding to state list rather than actual order
    setSectionList((prev: SectionList) => ({
      ...prev,
      [id]: { element, id, text, parents, index: Object.keys(prev).length },
    }));
  };

  /**
   * Returns the nested level of a parent/activeSection
   */
  const getDepth = (id: string) => {
    return sectionList[id].parents.length - 1;
  };

  return {
    determineActiveSection,
    addSection,
    sectionList,
    activeSection,
    activeParents,
    setActiveParents,
    getDepth,
  };
}

export const TOCContainer = createContainer<
  ReturnType<typeof useTOCContext>,
  ProviderProps
>(useTOCContext);

export const TOCProvider = ({
  initialSection,
  range,
  children,
}: PropsWithChildren<ProviderProps>) => {
  return (
    <TOCContainer.Provider initialState={{ initialSection, range }}>
      <TOCChildrenWrapper parent="root">{children}</TOCChildrenWrapper>
    </TOCContainer.Provider>
  );
};
