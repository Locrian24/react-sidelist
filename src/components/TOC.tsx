import * as React from 'react';
import styled from 'styled-components';
import { TOCContainer } from '../context/TOCContext';

// TODO: Remove styled component from library
const ListElement = styled.div<{ isActive: boolean; showChild: boolean }>`
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
  ${({ showChild }) => !showChild && `display: none;`}
`;

const TOC: React.FC = () => {
  const {
    activeSection,
    sectionList,
    activeParents,
  } = TOCContainer.useContainer();
  if (sectionList.length === 0) return <div>Loading...</div>;

  console.log('activeParents', activeParents);

  return (
    <div>
      {Object.keys(sectionList).map((key: string) => {
        const section = sectionList[key];

        return (
          <ListElement
            key={sectionList[key].id}
            isActive={activeSection === section.id}
            showChild={activeParents.includes(section.parent)}
          >
            {section?.text}
          </ListElement>
        );
      })}
    </div>
  );
};

export default TOC;
