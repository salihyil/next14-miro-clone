import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutatiton = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    setPending(true);
    return await apiMutatiton(payload)
      .then((response) => {
        return response;
      })
      .finally(() => setPending(false))
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    mutate,
    pending,
  };
};
