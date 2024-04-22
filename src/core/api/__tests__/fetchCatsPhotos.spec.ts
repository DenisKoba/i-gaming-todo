import { fetchCatsPhotos } from '../fetchCatsPhotos';
import { get } from '../api';

jest.mock('../api', () => ({
  get: jest.fn(),
}));

describe('fetchBlogPost function', () => {
  it('should call get with correct arguments', async () => {
    await fetchCatsPhotos();
    expect(get).toHaveBeenCalledWith(
      '/v1/images/search?limit=10',
      {},
      'https://api.thecatapi.com'
    );
  });

  it('should return data from get function', async () => {
    const mockPosts = [
      {
        id: '1',
        url: 'title',
        width: '20px',
        height: '20px',
      },
    ];
    (get as jest.Mock).mockResolvedValueOnce(mockPosts);
    const widgets = await fetchCatsPhotos();
    expect(widgets).toEqual(mockPosts);
  });

  it('should throw an error if get function rejects', async () => {
    const errorMessage = 'Failed to fetch widgets';
    (get as jest.Mock).mockRejectedValueOnce(errorMessage);
    await expect(fetchCatsPhotos()).rejects.toEqual(errorMessage);
  });
});
