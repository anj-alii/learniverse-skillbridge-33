
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  credits: number; // Add credits to the user type
}

// Define context type
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  useCredit: () => boolean; // Add new function to use credits
  addCredit: (amount: number) => void; // Add new function to add credits
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  useCredit: () => false,
  addCredit: () => {},
});

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("skillswap_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data (in a real app, this would come from your backend)
      const mockUser: User = {
        id: "user-1",
        name: email.split('@')[0], // Use part of email as name for demo
        email,
        credits: 5 // Default 5 credits when user logs in
      };
      
      setUser(mockUser);
      localStorage.setItem("skillswap_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const mockUser: User = {
        id: "user-" + Date.now(),
        name,
        email,
        credits: 5 // Default 5 credits for new users
      };
      
      setUser(mockUser);
      localStorage.setItem("skillswap_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillswap_user");
  };

  // Use a credit
  const useCredit = () => {
    if (!user || user.credits <= 0) return false;
    
    const updatedUser = {
      ...user,
      credits: user.credits - 1
    };
    
    setUser(updatedUser);
    localStorage.setItem("skillswap_user", JSON.stringify(updatedUser));
    return true;
  };

  // Add credits
  const addCredit = (amount: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      credits: user.credits + amount
    };
    
    setUser(updatedUser);
    localStorage.setItem("skillswap_user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout,
      useCredit,
      addCredit
    }}>
      {children}
    </UserContext.Provider>
  );
};
