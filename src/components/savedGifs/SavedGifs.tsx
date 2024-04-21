import React from "react";
import Card from "../UI/card/Card";
import { useGifState } from "../../utils/hooks/useGifState";
import { useGifDispatch } from "../../utils/hooks/useGifDispatch";

const SavedGifs: React.FC = () => {
  const { savedGifs } = useGifState();
  const dispatch = useGifDispatch();

  const handleUnsaveGif = (id: string) => {
    dispatch({ type: "REMOVE_GIF", id });
  };

  const renderNoResults = () => (
    <div className="no-results">
      <h2>No GIFs saved yet 🙃</h2>
    </div>
  );

  const renderGifCards = () => (
    <div className="card-gallery">
      {savedGifs.map((gif) => (
        <Card
          key={gif.id}
          cardItem={gif}
          onUnsave={() => handleUnsaveGif(gif.id)}
          isSaved={true}
        />
      ))}
    </div>
  );

  return (
    <div className="card-wrapper">
      <h1>Saved GIFs</h1>
      {savedGifs.length === 0 ? renderNoResults() : renderGifCards()}
    </div>
  );
};

export default SavedGifs;
