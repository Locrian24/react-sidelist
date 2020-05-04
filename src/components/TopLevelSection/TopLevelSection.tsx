import * as React from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import styled from 'styled-components';
import StripeSection from '../custom/StripeSection';

const StyledBox = styled.div<{ active: boolean | null }>`
  /* border-left: ${({ active }) => (active ? '2px solid #ccc' : 'none')}; */
  ${({ active }) =>
    active &&
    `
    font-weight: bold;
  `}
`;

interface TopLevelSectionProps {
  section: Section;
}

const TopLevelSection: React.FC<TopLevelSectionProps> = ({ section }) => {
  const { activeSection } = SidebarContext.useContainer();
  const active = activeSection && activeSection.ref === section.ref;

  return (
    <StripeSection active={active!} nestedPadding={section.nestedLevel * 4}>
      {section.name}
    </StripeSection>
  );
};

export default TopLevelSection;
