const endpoint = `${window.location.origin}`;

export const mapSuccessResponseData = (resp: Response) => resp.json();

export const get = <T>(
  url: string,
  options?: unknown,
  customEndpoint?: string
): Promise<T> =>
  fetch((customEndpoint || endpoint) + url)
    .then(mapSuccessResponseData)
    .catch((error) => console.log(error));
