import { useState, useCallback } from "react";
import { gql } from 'graphql-request';

const useGraphQLRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(async (mutation: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(import.meta.env.VITE_GRAPHQ_SERVER, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          query: gql`${mutation}`,
        }),
      });

      const data = await response.json();

      setLoading(false);
      return data.data;
    } catch (error: Error | any) {
      setLoading(false);
      setError(error);
      throw new Error(`GraphQL request failed: ${(error).message}`);
    }
  }, []);

  return { loading, error, sendRequest };
};

export default useGraphQLRequest;
