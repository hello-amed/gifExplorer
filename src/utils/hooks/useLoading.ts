import { useState, useCallback } from "react";

interface UseLoadingHook {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const useLoading = (): UseLoadingHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
