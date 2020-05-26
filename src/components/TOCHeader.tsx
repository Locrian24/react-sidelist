import React, { PropsWithChildren, useRef } from 'react';
import useTOCHeader from '../hooks/useTOCHeader';

interface TOCHeaderProps {}

const TOCHeader: React.FC<PropsWithChildren<TOCHeaderProps>> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useTOCHeader(ref, { max: 80, min: 0 });

  return <div ref={ref}>{children}</div>;
};

export default TOCHeader;
