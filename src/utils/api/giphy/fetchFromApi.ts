import { CardItem, GiphyResponse } from "../../../types";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const fetchFromApi = async <DataType>(
  url: string
): Promise<DataType> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchTrendingGifs = async (limit: number = 6) => {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}`;
  return fetchFromApi<{ data: CardItem[] }>(url);
};

export const fetchGifsBySearch = async (
  query: string,
  limit: number = 6,
  offset: number = 0
): Promise<CardItem[]> => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
    query
  )}
  &limit=${limit}&offset=${offset}&rating=G&lang=en`;
  try {
    const response = await fetchFromApi<GiphyResponse>(url);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch GIFs:
       ${error}`
    );
  }
};
