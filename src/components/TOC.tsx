import * as React from 'react';
import styled from 'styled-components';
import TOCContext from '../context/TOCContext';

const ListElement = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;

interface TOCProps {}

const TOC: React.FC<TOCProps> = ({}) => {
  const { activeSection, sectionList } = TOCContext.useContainer();
  if (sectionList.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {sectionList.map((section: Section) => (
        <ListElement key={section.id} isActive={activeSection === section.id}>
          {section?.element?.innerText}
        </ListElement>
      ))}
    </div>
  );
};

export default TOC;
