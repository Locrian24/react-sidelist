import * as React from 'react';
import { SidelistContext } from '../../context/SidelistContext';
import { ListElement } from '../ListElement';

interface TopLevelSectionProps {
  section: Section;
}

const TopLevelSection: React.FC<TopLevelSectionProps> = ({ section }) => {
  const {
    activeParent,
    allSections,
    showChildren,
  } = SidelistContext.useContainer();

  return (
    <>
      <ListElement section={section} />
      {(activeParent === section.id || showChildren) &&
        section.children.map((child: string, key: number) => {
          return (
            <ListElement
              section={allSections[child]}
              isChild={true}
              key={key}
            />
          );
        })}
    </>
  );
};

export default TopLevelSection;
