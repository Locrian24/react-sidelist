import React from 'react';
import TOCHeader from '../components/TOCHeader';

export default { title: 'TOC' };

export const withOnlyHeaders = () => (
  <div>
    <div style={{ height: '500px' }}>
      <TOCHeader>
        <h1 style={{ background: 'red' }}>FIRST</h1>
      </TOCHeader>
    </div>
    <div style={{ height: '800px' }}>
      <TOCHeader>
        <h1 style={{ background: 'red' }}>Yes</h1>
      </TOCHeader>
    </div>
  </div>
);
