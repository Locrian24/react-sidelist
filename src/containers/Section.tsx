import * as React from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { SidebarContext } from '../context/SidebarContext';

interface SectionProps {
  name: string;
  initial?: boolean;
  nestedLevel?: number;
}

const Section: React.FC<SectionProps> = ({
  name,
  initial = false,
  nestedLevel = 0,
  children,
}) => {
  let scrollRef = React.useRef(null) as React.RefObject<HTMLDivElement> | null;
  const [visible, setVisible] = React.useState<boolean>(false);
  const { addToSections, setActiveSection } = SidebarContext.useContainer();

  React.useEffect(() => {
    if (!scrollRef) return;

    if (initial) setActiveSection({ ref: scrollRef, nestedLevel, name });
    addToSections({ ref: scrollRef, nestedLevel, name });
  }, []);

  React.useEffect(() => {
    visible &&
      scrollRef &&
      setActiveSection({ ref: scrollRef, name } as Section);
  }, [visible]);

  function isActive(top: number, bottom: number): boolean {
    const topStatus = top < 80 ? (top > 0 ? 'in' : 'above') : 'below';
    const bottomStatus = bottom < 80 ? (bottom > 0 ? 'in' : 'above') : 'below';

    // Section is active if one of the following is true:
    // Top "in" - Bottom "above"
    // Top "above" - Bottom "in"
    // Top "below" - Bottom "above"

    const active = !(
      (topStatus == 'above' && bottomStatus == 'above') ||
      (topStatus == 'below' && bottomStatus == 'below')
    );

    return active;
  }

  if (scrollRef) {
    useScrollPosition(
      ({ currPos }) => {
        const divTop = currPos.y;
        const divBottom = currPos.y + scrollRef?.current?.scrollHeight!;

        const active = isActive(divTop, divBottom);
        setVisible(active);
      },
      [window.innerHeight],
      scrollRef
    );
  }

  return <div ref={scrollRef}>{children}</div>;
};

export default Section;
