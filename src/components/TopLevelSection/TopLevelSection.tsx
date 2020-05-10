import * as React from 'react';
import { SidelistContext } from '../../context/SidelistContext';
import styled from 'styled-components';
import StripeSection from '../custom/StripeSection';

const Link = styled.a`
  /* border-left: ${({ active }) => (active ? '2px solid #ccc' : 'none')}; */
  text-decoration: none;
  color: inherit;
  :hover {
    color: inherit;
  }
`;

interface TopLevelSectionProps {
  section: Section;
}

const TopLevelSection: React.FC<TopLevelSectionProps> = ({ section }) => {
  const {
    activeSection,
    setActiveSection,
    isChildHidden,
    parentRefs,
  } = SidelistContext.useContainer();
  const [isHidden, setIsHidden] = React.useState<boolean>(
    section.nestedLevel !== 0
  );
  const active = activeSection && activeSection.ref === section.ref;

  React.useEffect(() => {
    if (section.nestedLevel == 0) return;

    const hidden = isChildHidden(section.id);
    setIsHidden(hidden);
  }, [activeSection, parentRefs]);
  if (isHidden) return <></>;

  return (
    <Link href={`#${section.id}`} onClick={() => setActiveSection(section)}>
      <StripeSection
        data-section
        active={active!}
        nestedPadding={section.nestedLevel * 16 + 16}
      >
        {section.text}
      </StripeSection>
    </Link>
  );
};

export default TopLevelSection;
