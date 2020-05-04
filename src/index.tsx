import * as React from 'react';
import List from './components/List/List';
import Section from './containers/Section';

import { SidebarProvider } from './context/SidebarContext';

const index: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '1200px' }}>
      <SidebarProvider>
        <List />
        <div style={{ marginLeft: '250px' }}>
          {'Hello my name is Bruce Wayne'.split(' ').map((word, index) => (
            <React.Fragment key={index}>
              <Section name={word} initial={index === 0} key={index}>
                <h1>{word}</h1>
              </Section>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                aperiam impedit perspiciatis nemo illum magni rerum tempore
                sequi ipsum. Provident eos sapiente quaerat, aliquid
                exercitationem repellendus necessitatibus explicabo culpa
                corporis?
              </p>
            </React.Fragment>
          ))}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default index;
