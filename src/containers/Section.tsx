import * as React from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { SidebarContext } from '../context/SidebarContext';

interface SectionProps {
  name: string;
  initial?: boolean;
}

const Section: React.FC<SectionProps> = ({
  name,
  initial = false,
  children,
}) => {
  let scrollRef = React.useRef(null) as React.RefObject<HTMLDivElement> | null;
  const [visible, setVisible] = React.useState<boolean>(false);
  const {
    addToSections,
    activeSection,
    setActiveSection,
  } = SidebarContext.useContainer();

  if (scrollRef) {
    useScrollPosition(
      ({ currPos }) => {
        // const isVisible = currPos.y > 0 && currPos.y < window.innerHeight;
        const isVisible = currPos.y > 0 && currPos.y < 80;
        setVisible(isVisible);
      },
      [window.innerHeight],
      scrollRef
    );
  }

  React.useEffect(() => {
    if (!scrollRef) return;

    if (initial) setActiveSection({ ref: scrollRef, name });
    addToSections({ ref: scrollRef, name });
  }, []);

  React.useEffect(() => {
    visible &&
      scrollRef &&
      setActiveSection({ ref: scrollRef, name } as Section);
  }, [visible]);

  return <div ref={scrollRef}>{children}</div>;
};

export default Section;
