import React, { PropsWithChildren, useRef } from 'react';
import useTOCHeader from '../hooks/useTOCHeader';

interface TOCHeaderProps {
  id: string;
}

const TOCHeader: React.FC<PropsWithChildren<TOCHeaderProps>> = ({
  id,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useTOCHeader(ref, id);

  return <div ref={ref}>{children}</div>;
};

export default TOCHeader;
