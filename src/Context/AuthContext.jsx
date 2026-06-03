import { createContext, useEffect, useState,useContext } from "react";
const AuthContext = createContext();

function getStoredUsers() {
  const stored = localStorage.getItem("users");
  return stored ? JSON.parse(stored) : [];
}

function setStoredUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getStoredCurrentUser() {
  const stored = localStorage.getItem("currentUser");
  return stored ? JSON.parse(stored) : null;
}

function setStoredCurrentUser(user) {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getStoredCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  function signup(email, password) {
    const users = getStoredUsers();
    const exists = users.some(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (exists) {
      throw new Error("Email already registered. Please log in instead.");
    }

    const newUser = { email, password };
    users.push(newUser);
    setStoredUsers(users);
    setStoredCurrentUser(newUser);
    setUser(newUser);
    return newUser;
  }

  function login(email, password) {
    const users = getStoredUsers();
    const existing = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (!existing) {
      throw new Error("No account found for this email.");
    }

    if (existing.password !== password) {
      throw new Error("Incorrect password.");
    }

    setStoredCurrentUser(existing);
    setUser(existing);
    return existing;
  }

  function logout() {
    setStoredCurrentUser(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isAuthenticated: Boolean(user) }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  return context
   
}
 