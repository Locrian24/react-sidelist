import * as React from 'react';
import styled from 'styled-components';
import ListBuilder from '../../containers/ListBuilder';

const StyledList = styled.div`
  background: #fff;
  width: 250px;
  height: 700px;
  position: fixed;
`;

const List: React.FC = () => {
  return (
    <StyledList>
      <ListBuilder />
    </StyledList>
  );
};

export default List;
