
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Sparkles, ChevronRight, Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { findProfileMatches, ProfileMatchingResult } from "@/services/aiMatchingService";
import { toast } from "sonner";

interface MatchedProfile {
  id: string;
  name: string;
  avatar: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  matchResult: ProfileMatchingResult;
}

const mockProfiles = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    skillsToTeach: ["JavaScript", "React", "Node.js"],
    skillsToLearn: ["Python", "Data Science", "Machine Learning"],
  },
  {
    id: "user2",
    name: "Maya Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    skillsToTeach: ["Python", "Data Analysis", "SQL"],
    skillsToLearn: ["React", "UI Design", "JavaScript"],
  },
  {
    id: "user3",
    name: "Raj Patel",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    skillsToTeach: ["UX Design", "Figma", "UI Prototyping"],
    skillsToLearn: ["JavaScript", "React", "Front-end Development"],
  },
  {
    id: "user4",
    name: "Sophia Chen",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    skillsToTeach: ["Marketing", "SEO", "Content Strategy"],
    skillsToLearn: ["Data Analysis", "Python", "Excel Advanced"],
  },
];

const AIProfileMatcher: React.FC = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<MatchedProfile[]>([]);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [needsApiKey, setNeedsApiKey] = useState(true);

  // Simulate user skills and interests
  const userSkills = ["React", "JavaScript", "CSS"];
  const userInterests = ["Machine Learning", "UI/UX Design", "Data Science"];

  const handleFindMatches = async () => {
    if (needsApiKey && !apiKeyInput) {
      toast.error("Please enter your Gemini API key first");
      return;
    }
    
    setIsLoading(true);
    try {
      // In a real app, you would fetch potential matches from your database
      const matchResults = await findProfileMatches(
        userSkills,
        userInterests,
        mockProfiles
      );
      
      // Map the results to the profiles
      const matchedProfiles = mockProfiles
        .map(profile => ({
          ...profile,
          matchResult: matchResults[profile.id] || {
            matchScore: 0,
            matchReason: "No match data available",
            recommendedSkills: []
          }
        }))
        .sort((a, b) => b.matchResult.matchScore - a.matchResult.matchScore);
      
      setMatches(matchedProfiles);
      setNeedsApiKey(false);
    } catch (error) {
      console.error("Error finding matches:", error);
      toast.error("Failed to find matches");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-skill-purple" />
          AI Profile Matching
        </CardTitle>
        <CardDescription>
          Let Gemini AI find the perfect skill-swap partners for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        {needsApiKey ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              To use AI profile matching, you need to provide a Gemini API key. 
              Get one from Google AI Studio.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <ButtonCustom 
                variant="primary" 
                size="sm"
                disabled={isLoading || !apiKeyInput} 
                onClick={handleFindMatches}
              >
                {isLoading ? "Finding..." : "Find Matches"}
              </ButtonCustom>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Skills & Interests
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {userSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-skill-soft-purple text-skill-purple rounded-full">
                      {skill}
                    </span>
                  ))}
                  {userInterests.map((interest) => (
                    <span key={interest} className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <ButtonCustom
                variant="outline"
                size="sm"
                disabled={isLoading}
                onClick={handleFindMatches}
              >
                <Users className="h-4 w-4 mr-1" />
                Refresh Matches
              </ButtonCustom>
            </div>

            {isLoading ? (
              <div className="py-8 flex justify-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : matches.length > 0 ? (
              <div className="space-y-4">
                {matches.map((profile) => (
                  <div key={profile.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {profile.name}
                        </h4>
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium rounded-full">
                          {profile.matchResult.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {profile.matchResult.matchReason}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {profile.matchResult.recommendedSkills.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No matches found. Try adjusting your skills and interests.</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIProfileMatcher;
