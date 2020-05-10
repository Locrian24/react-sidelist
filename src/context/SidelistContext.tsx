import * as React from 'react';
import { createContainer } from 'unstated-next';
import Section from '../containers/Section';
const _ = require('lodash');

function useActiveSections(initialSection = null) {
  const [activeSection, _setActiveSection] = React.useState<Section | null>(
    initialSection
  );
  const [activeSections, setActiveSections] = React.useState<Array<Section>>(
    []
  );

  const [activeParent, setActiveParent] = React.useState<string | null>(null);
  const [parentRefs, setParentRefs] = React.useState<Object>({});

  const [allSections, setAllSections] = React.useState<Array<Section>>([]);

  React.useEffect(() => {
    if (allSections.length == 0) return;

    const parentObj = allSections.reduce((nestedObj: any, section: Section) => {
      const parent = _.findLast(
        nestedObj,
        (_section: Section, _index: number) =>
          _section.nestedLevel === section.nestedLevel - 1
      );

      return parent
        ? {
            ...nestedObj,
            [parent.id]: {
              id: parent.id,
              nestedLevel: parent.nestedLevel,
              children: [...parent.children, section.id],
            },
            [section.id]: {
              parent: parent.id,
              ...section,
            },
          }
        : {
            ...nestedObj,
            [section.id]: section,
          };
    }, {});

    setParentRefs(parentObj);
  }, [allSections]);

  const isChildHidden = (id: string): boolean => {
    if (!activeSection) return true;
    if (parentRefs[id]?.nestedLevel === 0) return false;

    const isChild = parentRefs[activeSection.id]?.children.includes(id);
    const hasActiveParent = parentRefs[id]?.parent === activeParent;

    return !(isChild || hasActiveParent);
  };

  // Adds section to full list of sections
  const addToSections = (section: Section) => {
    if (!section.ref.current) return;
    if (_.find(activeSections, section)) return;

    setAllSections((prev) => [...prev, section]);
  };

  const setActiveSection = (section: Section): void => {
    const parent =
      section.nestedLevel === 0 ? section.id : parentRefs[section.id]?.parent;
    setActiveParent(parent);

    _setActiveSection(section);
  };

  // Adds active section to list of sections on the screen
  const addActiveSection = (section: Section) => {
    if (!section.ref.current) return;
    if (_.find(activeSections, section)) return;

    setActiveSections((prev) => [...prev, section]);
  };

  // Removes active section to list of sections on the screen
  const removeActiveSection = (section: Section) => {
    if (!section.ref.current) return;
    if (!_.find(activeSections, section)) return;

    const newSections = activeSections.filter((s) => s.ref !== section.ref);
    setActiveSections(newSections);
  };

  return {
    activeSection,
    parentRefs,
    setActiveSection,
    allSections,
    addToSections,
    activeSections,
    addActiveSection,
    removeActiveSection,
    isChildHidden,
  };
}

export const SidelistContext = createContainer(useActiveSections);
export const SidelistProvider: React.FC = ({ children }) => (
  <SidelistContext.Provider>{children}</SidelistContext.Provider>
);
