import * as React from 'react';
import { createContainer } from 'unstated-next';

function useSections(initialSection = null) {
  const [activeSection, _setActiveSection] = React.useState<Section | null>(
    initialSection
  );
  const [activeParent, setActiveParent] = React.useState<string | null>(null);
  const [allSections, setAllSections] = React.useState<SectionObj>({});
  const [children, setChildren] = React.useState<Array<string>>([]);

  // Adds section to full list of sections
  const addToSections = (section: SectionFrag) => {
    if (!section.ref.current) return;
    if (Object.keys(allSections).includes(section.id)) return;

    // Add children to children array
    setChildren((prevChildren) => [...prevChildren, ...section.children]);

    // Update all sections
    setAllSections((prev) => ({
      ...prev,
      [section.id]: {
        ...section,
        depth: 0,
      },
    }));
  };

  const setActiveSection = (id: string): void => {
    const isChild = children.includes(id);
    const section = allSections[id] || null;

    if (!isChild) setActiveParent(id);

    _setActiveSection(section);
  };

  return {
    activeSection,
    allSections,
    activeParent,
    setActiveSection,
    addToSections,
    children,
  };
}

export const SidelistContext = createContainer(useSections);

export const SidelistProvider: React.FC = ({ children }) => (
  <SidelistContext.Provider>{children}</SidelistContext.Provider>
);
