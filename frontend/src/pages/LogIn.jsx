import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Email or password is missing");  
      return;
    }

    // Make the API call
    login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login </h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        placeholder="abc@gmail.com"
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        placeholder="password"
        required
      />
      <button disabled={isLoading}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LogIn;
