import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacter(url,query) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
            try {
                setIsLoading(true);
                const { data } = await axios.get(
                    `${url}=${query}`,
                    { signal }
                ); // signal key ve value are same so one of them is used

                setCharacters(data.results.slice(0, 5)); //slice to show the 5 character
            } catch (err) {
                if (axios.isCancel()) {
                    console.log("Cancel successfully");
                } else {
                    // console.log(err);
                    setCharacters([]); //dont show something
                    toast.error(err.response.data.error);
                }
            } finally {
                setIsLoading(false);
            }
        }

        // if we want nothgin on loading just show with search with more than 2 characters
        /*    if (query.length < 3) {
          setCharacters([]);
          return;
        } */
        fetchData();
        return () => {
            controller.abort();
        };
    }, [query]);


    return {
        isLoading
        , characters
    };
}