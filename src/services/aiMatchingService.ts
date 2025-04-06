
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ProfileMatchingResult {
  matchScore: number;
  matchReason: string;
  recommendedSkills: string[];
}

// Initialize the Google AI with the API key
// In production, this should be stored in Supabase secrets
const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key or use environment variables

export const initializeGeminiAI = (apiKey: string = API_KEY) => {
  return new GoogleGenerativeAI(apiKey);
};

export const findProfileMatches = async (
  userSkills: string[],
  userInterests: string[],
  potentialMatches: Array<{ 
    id: string; 
    name: string; 
    skillsToTeach: string[]; 
    skillsToLearn: string[]; 
  }>
): Promise<Record<string, ProfileMatchingResult>> => {
  try {
    const genAI = initializeGeminiAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Format the user data and potential matches for the AI
    const userProfile = {
      skills: userSkills,
      interests: userInterests
    };

    // Create a prompt for the AI
    const prompt = `
      I have a user with the following skills and interests:
      Skills: ${userSkills.join(', ')}
      Interests: ${userInterests.join(', ')}
      
      I need to find the best matches among these potential profile matches:
      ${potentialMatches.map(match => `
        ID: ${match.id}
        Name: ${match.name}
        Skills to Teach: ${match.skillsToTeach.join(', ')}
        Skills to Learn: ${match.skillsToLearn.join(', ')}
      `).join('\n')}
      
      For each potential match, please provide:
      1. A match score from 0 to 100
      2. A brief reason for the match score
      3. A list of recommended skills they could exchange
      
      Format the response as a JSON object where keys are the IDs and values are objects with matchScore, matchReason, and recommendedSkills properties.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                      text.match(/{[\s\S]*}/);
                      
    if (jsonMatch) {
      try {
        const jsonText = jsonMatch[1] || jsonMatch[0];
        return JSON.parse(jsonText);
      } catch (e) {
        console.error("Error parsing JSON from AI response", e);
        return {};
      }
    }
    
    console.error("Could not extract JSON from AI response", text);
    return {};
  } catch (error) {
    console.error("Error finding profile matches with AI:", error);
    return {};
  }
};

export const getAISkillRecommendations = async (
  userSkills: string[],
  userInterests: string[]
): Promise<string[]> => {
  try {
    const genAI = initializeGeminiAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      I have a user with the following skills and interests:
      Skills: ${userSkills.join(', ')}
      Interests: ${userInterests.join(', ')}
      
      Based on these skills and interests, what are 5 new skills they might want to learn that would complement their existing abilities?
      
      Please provide the response as a JSON array of skill names.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                      text.match(/\[([\s\S]*?)\]/) ||
                      text.match(/{"skills":\s*\[([\s\S]*?)\]}/);
                      
    if (jsonMatch) {
      try {
        const jsonText = jsonMatch[1] ? `[${jsonMatch[1]}]` : jsonMatch[0];
        return JSON.parse(jsonText);
      } catch (e) {
        console.error("Error parsing JSON from AI response", e);
        return [];
      }
    }
    
    console.error("Could not extract JSON from AI response", text);
    return [];
  } catch (error) {
    console.error("Error getting AI skill recommendations:", error);
    return [];
  }
};
