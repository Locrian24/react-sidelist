import * as React from 'react';
import { createContainer } from 'unstated-next';
const _ = require('lodash/core');

function useActiveSections(initialSection = null) {
  const [activeSection, setActiveSection] = React.useState<Section | null>(
    initialSection
  );
  const [allSections, setAllSections] = React.useState<Array<Section>>([]);
  const [activeSections, setActiveSections] = React.useState<Array<Section>>(
    []
  );

  // Adds section to full list of sections
  const addToSections = (section: Section) => {
    if (!section.ref.current) return;
    if (_.find(activeSections, section)) return;

    setAllSections((prev) => [...prev, section]);
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
    setActiveSection,
    allSections,
    addToSections,
    activeSections,
    addActiveSection,
    removeActiveSection,
  };
}

export const SidebarContext = createContainer(useActiveSections);
export const SidebarProvider: React.FC = ({ children }) => (
  <SidebarContext.Provider>{children}</SidebarContext.Provider>
);
