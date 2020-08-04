import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import ParentChildContext from '../context/ParentChildContext';
import useTOCChildren from '../hooks/useTOCChildren';

interface TOCChildrenProps {
  parent: string;
}

const TOCChildren: FC<PropsWithChildren<{}>> = ({ children }) => {
  useTOCChildren();

  return <div>{children}</div>;
};

const TOCChildrenWrapper: FC<TOCChildrenProps> = ({ parent, children }) => {
  let allParents = [parent];

  if (parent !== 'root') {
    const { parents } = ParentChildContext.useContainer();
    allParents = [...allParents, ...parents];
  }

  return (
    <ParentChildContext.Provider initialState={allParents}>
      <TOCChildren>{children}</TOCChildren>
    </ParentChildContext.Provider>
  );
};

export default TOCChildrenWrapper;
