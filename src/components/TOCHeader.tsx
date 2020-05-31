import React, { PropsWithChildren, useRef } from 'react';
import useTOCHeader from '../hooks/useTOCHeader';

interface TOCHeaderProps {
  id: string;
  text: string;
  parent?: string;
}

/**
 * Defines a region on the website as part of the table of contents list
 * @param id Unique identifier for TOC List to reference the element
 * @param text The text to display on the TOC list
 * @param parent (Optional) The unique id of the parent TOCSection. Treats this section as a child if set
 */
const TOCHeader: React.FC<PropsWithChildren<TOCHeaderProps>> = ({
  id,
  text,
  parent = null,
  children,
}) => {
  const element = useRef<HTMLDivElement>(null);
  const section = { id, text, parent, element };

  useTOCHeader(section);

  return <div ref={element}>{children}</div>;
};

export default TOCHeader;
