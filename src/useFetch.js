import { useEffect, useState } from "react";

//custom hook
const useFetch = (url) => {
  //useState hook returns two values in array
  //first is the initial value passed to this hook
  //second is the function used to change the value of first variable with the argument passed to the function
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  //useEffect will be executed every time a component renders
  //it will be executed every time component loads or data inside component changes
  //if you pass [item] as second argument , useEffect will run only when the component loads or when the item in array changes

  useEffect(() => {
    //instance of AbortController
    const abortCont = new AbortController();

    setTimeout(() => {
      //fetch the data
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
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
    }, 1000);

    //stop the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
