import { get } from './api';

export type CatImage = {
  id: string;
  url: string;
  width: string;
  height: string;
};

export const fetchCatsPhotos = (limit: number = 10): Promise<CatImage[]> => {
  return get<CatImage[]>(`/v1/images/search?limit=${limit}`, {}, 'https://api.thecatapi.com');
};
