import React, { useState, useEffect } from "react";
import { CardItem } from "../../types";
import { fetchTrendingGifs } from "../../utils/api/giphy/fetchFromApi";
import { removeDuplicates } from "../../utils/functions/removeDuplicates";
import SkeletonLoader from "../UI/skeleton/Skeleton";
import Alert from "../UI/alert/Alert";
import Card from "../UI/card/Card";
import useLoading from "../../utils/hooks/useLoading";
import useError from "../../utils/hooks/useError";
import { useGifState } from "../../utils/hooks/useGifState";
import { useGifDispatch } from "../../utils/hooks/useGifDispatch";
import LoadMore from "../loadMore/LoadMore";

const TrendingGifs: React.FC = () => {
  const [gifs, setGifs] = useState<CardItem[]>([]);
  const [error, setError, resetError] = useError();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { savedGifs } = useGifState();
  const dispatch = useGifDispatch();
  const INCREMENT_GIFS = 3;
  const INITIAL_OFFSET = 6;
  const MAX_GIFS = 12;

  useEffect(() => {
    const loadTrendingGifs = async () => {
      startLoading();
      try {
        resetError();
        const responseData = await fetchTrendingGifs({});
        const uniqueGifs = removeDuplicates(responseData.data, "id");
        setGifs(uniqueGifs);
      } catch (error) {
        setError(error);
      } finally {
        stopLoading();
      }
    };

    loadTrendingGifs();
  }, [startLoading, stopLoading, resetError, setError]);

  const handleSaveGif = (gif: CardItem) => dispatch({ type: "ADD_GIF", gif });
  const handleUnsaveGif = (id: string) => dispatch({ type: "REMOVE_GIF", id });

  const isGifSaved = (id: string) =>
    savedGifs.some((savedGif) => savedGif.id === id);

  if (isLoading) return <SkeletonLoader count={gifs.length ?? 6} />;
  if (error) return <Alert errorMessage={error.message} />;

  return (
    <div className="card-wrapper">
      <h1>Trending GIFs</h1>
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
      <div className="card-footer">
        <LoadMore
          fetchFunction={fetchTrendingGifs}
          updateParentState={setGifs}
          initialOffset={INITIAL_OFFSET}
          increment={INCREMENT_GIFS}
          maxCount={MAX_GIFS}
        />
      </div>
    </div>
  );
};

export default TrendingGifs;
