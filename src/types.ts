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
