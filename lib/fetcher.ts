import useSWR from 'swr';

export const useFetcher = async (url: string, data: object, method:any=false) =>
  fetch(
    String(url).indexOf("http") == -1 ? window.location.origin + url : url,
    {
      method: method ? method : (data ? 'POST' : 'GET'),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((r) => r.json());


const fetcher = (...args) => fetch(...args).then(res => res.json())



export const getData = (url: string) => {
  const { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
