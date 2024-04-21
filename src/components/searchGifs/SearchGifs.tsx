import React, { useState, useEffect } from "react";
import Input from "../UI/input/Input";
import { searchIcon } from "../../assets/searchIcon";
import useDebounce from "../../utils/hooks/useDebounce";
import { fetchGifsBySearch } from "../../utils/api/giphy/fetchFromApi";
import { removeDuplicates } from "../../utils/functions/removeDuplicates";
import SearchGifsResults from "./SearchGifsResults";
import { CardItem } from "../../types";
import useLoading from "../../utils/hooks/useLoading";
import useError from "../../utils/hooks/useError";
import Alert from "../UI/alert/Alert";

const SearchGifs: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [gifs, setGifs] = useState<CardItem[]>([]);
  const [error, setError, resetError] = useError();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!debouncedSearch) return;

    const fetchData = async () => {
      startLoading();
      try {
        resetError();
        const fetchedGifs = await fetchGifsBySearch(debouncedSearch);
        const uniqueGifs = removeDuplicates(fetchedGifs, "id");
        setGifs(uniqueGifs);
      } catch (error) {
        setError(error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [debouncedSearch, resetError, setError, startLoading, stopLoading]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  if (error) return <Alert errorMessage={error.message} />;

  return (
    <div>
      <Input
        placeholder="Search GIFs..."
        icon={searchIcon}
        onChange={handleSearchChange}
      />
      <SearchGifsResults gifs={gifs} isLoading={isLoading} />
    </div>
  );
};

export default SearchGifs;
