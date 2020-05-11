import * as React from 'react';
import { useSection } from '../hooks/useSection';

interface SectionProps {
  text: string;
  initial?: boolean;
  nestedLevel?: number;
  id: string;
  wrapper?: boolean;
}

const Section: React.FC<SectionProps> = ({
  text,
  nestedLevel = 0,
  id,
  children,
}) => {
  let scrollRef = React.useRef() as React.MutableRefObject<HTMLElement>;
  useSection(scrollRef, { id, text, nestedLevel });

  return (
    <div
      ref={scrollRef as React.RefObject<HTMLDivElement>}
      data-section
      id={id}
    >
      {children}
    </div>
  );
};

export default Section;
