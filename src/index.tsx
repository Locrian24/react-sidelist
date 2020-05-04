import * as React from 'react';
import List from './components/List/List';
import Section from './containers/Section';
import styled from 'styled-components';

const GlobalStyles = styled.div`
  display: flex;
  height: 1200px;

  & * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Helvetica Neue', 'Ubuntu';
    -webkit-font-smoothing: antialiased;
  }
`;

import { SidebarProvider } from './context/SidebarContext';

const index: React.FC = () => {
  return (
    <GlobalStyles>
      <SidebarProvider>
        <List />
        <div style={{ marginLeft: '250px' }}>
          {'Hello my name is Bruce Wayne'.split(' ').map((word, index) => (
            <Section name={word} initial={index === 0} key={index}>
              <div style={{ height: '250px' }}>
                <h1>{word}</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  aperiam impedit perspiciatis nemo illum magni rerum tempore
                  sequi ipsum. Provident eos sapiente quaerat, aliquid
                  exercitationem repellendus necessitatibus explicabo culpa
                  corporis?
                </p>
              </div>
            </Section>
          ))}
        </div>
      </SidebarProvider>
    </GlobalStyles>
  );
};

export default index;
