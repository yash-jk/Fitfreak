import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    // Validation: Ensure email and password are provided
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "Login failed. Please try again.");
      } else {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setIsLoading(false);
      setError("An error occurred during login.");
    }
  };

  return { login, error, isLoading };
};
