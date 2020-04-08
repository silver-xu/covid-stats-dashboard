import React from 'react';

export interface Item {
  key: string;
  parent?: string;
}

export interface MenuContextProps {
  item: Item;
  selectItem: (key: Item) => void;
}

export const MenuContext = React.createContext<MenuContextProps>({
  item: { key: 'Global' },
  selectItem: () => {},
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [key, setKey] = React.useState<Item>({ key: 'Global' });

  return (
    <MenuContext.Provider
      value={{
        item: key,
        selectItem: (key: Item) => {
          setKey(key);
        },
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
