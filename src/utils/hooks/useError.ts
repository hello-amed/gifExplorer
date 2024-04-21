import { useState, useCallback } from "react";

type UseErrorReturnType = [
  error: Error | null,
  setError: (event: unknown) => void,
  resetError: () => void
];

const useError = (): UseErrorReturnType => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((event: unknown) => {
    if (event instanceof Error) {
      setError(event);
    } else {
      setError(new Error(String(event) || "An unknown error occurred"));
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return [error, handleError, resetError];
};

export default useError;
