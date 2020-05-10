import * as React from 'react';
import styled from 'styled-components';
import { SidelistContext } from '../context/SidelistContext';

interface ListElementProps {
  section: Section;
  ElementComponent: any;
  isChild?: boolean;
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
    color: inherit;
  }
`;

export const ListElement: React.FC<ListElementProps> = ({
  section,
  ElementComponent,
  isChild = false,
}) => {
  const {
    setActiveSection,
    activeSection,
    activeParent,
  } = SidelistContext.useContainer();

  const active = activeSection
    ? activeSection.id === section.id
    : activeParent == section.id;

  return (
    <Link href={`#${section.id}`} onClick={() => setActiveSection(section.id)}>
      <ElementComponent
        data-section
        active={active!}
        nestedPadding={isChild ? 32 : 16}
      >
        {section.text}
      </ElementComponent>
    </Link>
  );
};
