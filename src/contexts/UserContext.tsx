
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Define user type
interface UserType {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  credits: number;
}

// Define context type
interface UserContextType {
  user: UserType | null;
  isLoading: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  useCredit: () => Promise<boolean>;
  addCredit: (amount: number) => Promise<void>;
  showUploadSkillPrompt: () => void;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  session: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  useCredit: async () => false,
  addCredit: async () => {},
  showUploadSkillPrompt: () => {},
});

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          fetchUserProfile(currentSession.user.id);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      } else if (data) {
        setUser({
          id: data.id,
          name: data.name || "User",
          email: data.email || "",
          avatar: data.avatar,
          credits: data.credits || 0,
        });
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;
      
      // Add 10 default credits to new user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ credits: 10 })
          .eq('id', data.user.id);
        
        if (profileError) {
          console.error("Error adding default credits:", profileError);
        }
      }
      
      toast.success("Account created with 10 starter credits! Verify your email if required.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Failed to sign out");
    }
  };

  // Show prompt to upload a skill when credits are depleted
  const showUploadSkillPrompt = () => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Out of credits?</p>
        <p>Share your skills to earn more credits! Upload a skill you can teach to receive credits.</p>
        <a 
          href="/account" 
          className="text-skill-purple hover:underline font-medium"
        >
          Go to Account → My Skills → Add New Skill
        </a>
      </div>,
      {
        duration: 8000,
      }
    );
  };

  // Use a credit
  const useCredit = async () => {
    if (!user) return false;
    
    if (user.credits <= 0) {
      showUploadSkillPrompt();
      return false;
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ credits: user.credits - 1 })
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setUser({
          ...user,
          credits: data.credits,
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error using credit:", error);
      toast.error("Failed to use credit");
      return false;
    }
  };

  // Add credits
  const addCredit = async (amount: number) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ credits: user.credits + amount })
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setUser({
          ...user,
          credits: data.credits,
        });
        toast.success(`Added ${amount} credits!`);
      }
    } catch (error) {
      console.error("Error adding credits:", error);
      toast.error("Failed to add credits");
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      session,
      login, 
      register, 
      logout,
      useCredit,
      addCredit,
      showUploadSkillPrompt
    }}>
      {children}
    </UserContext.Provider>
  );
};
