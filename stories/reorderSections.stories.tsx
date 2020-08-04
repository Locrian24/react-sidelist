import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import TableOfContents, { TOC, TOCEntry } from '../src';

const SectionDiv = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
`;

export default { title: 'TOC - Re-ordering' };

export const WithReordering = () => {
  const [sections, setSections] = useState<Array<{ id: string; text: string }>>(
    [
      {
        id: 'start',
        text: 'Start',
      },
    ]
  );

  const addSiblingEntry = () => {
    setSections((prev: Array<{ id: string; text: string }>) => [
      ...prev,
      {
        id: uuidv4(),
        text: 'Something',
      },
    ]);
  };

  const Buttons = ({ id }: { id: string }) => (
    <div>
      <button type="button" onClick={addSiblingEntry}>
        Add Sibling
      </button>
      <button type="button" onClick={() => {}}>
        Add Child
      </button>
      <button type="button" onClick={() => {}}>
        Remove
      </button>
      <button type="button" onClick={() => {}}>
        Move up
      </button>
      <button type="button" onClick={() => {}}>
        Move down
      </button>
    </div>
  );

  return (
    <TableOfContents initialSection="1">
      <div style={{ display: 'flex' }}>
        <div style={{ position: 'fixed' }}>
          <TOC />
        </div>
      </div>
      <div style={{ marginLeft: '200px' }}>
        {sections.map(({ id, text }: { id: string; text: string }) => {
          return (
            <TOCEntry id={id} text={text}>
              <SectionDiv>
                <h1 style={{ marginRight: '32px' }}>{text}</h1>
                <Buttons id={id} />
              </SectionDiv>
            </TOCEntry>
          );
        })}
      </div>
    </TableOfContents>
  );
};
