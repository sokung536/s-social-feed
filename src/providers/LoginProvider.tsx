"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import letterS from "@/assets/letter-s.png";
import { Eye, EyeOff } from "lucide-react";

const USERNAME_STORAGE_KEY = "user_username";
const DEFAULT_USERNAME = "sss@example.com";

type LoginContextProps = {
  showLoginOverlay: () => void;
  showRegisterOverlay: () => void;
  hideLoginOverlay: () => void;
  isVisible: boolean;
  username: string;
  logout: () => void;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);
export const useLoginOverlay = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginOverlay must be used within a LoginProvider");
  }
  return context;
};

type AlertDialogProviderProps = {
  children: ReactNode;
};

export const LoginProvider = ({ children }: AlertDialogProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const storedUsername = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      localStorage.setItem(USERNAME_STORAGE_KEY, DEFAULT_USERNAME);
    }
  }, []);

  const showLoginOverlay = () => setIsVisible(true);
  const showRegisterOverlay = () => setIsVisible(true);
  const hideLoginOverlay = () => {
    setIsVisible(false);
    setLoginUsername("");
    setPassword("");
    setShowPassword(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save username to localStorage
    if (loginUsername.trim()) {
      const trimmedUsername = loginUsername.trim();
      localStorage.setItem(USERNAME_STORAGE_KEY, trimmedUsername);
      setUsername(trimmedUsername);
    }
    console.log("Login:", { username: loginUsername, password });
    hideLoginOverlay();
  };

  const logout = () => {
    localStorage.setItem(USERNAME_STORAGE_KEY, DEFAULT_USERNAME);
    setUsername(DEFAULT_USERNAME);
  };

  const value: LoginContextProps = {
    showLoginOverlay,
    showRegisterOverlay,
    hideLoginOverlay,
    isVisible,
    username,
    logout,
  };

  return (
    <LoginContext.Provider value={value}>
      {children}
      <Dialog
        open={isVisible}
        onOpenChange={(open) => !open && hideLoginOverlay()}
      >
        <DialogContent className={cn("sm:max-w-md")}>
          <DialogHeader>
            <Image
              src={letterS}
              alt="logo"
              width={50}
              height={50}
              className="object-contain mx-auto"
            />
            <DialogTitle className="text-center">login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <Button type="submit" className="w-full sm:w-auto min-w-[120px]">
                Login
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </LoginContext.Provider>
  );
};
