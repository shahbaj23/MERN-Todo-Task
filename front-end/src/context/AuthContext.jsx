import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const signup = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/register",
        formData
      );
       

      if(response.data){
        alert("Register Successfully")
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        formData
      );

      const data = response.data;

      localStorage.setItem("token", data.token);
      setToken(data.token);
      localStorage.setItem("user", data.username);

      return data;
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  console.log("S", username)

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout, token, username }}>
      {children}
    </AuthContext.Provider>
  );
};