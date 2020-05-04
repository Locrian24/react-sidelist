import * as React from 'react';
import TopLevelSection from '../components/TopLevelSection/TopLevelSection';

interface ListBuilderProps {
  sections: Array<Section>;
}

const ListBuilder: React.FC<ListBuilderProps> = ({ sections }) => (
  <>
    {sections.map((section, key) => (
      <TopLevelSection section={section} key={key} />
    ))}
  </>
);

export default ListBuilder;
