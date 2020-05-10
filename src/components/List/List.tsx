import * as React from 'react';
import styled from 'styled-components';
import { SidelistContext } from '../../context/SidelistContext';
import ListBuilder from '../../containers/ListBuilder';

const StyledList = styled.div`
  background: #fff;
  width: 250px;
  height: 700px;
  position: fixed;
`;

const List: React.FC = () => {
  const { allSections } = SidelistContext.useContainer();

  return (
    <StyledList>
      {allSections && <ListBuilder sections={allSections} />}
    </StyledList>
  );
};

export default List;
