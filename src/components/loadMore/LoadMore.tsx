import React, { useState, useCallback } from "react";
import useLoading from "../../utils/hooks/useLoading";
import Alert from "../UI/alert/Alert";
import Button from "../UI/button/Button";
import { CardItem, FetchParams } from "../../types";

interface LoadMoreProps {
  fetchFunction: (params: FetchParams) => Promise<{ data: CardItem[] }>;
  updateParentState: (
    updateFunction: (prevItems: CardItem[]) => CardItem[]
  ) => void;
  initialOffset?: number;
  increment?: number;
  maxCount?: number;
  parameters?: FetchParams;
}

const LoadMore: React.FC<LoadMoreProps> = ({
  fetchFunction,
  updateParentState,
  initialOffset = 6,
  increment = 6,
  maxCount = 12,
  parameters = {},
}) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [offset, setOffset] = useState(initialOffset);
  const [totalLoaded, setTotalLoaded] = useState(initialOffset);
  const [error, setError] = useState<string | null>(null);

  const loadMoreData = useCallback(async () => {
    if (totalLoaded >= maxCount || isLoading) return;

    startLoading();
    setError(null);

    const itemsToLoad = Math.min(maxCount - totalLoaded, increment);
    if (itemsToLoad <= 0) {
      stopLoading();
      return;
    }

    const fullParams: FetchParams = {
      ...parameters,
      limit: itemsToLoad,
      offset,
    };
    try {
      const { data } = await fetchFunction(fullParams);
      updateParentState((prevItems) => [...prevItems, ...data]);
      setOffset((prevOffset) => prevOffset + itemsToLoad);
      setTotalLoaded((prevTotal) => prevTotal + data.length);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      stopLoading();
    }
  }, [
    fetchFunction,
    increment,
    offset,
    parameters,
    updateParentState,
    maxCount,
    totalLoaded,
    isLoading,
    startLoading,
    stopLoading,
  ]);

  if (error) return <Alert errorMessage={error} />;
  return (
    <div>
      <Button
        onClick={loadMoreData}
        className={isLoading || totalLoaded >= maxCount ? "btn-disabled" : ""}
        disabled={isLoading || totalLoaded >= maxCount}
      >
        {isLoading ? "Loading..." : "Show More"}
      </Button>
    </div>
  );
};

export default LoadMore;
