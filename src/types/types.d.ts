type Target = React.RefObject<HTMLElement>;

type Section = {
  element: HTMLElement | null;
  id: string;
};

type SectionList = Array<Section>;

type SectionFrag = {
  id: string;
  text: string;
  ref: React.MutableRefObject<HTMLElement>;
  children: Array<string>;
};

interface Parents {
  [id: string]: Section;
}

interface ChildFrag {
  id: string;
  parent: string;
}

interface SectionObj {
  [id: string]: Section;
}

interface SidelistProviderProps {
  ListComponent?: any;
  showChildren?: boolean;
  initialId: string;
}
