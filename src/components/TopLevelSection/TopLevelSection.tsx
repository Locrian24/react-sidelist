import * as React from 'react';
import { SidelistContext } from '../../context/SidelistContext';
import StripeSection from '../custom/StripeSection';
import { ListElement } from '../ListElement';

interface TopLevelSectionProps {
  section: Section;
}

const TopLevelSection: React.FC<TopLevelSectionProps> = ({ section }) => {
  const { activeParent, allSections } = SidelistContext.useContainer();

  return (
    <>
      <ListElement section={section} ElementComponent={StripeSection} />
      {activeParent === section.id &&
        section.children.map((child: string, key: number) => {
          return (
            <ListElement
              section={allSections[child]}
              ElementComponent={StripeSection}
              isChild={true}
              key={key}
            />
          );
        })}
    </>
  );
};

export default TopLevelSection;
