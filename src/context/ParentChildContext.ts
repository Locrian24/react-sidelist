import { RefObject, useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

type Child = {
  id: string;
  ref: RefObject<HTMLElement>;
  // isRoot: boolean; // Flag for recursive expansion
};

type Active = {
  active: boolean;
  id: string;
};

function useParentChild(initialState = 'root') {
  const [parent] = useState<string>(initialState);
  const [children, setChildren] = useState<Array<string>>([]);
  const [expand, setExpand] = useState<boolean>(false);

  const addChild = (child: string) => {
    setChildren((prev) => [...(prev || []), child]);
  };

  const isParentOrChild = (id: string) => {
    setExpand([parent, ...children].includes(id));
  };

  return {
    children,
    addChild,
    parent,
    isParentOrChild,
    expand,
  };
}

export default createContainer(useParentChild);
