import { useEffect, useState } from "react";

const useFetch = (URL) => {
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setCharacters(
          data.characters.map((c) => ({
            ...c,
            isFound: false,
          }))
        );
        console.log(data)
        setImageURL(data.url);
      } catch (err) {
        console.error(`Error fetching items:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [URL]);

  const updateCharactersFound = (name) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === name ? { ...char, isFound: true } : char
      )
    );
  };

  return { imageURL, isLoading, error, updateCharactersFound, characters };
};

export default useFetch;
