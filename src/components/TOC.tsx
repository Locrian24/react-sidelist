import * as React from 'react';
import styled from 'styled-components';
import useTOC, { ExtendedSection } from '../hooks/useTOC';

// TODO: Remove styled component from library
const ListElement = styled.div<{
  isActive: boolean;
  showChild: boolean;
  depth: number;
}>`
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
  ${({ showChild }) => !showChild && `display: none;`}
  ${({ depth }) =>
    depth &&
    `
    padding-left: ${15 * depth}px;
  `}
`;

const TOC: React.FC = () => {
  const { sections, isSectionActive } = useTOC();

  if (sections.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {sections.map((section: ExtendedSection) => (
        <ListElement
          key={section.id}
          isActive={isSectionActive(section)}
          showChild={section.show}
          depth={section.depth}
        >
          {section.text}
        </ListElement>
      ))}
    </div>
  );
};

export default TOC;
