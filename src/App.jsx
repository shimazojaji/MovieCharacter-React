import "./App.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { FavoriteProvider } from "./context/FavoriteContex";
import { SelectItemProvider } from "./context/SelectedItemContex";
import useCharacter from "./hooks/useCharacter";
import { useState } from "react";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import { CharDetailModalProvider } from "./context/CharacterModalContext";

function App() {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacter(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );

  return (
    <div>
      <Toaster />
      <CharDetailModalProvider>
        <FavoriteProvider>
          <SelectItemProvider>
            <Navbar query={query} setQuery={setQuery} characters={characters} />
            <Main>
              <CharacterList characters={characters} isLoading={isLoading} />
              <CharecterDetail />
            </Main>
          </SelectItemProvider>
        </FavoriteProvider>
      </CharDetailModalProvider>
    </div>
  );
}

export default App;
function Main({ children }) {
  return <div className="main">{children}</div>;
}
