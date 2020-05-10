import * as React from 'react';
import { SidelistContext } from '../context/SidelistContext';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

type SectionFrag = {
  text: string;
  nestedLevel: number;
  id: string;
  wrapper?: boolean;
};

export function useSection(
  ref: React.MutableRefObject<HTMLElement>,
  section: SectionFrag,
  initial: boolean
) {
  const [visible, setVisible] = React.useState<boolean>(false);

  const { addToSections, setActiveSection } = SidelistContext.useContainer();
  const { id, text } = section;

  React.useEffect(() => {
    if (!ref) return;

    const children =
      Array.from(ref.current.children)
        .filter((child: HTMLElement) => child.dataset.section)
        .map((section: HTMLElement) => section.id) || [];

    if (initial) setActiveSection(id);

    addToSections({
      id,
      ref,
      text,
      children,
    });
  }, [ref, id, text, initial]);

  React.useEffect(() => {
    visible && ref && setActiveSection(id);
  }, [visible, ref]);

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

  if (ref) {
    useScrollPosition(
      ({ currPos }) => {
        const divTop = currPos.y;
        const divBottom = currPos.y + ref?.current?.scrollHeight!;

        const active = isActive(divTop, divBottom);
        setVisible(active);
      },
      [window.innerHeight],
      ref
    );
  }
}
