import * as React from 'react';

interface GroupContainerProps {}

export const GroupContainer: React.FC<GroupContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};
