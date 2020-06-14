import { useEffect } from 'react';
import ParentChildContext from '../context/ParentChildContext';
import { TOCContainer } from '../context/TOCContext';

function useTOCChildren() {
  const { parent, isParentOrChild, expand } = ParentChildContext.useContainer();
  const {
    activeSection,
    aggregateParents,
    setActiveParents,
  } = TOCContainer.useContainer();

  // TODO: Check if parent is a child in it's own context -> nested parent
  useEffect(() => {
    isParentOrChild(activeSection);
  }, [activeSection, isParentOrChild]);

  useEffect(() => {
    if (expand) {
      const activeParents = aggregateParents(activeSection);
      setActiveParents(activeParents);
    }
  }, [expand, activeSection, setActiveParents, aggregateParents]);
}

export default useTOCChildren;
