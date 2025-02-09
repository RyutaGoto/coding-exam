export const fetcher = async <T>(
  url: string,
  headers?: HeadersInit
): Promise<T> => fetch(url, { headers: headers }).then((res) => res.json());
