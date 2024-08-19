import { useEffect, useState } from "react";

const useFetch = (URL) => {
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(null)
  const [title, setTitle] = useState("Loading...")
  const [sessionToken, setSessionToken] = useState(null)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        const newCharacters = data.characters.map(c => ({ ...c, isFound: false }));
        setCharacters(newCharacters);
        setImageURL(data.url);
        
        setLoading(false);
        setGameStartTime(Date.now());
        setTitle(data.title)
        setSessionToken(data.sessionToken)

      } catch (err) {
        console.error(`Error fetching items:`, err);
        setError(err);
        setLoading(false)
      } 
    };
    fetchData();
  }, [URL]);

  

  const updateCharactersFound = (name) => {
    
    
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === name ? { ...char, isFound: true} : char
      )
    );    


  };

 

  return { imageURL, isLoading, error, updateCharactersFound, characters, gameStartTime, title, sessionToken };
};

export default useFetch;
