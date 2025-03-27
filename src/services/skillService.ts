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

const sampleSkills: Skill[] = [
  {
    id: "sample-1",
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript, including variables, data types, functions, and control flow. This course is perfect for beginners who want to start their coding journey.",
    category: "Programming",
    level: "beginner",
    format: "video",
    duration: "4 weeks",
    price: 1,
    image: "https://source.unsplash.com/photo-1488590528505-98d2b5aba04b",
    instructor: {
      id: "instructor-1",
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.8,
    },
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-2",
    title: "Responsive Web Design",
    description: "Master the art of creating websites that look great on any device. Learn about CSS grid, flexbox, media queries, and modern layout techniques.",
    category: "Design",
    level: "intermediate",
    format: "course",
    duration: "6 weeks",
    price: 2,
    image: "https://source.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    instructor: {
      id: "instructor-2",
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.9,
    },
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-3",
    title: "Digital Marketing Strategy",
    description: "Develop comprehensive digital marketing strategies to grow your business online. Covers SEO, social media, content marketing, and analytics.",
    category: "Marketing",
    level: "advanced",
    format: "1-on-1",
    duration: "Custom",
    price: 3,
    image: "https://source.unsplash.com/photo-1649972904349-6e44c42644a7",
    instructor: {
      id: "instructor-3",
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 4.7,
    },
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-4",
    title: "Spanish for Beginners",
    description: "Start speaking Spanish from day one with this practical, conversation-focused course designed for complete beginners.",
    category: "Language",
    level: "beginner",
    format: "group",
    duration: "8 weeks",
    price: 1,
    image: "https://source.unsplash.com/photo-1581091226825-a6a2a5aee158",
    instructor: {
      id: "instructor-4",
      name: "Carlos Mendez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.6,
    },
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-5",
    title: "Advanced React Patterns",
    description: "Take your React skills to the next level by learning advanced patterns, performance optimization, and state management.",
    category: "Programming",
    level: "advanced",
    format: "live",
    duration: "5 weeks",
    price: 2,
    image: "https://source.unsplash.com/photo-1461749280684-dccba630e2f6",
    instructor: {
      id: "instructor-5",
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      rating: 4.9,
    },
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-6",
    title: "Piano for Beginners",
    description: "Learn to play the piano with no prior experience. Covers reading music, finger technique, and basic songs to get you started.",
    category: "Music",
    level: "beginner",
    format: "video",
    duration: "12 weeks",
    price: 1,
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    instructor: {
      id: "instructor-6",
      name: "Sophia Kim",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      rating: 4.8,
    },
    is_active: true,
    created_at: new Date().toISOString(),
  }
];

export async function getSkills() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*');

    if (error) {
      throw error;
    }

    const mappedData = data.map((item: any) => ({
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
        id: item.user_id,
        name: "Instructor",
        avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        rating: 4.5,
      },
      is_active: item.is_active ?? true,
      created_at: item.created_at,
    }));

    if (mappedData.length === 0) {
      console.log("No skills found in database, returning sample skills");
      return sampleSkills;
    }

    return mappedData;
  } catch (error: any) {
    console.error("Error loading skills:", error);
    toast.error("Failed to load skills");
    
    console.log("Error occurred, returning sample skills as fallback");
    return sampleSkills;
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
