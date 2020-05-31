import * as React from 'react';
import styled from 'styled-components';
import TOCContext from '../context/TOCContext';

// TODO: Remove styled component from library
const ListElement = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;

const TOC: React.FC = () => {
  const { activeSection, sectionList } = TOCContext.useContainer();
  if (sectionList.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {sectionList.map((section: Section) => (
        <ListElement key={section.id} isActive={activeSection === section.id}>
          {section?.text}
        </ListElement>
      ))}
    </div>
  );
};

export default TOC;
