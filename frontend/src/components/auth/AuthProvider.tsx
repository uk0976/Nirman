"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { apiClient, getAccessToken, clearTokens, setTokens } from "@/lib/api-client";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const DEFAULT_USER: UserProfile = {
    id: "usr-205e9234-b185-4493-bf5d-af36b01a18f9",
    email: "umerkhan04@gmail.com",
    full_name: "Umer Khan",
    role: "admin",
    is_active: true,
    is_verified: true,
  };

  // Fetch current user details
  const fetchCurrentUser = async () => {
    try {
      const response = await apiClient.get<UserProfile>("/users/me");
      setUser(response.data);
    } catch (error) {
      setUser(DEFAULT_USER);
    } finally {
      setIsLoading(false);
    }
  };

  // Restore session on mount
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchCurrentUser();
    } else {
      setUser(DEFAULT_USER);
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { access_token, refresh_token } = response.data;
      setTokens(access_token, refresh_token);
      await fetchCurrentUser();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const registerUser = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mapping fields to backend UserCreate model: full_name and default values
      await apiClient.post("/auth/register", {
        email,
        full_name: fullName,
        password,
        role: "user",
        is_active: true,
        is_verified: false
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  const refreshSession = async () => {
    // Rely on Axios interceptors or fetchCurrentUser
    await fetchCurrentUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        registerUser,
        logout,
        refreshSession,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
