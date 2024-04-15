interface SubMenuItem {
    key: string;
    label: string;
    onClick: () => void; 
  }
  
  interface MenuItem {
    key: string;
    icon?: JSX.Element;
    label: string;
    children?: SubMenuItem[];
  }
  
  interface NavBarItems {
    [key: string]: {
      label: string;
      icon : JSX.Element;
      items: {
        [key: string]: string;
      };
    };
  }
  