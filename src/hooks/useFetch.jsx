import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, {signal: abortController.signal, headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem("Bearer "),
      },} )
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(err.message);
          setIsPending(false);
        }
      });

    return () => console.log(abortController.abort());
  }, [url]);

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;
