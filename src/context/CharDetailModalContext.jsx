import { createContext, useContext, useState } from "react";

// Create a context
const charDetialModalContext = createContext(null);

//  Create a provider component

export const CharDetailModalProvider = ({ children }) => {
  const [isOpenCharModal, setOpenCharModal] = useState(false);
  // const setCharModal= () => {
  //     setOpenCharModal((prev) => (!prev));
  // };

  return (
    <charDetialModalContext.Provider
      value={{ isOpenCharModal, setOpenCharModal }}
    >
      {children}
    </charDetialModalContext.Provider>
  );
};

export function useCharDetailModal() {
  return useContext(charDetialModalContext);
}
