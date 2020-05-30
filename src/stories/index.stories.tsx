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
        <div style={{ height: '500px' }}>
          <TOCHeader id="first">
            <h1 style={{ background: 'red' }}>FIRST</h1>
          </TOCHeader>
        </div>
        <div style={{ height: '800px' }}>
          <TOCHeader id="second">
            <h1 style={{ background: 'red' }}>SECOND</h1>
          </TOCHeader>
        </div>
        <div style={{ height: '800px' }}>
          <TOCHeader id="last">
            <h1 style={{ background: 'red' }}>LAST</h1>
          </TOCHeader>
        </div>
      </div>
    </div>
  </TOCContext.Provider>
);
