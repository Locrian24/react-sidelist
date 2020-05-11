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
import StripeSection from './components/custom/StripeSection';

const index: React.FC = () => {
  return (
    <GlobalStyles>
      <SidelistProvider
        ListComponent={StripeSection}
        showChildren={false}
        initialId={'hello'}
      >
        <List />
        <div style={{ marginLeft: '250px' }}>
          {'Hello my name'.split(' ').map((word, index) => (
            <Section
              text={word}
              initial={index === 0}
              key={index}
              id={word.toLowerCase().split(' ').join('_')}
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
          <Section text="Wrapper" nestedLevel={0} id="wrapper" wrapper={true}>
            <div style={{ height: '200px' }}>
              <h1>WRAPPER</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                aperiam impedit perspiciatis nemo illum magni rerum tempore
                sequi ipsum. Provident eos sapiente quaerat, aliquid
                exercitationem repellendus necessitatibus explicabo culpa
                corporis?
              </p>
            </div>
            {'is Bruce Wayne,yes it, is'.split(',').map((word, index) => (
              <Section
                text={word}
                key={index}
                id={word.toLowerCase().split(' ').join('_')}
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
          </Section>
        </div>
      </SidelistProvider>
    </GlobalStyles>
  );
};

export default index;
