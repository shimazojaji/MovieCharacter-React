import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create a context
const favoriteContext = createContext(null);

//  Create a provider component

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("FAVORITES", []);
  const addFavorite = (char) => {
    setFavorites((preFav) => [...preFav, char]);
  };
  const deleteFavorite = (id) => {
    setFavorites((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  return (
    <favoriteContext.Provider
      value={{ favorites, addFavorite, deleteFavorite }}
    >
      {children}
    </favoriteContext.Provider>
  );
};

export function useFavorite() {
    return useContext(favoriteContext);
  }