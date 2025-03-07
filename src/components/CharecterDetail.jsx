import { useEffect } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Modal from "./Modal";
import { useSelectedItem } from "../context/SelectedItemContex";
import { useFavorite } from "../context/FavoriteContex";
import { useCharDetailModal } from "../context/CharacterModalContext";

function CharecterDetail() {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [windowWidth, setWindowWidth] = useState(1024);
  const { selectedId } = useSelectedItem();
  const { favorites, addFavorite } = useFavorite();
  const isAddToFavourite = favorites.map((fav) => fav.id).includes(selectedId);
  const { isOpenCharModal, setOpenCharModal } = useCharDetailModal();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        // if (data.episode.length > 1) {
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat().slice(0, 6)); //for convertion object to array
        // }

        // setCharacters(data.results.slice(0, 5)); //slice to show the 5 character
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (isLoading)
    return (
      <>
        {windowWidth >= 480 ? (
          <div style={{ flex: 1 }}>
            <Loader />
          </div>
        ) : (
          <Modal
            onOpen={setOpenCharModal}
            open={isOpenCharModal}
            title="Character details"
            type="custom"
          >
            <Loader />
          </Modal>
        )}
      </>
    );

  if (!character || !selectedId)
    return <div className="characters-message">Please select a character.</div>;

  return (
    <>
      {windowWidth >= 480 ? (
        <div className="characters-detail">
          <CharacterSubInfo
            character={character}
            isAddToFavourite={isAddToFavourite}
            onAddFavourite={addFavorite}
          />
          <EpisodeList episodes={episodes} />
        </div>
      ) : (
        <Modal
          onOpen={setOpenCharModal}
          open={isOpenCharModal}
          title="Character details"
          type="custom"
        >
          <CharacterSubInfo
            character={character}
            isAddToFavourite={isAddToFavourite}
            onAddFavourite={addFavorite}
          />
          <EpisodeList episodes={episodes} />
        </Modal>
      )}
    </>
  );
}

export default CharecterDetail;

export function CharacterSubInfo({
  character,
  isAddToFavourite,
  onAddFavourite,
}) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩‍🦰"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span>-{character.species}</span>
        </div>

        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourite ? (
            <p>Already Added To Favourite ✅</p>
          ) : (
            <button
              onClick={() => onAddFavourite(character)}
              className="btn btn--primary"
            >
              Add to Favourits
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function EpisodeList({ episodes }) {
  const [sortBy, setSortby] = useState(true);
  let sortedEpisode;
  if (sortBy) {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSortby((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisode.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} {item.episode}:{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
