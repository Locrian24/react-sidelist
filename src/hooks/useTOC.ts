import { useMemo } from 'react';
import { TOCContainer } from '../context/TOCContext';

export interface ExtendedSection extends Section {
  depth: number;
  show: boolean;
}

// TODO: Friendly API for rendering list of sections
function useTOC() {
  const {
    activeSection,
    sectionList,
    activeParents,
    getDepth,
  }: {
    [key: string]: any;
    sectionList: SectionList;
  } = TOCContainer.useContainer();

  const isSectionActive = (section: ExtendedSection) =>
    activeSection === section.id;

  const activeSectionIndex = useMemo(
    () => sectionList[activeSection]?.index ?? -1,
    [sectionList, activeSection]
  );

  const sections = useMemo(() => {
    return Object.keys(sectionList).reduce(
      (prev: Array<ExtendedSection>, key: string) => {
        return [
          ...prev,
          {
            ...sectionList[key],
            depth: getDepth(key),
            show: activeParents.includes(sectionList[key].parents[0]),
          },
        ];
      },
      []
    );
  }, [sectionList, activeParents, getDepth]);

  return {
    sections,
    sectionList,
    isSectionActive,
    activeSection,
    activeSectionIndex,
  };
}

export default useTOC;
