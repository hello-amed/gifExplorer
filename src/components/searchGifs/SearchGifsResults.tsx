import React from "react";
import { CardItem } from "../../types";
import Card from "../UI/card/Card";
import SkeletonLoader from "../UI/skeleton/Skeleton";
import Alert from "../UI/alert/Alert";
import { useGifState } from "../../utils/hooks/useGifState";
import { useGifDispatch } from "../../utils/hooks/useGifDispatch";

interface SearchGifsResultsProps {
  gifs: CardItem[];
  error?: string | null;
  isLoading?: boolean;
}

const SearchGifsResults: React.FC<SearchGifsResultsProps> = ({
  gifs,
  error,
  isLoading,
}) => {
  const { savedGifs } = useGifState();
  const dispatch = useGifDispatch();

  const handleSaveGif = (gif: CardItem) => dispatch({ type: "ADD_GIF", gif });
  const handleUnsaveGif = (id: string) => dispatch({ type: "REMOVE_GIF", id });

  const isGifSaved = (id: string) =>
    savedGifs.some((savedGif) => savedGif.id === id);

  if (error) {
    return <Alert errorMessage={error} />;
  }

  if (isLoading) {
    return (
      <SkeletonLoader count={gifs.length ?? 6} width="w-40" height="h-40" />
    );
  }

  return (
    <div className="card-wrapper">
      <h1>Search GIFs</h1>
      {gifs.length === 0 ? (
        <div className="no-results">
          <h2>Start typing to see more GIFs 👆🏼</h2>
        </div>
      ) : (
        <div className="card-gallery">
          {gifs.map((gif) => (
            <Card
              key={gif.id}
              cardItem={gif}
              onSave={() => handleSaveGif(gif)}
              onUnsave={() => handleUnsaveGif(gif.id)}
              isSaved={isGifSaved(gif.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchGifsResults;
