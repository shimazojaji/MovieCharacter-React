import "./App.css";
import { useEffect, useState } from "react";
import useCharacters from "./hooks/useCharacters";
// import { allCharacters } from "../data/data";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar, { Search, SearchResult, Favourites } from "./components/Navbar";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

// import axios from "axios";

function App() {
  
  const [query, setQuery] = useState("");
  const {isLoading,characters}=useCharacters("https://rickandmortyapi.com/api/character?name",query);
  const [selectedId, setSelectedId] = useState(null);
  const [favourites,setFavourites]=useLocalStorage("FAVORITES",[]);
  

// useEffect(()=>{
// localStorage.setItem("FAVORITES",JSON.stringify(favourites));
// },[favourites])


  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourites((preFav) => [...preFav, char]);
  };

  const handleDeleteFavourite=(id)=>{
    setFavourites((preFav)=> preFav.filter((fav)=>fav.id!==id))
  }

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites favourites={favourites} onDeleteFavourite={handleDeleteFavourite}/>
      </Navbar>

      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectorCharacter={handleSelectCharacter}
        />

        <CharecterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;
function Main({ children }) {
  return <div className="main">{children}</div>;
}
