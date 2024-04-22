export interface CardItem {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
    };
  };
}

export interface GiphyResponse {
  data: CardItem[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

export interface FetchParams {
  limit: number;
  offset: number;
  query?: string;
}
