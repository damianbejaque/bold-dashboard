import { useEffect, useState } from "react";

interface Data<U> {
  url: string;
  transformation: (data: unknown) => U[];
}

interface UseData<T> {
  data: T[];
  isLoading: boolean;
  error: unknown;
}

const useData = <T,>({ url, transformation }: Data<T>): UseData<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setData(transformation(data.data)))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [url, transformation]);

  return { data, isLoading, error };
};

export default useData;
