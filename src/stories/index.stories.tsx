import React from 'react';
import TOCHeader from '../components/TOCHeader';
import TOCContext from '../context/TOCContext';
import TOC from '../components/TOC';

export default { title: 'TOC' };

export const withOnlyHeaders = () => (
  <TOCContext.Provider initialState="first">
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'fixed' }}>
        <TOC />
      </div>
      <div style={{ marginLeft: '70px' }}>
        <TOCHeader id="first" text="First">
          <div style={{ height: '500px' }}>
            <h1 style={{ background: 'red' }}>FIRST</h1>
          </div>
        </TOCHeader>
        <TOCHeader id="second" text="Second">
          <div style={{ height: '800px' }}>
            <h1 style={{ background: 'red' }}>SECOND</h1>
          </div>
        </TOCHeader>
        <TOCHeader id="last" text="Last">
          <div style={{ height: '800px' }}>
            <h1 style={{ background: 'red' }}>LAST</h1>
          </div>
        </TOCHeader>
      </div>
    </div>
  </TOCContext.Provider>
);
