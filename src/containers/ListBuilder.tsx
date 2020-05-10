import * as React from 'react';
import TopLevelSection from '../components/TopLevelSection/TopLevelSection';
import { SidelistContext } from '../context/SidelistContext';

interface ListBuilderProps {}

const ListBuilder: React.FC<ListBuilderProps> = () => {
  const { allSections, children } = SidelistContext.useContainer();

  const sections = React.useMemo(() => {
    if (Object.keys(allSections).length == 0) return [];

    const parents = Object.keys(allSections)
      .map((key: string) => !children.includes(key) && allSections[key])
      .filter((parent: Section) => parent);

    return parents;
  }, [allSections, children]);

  return (
    <>
      {sections.map((section: Section, key: number) => (
        <TopLevelSection section={section} key={key} />
      ))}
    </>
  );
};

export default ListBuilder;
