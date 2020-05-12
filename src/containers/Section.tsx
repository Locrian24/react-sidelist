import * as React from 'react';
import { useSection } from '../hooks/useSection';

interface SectionProps {
  text: string;
  initial?: boolean;
  id?: string;
  wrapper?: boolean;
}

const Section: React.FC<SectionProps> = ({
  text,
  id = undefined,
  children,
}) => {
  let scrollRef = React.useRef() as React.MutableRefObject<HTMLElement>;

  const sectionId = React.useMemo(
    () => id || text.toLowerCase().split(' ').join('_'),
    [id, text]
  );

  useSection(scrollRef, { sectionId, text });

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
