import { useState, useEffect } from "react";
import { getEpisodes } from "../services/api";

const useEpisodes = (page = 1, filters = {}) => {
  const [data, setData] = useState({ results: [], info: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getEpisodes(page, filters);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, JSON.stringify(filters)]);

  return { data, loading, error };
};

export default useEpisodes;
