import * as React from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { SidelistContext } from '../context/SidelistContext';

interface SectionProps {
  text: string;
  index: number;
  initial?: boolean;
  nestedLevel?: number;
  id: string;
}

const Section: React.FC<SectionProps> = ({
  text,
  initial = false,
  nestedLevel = 0,
  id,
  children,
}) => {
  let scrollRef = React.useRef(null) as React.RefObject<HTMLDivElement> | null;
  const [visible, setVisible] = React.useState<boolean>(false);
  const { addToSections, setActiveSection } = SidelistContext.useContainer();

  React.useEffect(() => {
    if (!scrollRef) return;

    if (initial)
      setActiveSection({
        id,
        ref: scrollRef,
        nestedLevel,
        text,
        children: [],
      });

    addToSections({
      id,
      ref: scrollRef,
      nestedLevel,
      text,
      children: [],
    });
  }, []);

  React.useEffect(() => {
    visible &&
      scrollRef &&
      setActiveSection({
        ref: scrollRef,
        text,
        id,
      } as Section);
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

  return (
    <div ref={scrollRef} id={id}>
      {children}
    </div>
  );
};

export default Section;
