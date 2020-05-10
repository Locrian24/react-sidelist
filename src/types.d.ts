type Section = {
  id: string;
  text: string;
  nestedLevel: number;
  ref: React.RefObject<HTMLDivElement>;
  children: Array<string>;
  parent?: string | null;
};

interface Parents {
  [id: string]: Section;
}
