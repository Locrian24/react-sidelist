type Target = React.RefObject<HTMLElement>;

type Section = {
  element: React.RefObject<HTMLElement> | null;
  text: string;
  parent: string | null;
  id: string;
};

type SectionList = Array<Section>;

type SectionFrag = {
  id: string;
  text: string;
  ref: React.MutableRefObject<HTMLElement>;
  children: Array<string>;
};
