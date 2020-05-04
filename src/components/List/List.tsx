import * as React from 'react';
import styled from 'styled-components';
import { SidebarContext } from '../../context/SidebarContext';
import ListBuilder from '../../containers/ListBuilder';

const StyledList = styled.div`
  background: lightgrey;
  width: 250px;
  height: 700px;
  position: fixed;
`;

const List: React.FC = () => {
  const { allSections } = SidebarContext.useContainer();

  return (
    <StyledList>
      {allSections && <ListBuilder sections={allSections} />}
    </StyledList>
  );
};

export default List;
