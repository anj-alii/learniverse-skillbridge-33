import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  format: 'video' | 'live' | 'chat' | '1-on-1' | 'group' | 'course' | 'materials';
  duration?: string;
  price: number;
  image?: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  is_active: boolean;
  created_at: string;
}

export async function getSkills() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        profiles:user_id (
          id,
          name,
          avatar
        )
      `);

    if (error) {
      throw error;
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      level: item.level,
      format: item.format,
      duration: item.duration,
      price: item.price || 1,
      image: item.image,
      instructor: {
        id: item.profiles?.id || item.user_id,
        name: item.profiles?.name || "Instructor",
        avatar: item.profiles?.avatar || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        rating: 4.5,
      },
      is_active: item.is_active,
      created_at: item.created_at,
    }));
  } catch (error: any) {
    console.error("Error loading skills:", error);
    toast.error("Failed to load skills");
    return [];
  }
}

export async function createSkill(skillData: Omit<Skill, 'id' | 'instructor' | 'is_active' | 'created_at'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('skills')
      .insert({
        title: skillData.title,
        description: skillData.description,
        category: skillData.category,
        level: skillData.level,
        format: skillData.format,
        duration: skillData.duration,
        price: skillData.price,
        image: skillData.image,
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error creating skill:", error);
    toast.error("Failed to create skill");
    throw error;
  }
}

export async function getRecommendedSkills(userId: string, interests: string[] = []) {
  try {
    const { data, error } = await supabase.functions.invoke('skill-recommender', {
      body: { userId, interests },
    });

    if (error) {
      throw error;
    }

    return data.recommendations;
  } catch (error: any) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}

export async function requestSession(skillId: string, instructorId: string, studentId: string) {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        skill_id: skillId,
        instructor_id: instructorId,
        student_id: studentId,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error requesting session:", error);
    toast.error("Failed to request session");
    throw error;
  }
}

export async function getUserSessions(userId: string) {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select(`
        *,
        skill:skill_id (
          title, 
          category,
          level
        ),
        instructor:instructor_id (
          name,
          avatar
        ),
        student:student_id (
          name,
          avatar
        )
      `)
      .or(`instructor_id.eq.${userId},student_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error loading sessions:", error);
    toast.error("Failed to load sessions");
    return [];
  }
}
