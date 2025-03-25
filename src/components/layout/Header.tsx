
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Search, LogOut, Settings } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";
import AuthModal from "@/components/auth/AuthModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  const routes = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  // Add Dashboard route for authenticated users
  if (user) {
    routes.push({ name: "Dashboard", path: "/dashboard" });
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 lg:px-20",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-skill-purple to-skill-vivid-purple flex items-center justify-center">
            <span className="font-semibold text-white">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Skill<span className="text-skill-purple">Swap</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "relative py-2 text-base link-hover",
                location.pathname === route.path
                  ? "font-medium text-skill-purple"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ButtonCustom variant="ghost" size="sm" className="rounded-full p-2">
            <Search className="w-5 h-5" />
          </ButtonCustom>
          
          {user ? (
            <div className="flex items-center gap-3 relative">
              <div 
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-7 h-7 rounded-full bg-skill-purple flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              
              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-2">
                    <Link 
                      to="/dashboard" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link 
                      to="/account" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <ButtonCustom 
                variant="outline" 
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In
              </ButtonCustom>
              <ButtonCustom 
                variant="primary" 
                size="sm"
                onClick={() => {
                  setIsAuthModalOpen(true);
                }}
              >
                Join SkillSwap
              </ButtonCustom>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col gap-1.5 items-end"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block h-0.5 bg-gray-900 dark:bg-white transition-all duration-300",
                isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
              )}
            />
            <span
              className={cn(
                "block h-0.5 bg-gray-900 dark:bg-white transition-all duration-300",
                isMobileMenuOpen ? "opacity-0" : "w-4"
              )}
            />
            <span
              className={cn(
                "block h-0.5 bg-gray-900 dark:bg-white transition-all duration-300",
                isMobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-5"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out z-40 border-b border-gray-200 dark:border-gray-800",
          isMobileMenuOpen
            ? "top-16 opacity-100 visible"
            : "top-0 opacity-0 invisible"
        )}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "text-lg py-2",
                  location.pathname === route.path
                    ? "font-medium text-skill-purple"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-skill-purple flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <ButtonCustom 
                  variant="outline" 
                  size="md" 
                  className="w-full"
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </ButtonCustom>
                <ButtonCustom 
                  variant="outline" 
                  size="md" 
                  className="w-full"
                  onClick={() => {
                    navigate("/account");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </ButtonCustom>
                <ButtonCustom 
                  variant="outline" 
                  size="md" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </ButtonCustom>
              </>
            ) : (
              <>
                <ButtonCustom 
                  variant="outline" 
                  size="md" 
                  className="w-full"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In
                </ButtonCustom>
                <ButtonCustom 
                  variant="primary" 
                  size="md" 
                  className="w-full"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Join SkillSwap
                </ButtonCustom>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
