import React, { PropsWithChildren, useRef } from 'react';
import useTOCEntry from '../hooks/useTOCEntry';

interface TOCEntryProps {
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
const TOCEntry: React.FC<PropsWithChildren<TOCEntryProps>> = ({
  id,
  text,
  children,
}) => {
  const element = useRef<HTMLDivElement>(null);
  const section = { id, text };

  useTOCEntry(element, section);

  return <div ref={element}>{children}</div>;
};

export default TOCEntry;
