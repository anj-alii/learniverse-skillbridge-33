
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "sonner";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useUser } from "@/contexts/UserContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login, register } = useUser();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === "login") {
        await login(email, password);
        toast.success("Successfully signed in!");
      } else {
        await register(name, email, password);
        toast.success("Account created successfully!");
      }
      onClose();
      navigate("/dashboard");
    } catch (error) {
      toast.error(activeTab === "login" 
        ? "Failed to sign in. Please check your credentials." 
        : "Failed to create account."
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="glass-card relative bg-white dark:bg-gray-900 max-w-md w-full p-6 rounded-2xl shadow-xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-skill-purple to-skill-vivid-purple flex items-center justify-center">
              <span className="font-semibold text-white text-xs">S</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {activeTab === "login" ? "Welcome back" : "Join SkillSwap"}
            </h2>
          </div>
          
          <div className="flex rounded-lg overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
            <button
              className={`flex-1 py-2 text-center text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-skill-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium transition-all ${
                activeTab === "register"
                  ? "bg-skill-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Create Account
            </button>
          </div>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {activeTab === "register" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-skill-purple focus:border-skill-purple bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-skill-purple focus:border-skill-purple bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-skill-purple focus:border-skill-purple bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder={activeTab === "login" ? "Enter your password" : "Create a password"}
              required
            />
          </div>
          
          {activeTab === "login" && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-skill-purple hover:underline">
                Forgot password?
              </a>
            </div>
          )}
          
          <ButtonCustom
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? "Processing..." 
              : (activeTab === "login" ? "Sign In" : "Create Account")
            }
          </ButtonCustom>
        </form>
        
        <div className="mt-6">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              className="inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skill-purple"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.72 17.56V20.34H19.22C21.22 18.51 22.56 15.64 22.56 12.25Z" fill="#4285F4" />
                <path d="M12 23C14.97 23 17.46 22.02 19.22 20.34L15.72 17.56C14.74 18.21 13.48 18.59 12 18.59C9.24 18.59 6.91 16.73 6.01 14.2H2.39V17.07C4.14 20.62 7.79 23 12 23Z" fill="#34A853" />
                <path d="M6.01 14.2C5.79 13.54 5.67 12.84 5.67 12.12C5.67 11.4 5.79 10.7 6.01 10.04V7.17H2.39C1.67 8.67 1.25 10.35 1.25 12.12C1.25 13.89 1.67 15.57 2.39 17.07L6.01 14.2Z" fill="#FBBC05" />
                <path d="M12 5.65C13.54 5.65 14.93 6.16 16.03 7.22L19.12 4.13C17.46 2.59 14.97 1.62 12 1.62C7.79 1.62 4.14 4 2.39 7.55L6.01 10.42C6.91 7.89 9.24 5.65 12 5.65Z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-skill-purple"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#1877F2" />
                <path d="M16 15H13V21.95C18.05 21.45 22 17.19 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15Z" fill="#1877F2" />
                <path d="M13 21.95V15H16L16.5 12H13V10C13 9.45 13.45 9 14 9H16V6H13.5C11.57 6 10 7.57 10 9.5V12H8V15H10V21.8C10.64 21.93 11.31 22 12 22C12.35 22 12.68 21.98 13 21.95Z" fill="#FFFFFF" />
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
