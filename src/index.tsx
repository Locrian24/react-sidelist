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

import { SidelistProvider } from './context/SidelistContext';

const index: React.FC = () => {
  return (
    <GlobalStyles>
      <SidelistProvider>
        <List />
        <div style={{ marginLeft: '250px' }}>
          {'Hello my name'.split(' ').map((word, index) => (
            <Section
              text={word}
              initial={index === 0}
              nestedLevel={index === 0 ? 0 : Math.round(Math.random())}
              key={index}
              id={word.toLowerCase().split(' ').join('_')}
              index={index}
            >
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
          {'is Bruce Wayne,yes it, is'.split(',').map((word, index) => (
            <Section
              text={word}
              nestedLevel={Math.round(Math.random())}
              key={index}
              id={word.toLowerCase().split(' ').join('_')}
              index={index}
            >
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
      </SidelistProvider>
    </GlobalStyles>
  );
};

export default index;
