import * as React from 'react';
import useTOC, { ExtendedSection } from '../hooks/useTOC';

const TOC: React.FC = () => {
  const { sections, isSectionActive } = useTOC();

  if (sections.length === 0) return <div>Loading...</div>;

  const styles = (section: ExtendedSection) => ({
    color: isSectionActive(section) ? 'red' : 'black',
    ...(section.show ? {} : { display: 'none' }),
    paddingLeft: `${15 * section.depth}px`,
  });

  return (
    <div>
      {sections.map((section: ExtendedSection) => (
        <div key={section.id}>
          <span style={styles(section)}>{section.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TOC;
