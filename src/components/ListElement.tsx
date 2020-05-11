import * as React from 'react';
import styled from 'styled-components';
import { SidelistContext } from '../context/SidelistContext';

interface ListElementProps {
  section: Section;
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
  isChild = false,
}) => {
  const {
    setActiveSection,
    activeSection,
    activeParent,
    ListComponent,
  } = SidelistContext.useContainer();

  const active = activeSection
    ? activeSection.id === section.id
    : activeParent == section.id;

  return (
    <Link href={`#${section.id}`} onClick={() => setActiveSection(section.id)}>
      <ListComponent
        data-section
        active={active!}
        nestedPadding={isChild ? 32 : 16}
      >
        {section.text}
      </ListComponent>
    </Link>
  );
};
