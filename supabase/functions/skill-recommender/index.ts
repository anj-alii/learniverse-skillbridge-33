
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse request body
    const { userId, interests = [] } = await req.json()

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user's existing skills
    const { data: userSkills, error: userSkillsError } = await supabase
      .from('skills')
      .select('category, level')
      .eq('user_id', userId)

    if (userSkillsError) {
      console.error('Error fetching user skills:', userSkillsError)
    }

    // Get most popular skills for recommendation
    const { data: popularSkills, error: popularSkillsError } = await supabase
      .from('skills')
      .select('title, category, level, format, id')
      .eq('is_active', true)
      .limit(10)

    if (popularSkillsError) {
      throw popularSkillsError
    }

    // Simple recommendation algorithm - in a real system, this would be more complex
    const recommendations = popularSkills
      // Filter out skills the user already has expertise in
      .filter(skill => {
        if (!userSkills || userSkills.length === 0) return true
        
        // Check if user already has advanced knowledge in this category
        const hasAdvancedInCategory = userSkills.some(
          userSkill => userSkill.category === skill.category && userSkill.level === 'advanced'
        )
        
        return !hasAdvancedInCategory
      })
      // Prioritize skills matching user interests
      .sort((a, b) => {
        const aMatchesInterest = interests.includes(a.category)
        const bMatchesInterest = interests.includes(b.category)
        
        if (aMatchesInterest && !bMatchesInterest) return -1
        if (!aMatchesInterest && bMatchesInterest) return 1
        return 0
      })
      .slice(0, 5)

    return new Response(
      JSON.stringify({ 
        recommendations,
        message: 'Recommendations generated based on your profile and popular skills'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error in skill-recommender function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
