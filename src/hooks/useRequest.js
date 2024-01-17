import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const activeApiRequest = useRef([]);

  const callEndpoint = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const apiAbortController = new AbortController();
      activeApiRequest.current.push(apiAbortController);
      try {
        const userData = JSON.parse(localStorage.getItem("usersInfo"));
        let accessToken = userData?.accessToken;
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: apiAbortController.signal,
        });

        const responseData = await response.json();
        activeApiRequest.current = activeApiRequest.current.filter(
          (item) => item !== apiAbortController
        );
        setIsLoading(false);

        if (!response?.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeApiRequest.current.forEach((item) => item.abort());
    };
  }, []);

  const clearError = () => {
    setError(null);
  };
  return { callEndpoint, isLoading, error, clearError };
};

export default useRequest;
