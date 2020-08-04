import React from 'react';
import { TOCProvider, TOC, TOCEntry, TOCChildren } from '../src';

export default { title: 'TOC' };

export const withOnlyHeaders = () => (
  <TOCProvider initialSection="first">
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'fixed' }}>
        <TOC />
      </div>
      <div style={{ marginLeft: '200px' }}>
        <TOCEntry id="first" text="First">
          <div style={{ height: '500px' }}>
            <h1 style={{ background: 'red' }}>FIRST</h1>
          </div>
        </TOCEntry>
        <TOCChildren parent="first">
          <TOCEntry id="first-child" text="First - Child">
            <div style={{ height: '500px' }}>
              <h1 style={{ background: 'red' }}>FIRST - CHILD</h1>
            </div>
          </TOCEntry>
          <TOCChildren parent="first-child">
            <TOCEntry id="first-child-2" text="First - Child - Child">
              <div style={{ height: '500px' }}>
                <h1 style={{ background: 'red' }}>FIRST - CHILD - CHILD</h1>
              </div>
            </TOCEntry>
          </TOCChildren>
          <TOCEntry id="second" text="Second">
            <div style={{ height: '800px' }}>
              <h1 style={{ background: 'red' }}>SECOND</h1>
            </div>
          </TOCEntry>
        </TOCChildren>
        <TOCEntry id="last" text="Last">
          <div style={{ height: '800px' }}>
            <h1 style={{ background: 'red' }}>LAST</h1>
          </div>
        </TOCEntry>
      </div>
    </div>
  </TOCProvider>
);
