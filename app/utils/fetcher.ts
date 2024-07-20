export const fetcher = async (url: string, ...args: RequestInit[]): Promise<any> => {
    const response = await fetch(url, ...args);
    const data = await response.json();
    return data;
  };
  