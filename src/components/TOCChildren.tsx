import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import ParentChildContext from '../context/ParentChildContext';
import useTOCChildren from '../hooks/useTOCChildren';

interface TOCChildrenProps {
  parent: string;
}

const TOCChildren: FC<PropsWithChildren<{}>> = ({ children }) => {
  useTOCChildren();

  return <>{children}</>;
};

const TOCChildrenWrapper: FC<TOCChildrenProps> = ({ parent, children }) => {
  return (
    <ParentChildContext.Provider initialState={parent}>
      <TOCChildren>{children}</TOCChildren>
    </ParentChildContext.Provider>
  );
};

export default TOCChildrenWrapper;
