type Target = React.RefObject<HTMLElement>;

type Section = {
  element: React.RefObject<HTMLElement> | null;
  text: string;
  id: string;
  parents: string[];
};

type SectionList = {
  [id: string]: Section;
};

type SectionFrag = {
  id: string;
  text: string;
  ref: React.MutableRefObject<HTMLElement>;
  children: Array<string>;
};

type Root = {
  id: string;
  expand: () => void;
};
