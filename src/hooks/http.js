import { useReducer, useCallback } from "react";

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: false };
    case "RESPONSE":
      return {
        ...curHttpState,
        loading: false,
        responseData: action.responseData,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Shold not be reached");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    responseData: null,
  });

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
        /* setIsLoading(false); */
        /*  setUserIngredients(prevIngredients => 
            prevIngredients.filter(ing => ing.id !== ingredientId)
          ) */
        // dispatch({ type: "DELETE", id: ingredientId });
      })
      .then((responseData) => {
        dispatchHttp({ type: "RESPONSE", responseData });
      })
      .catch((err) => {
        /* setError("Something went wrong"); */
        dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong" });
      });
  }, []);

  return {
    isLoading: httpState.isLoading,
    error: httpState.error,
    data: httpState.responseData,
    sendRequest: sendRequest,
  };
};

export default useHttp;
