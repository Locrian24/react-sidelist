import * as React from 'react';
import handleViewport from 'react-in-viewport';

interface SectionNewProps {
  intersecting: boolean;
  forwardedRef: React.MutableRefObject<any>;
}

const SectionNew: React.FC<SectionNewProps> = (props) => {
  const { inViewport, forwardedRef, children } = props;

  return (
    <div ref={forwardedRef} data-section>
      {children}
    </div>
  );
};

const SectionFrag = handleViewport(SectionNew);

const Section = (props) => {
  const { children } = props;
  return (
    <SectionFrag onEnterViewport={() => console.log('enter')}>
      {children}
    </SectionFrag>
  );
};

export default Section;
