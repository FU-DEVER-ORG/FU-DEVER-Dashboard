export type MenuItem = {
  key: string;
  label: string;
  onClick?: () => void;
};

export type SubMenuItem = MenuItem & {
  children?: MenuItem[];
};

export type SideBarItems = {
  label: string;
  icon: JSX.Element;
  items: MenuItem[];
};
