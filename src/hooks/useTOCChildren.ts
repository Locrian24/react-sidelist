import { useEffect } from 'react';
import ParentChildContext from '../context/ParentChildContext';
import { TOCContainer } from '../context/TOCContext';

function useTOCChildren() {
  const { parents, isParentOrChild } = ParentChildContext.useContainer();
  const { activeSection, setActiveParents } = TOCContainer.useContainer();

  useEffect(() => {
    const expand = isParentOrChild(activeSection);
    if (expand) {
      setActiveParents([...parents, activeSection]);
    }
  }, [activeSection, isParentOrChild, parents, setActiveParents]);
}

export default useTOCChildren;
