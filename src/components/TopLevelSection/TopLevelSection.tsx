import * as React from 'react';
import { SidebarContext } from '../../context/SidebarContext';

interface TopLevelSectionProps {
  section: Section;
}

const TopLevelSection: React.FC<TopLevelSectionProps> = ({ section }) => {
  const { activeSection } = SidebarContext.useContainer();

  return (
    <div
      style={{
        background:
          activeSection && activeSection.ref === section.ref ? 'red' : 'black',
        fontSize: '16px',
      }}
    >
      {section.name}
    </div>
  );
};

export default TopLevelSection;
