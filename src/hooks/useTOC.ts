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
  } = TOCContainer.useContainer();

  const isSectionActive = (section: ExtendedSection) =>
    activeSection === section.id;

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

  return { sections, isSectionActive };
}

export default useTOC;
