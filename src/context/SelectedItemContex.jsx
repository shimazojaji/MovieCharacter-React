import { createContext, useContext, useState } from "react";

// Create a context
const itemContext = createContext(null);

//  Create a provider component

export const SelectItemProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);
  const selectCharacter = (id) => {
    if (id === null) setSelectedId(null);
    else setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <itemContext.Provider value={{ selectedId, selectCharacter }}>
      {children}
    </itemContext.Provider>
  );
};

export function useSelectedItem() {
  return useContext(itemContext);
}
