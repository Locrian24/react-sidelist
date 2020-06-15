import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useParentChild(initialState = ['root']) {
  const parents = initialState;
  const [children, setChildren] = useState<Array<string>>([]);

  const addChild = (child: string) => {
    setChildren((prev) => [...(prev || []), child]);
  };

  const isParentOrChild = (id: string) =>
    [...parents, ...children].includes(id);

  return {
    children,
    addChild,
    parents,
    isParentOrChild,
  };
}

export default createContainer(useParentChild);
