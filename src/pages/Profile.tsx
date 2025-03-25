
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProfileCard from "@/components/profile/ProfileCard";
import SkillCard from "@/components/marketplace/SkillCard";

const Profile = () => {
  // Mock user data
  const user = {
    id: "user1",
    name: "Alex Morgan",
    avatar: "https://placehold.co/300/9b87f5/ffffff?text=AM",
    bio: "Professional photographer and web developer with 8 years of experience. Passionate about sharing knowledge and learning new skills to expand my creative horizons.",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    skillsToTeach: ["Photography", "Web Development", "JavaScript", "UI Design"],
    skillsToLearn: ["Mobile Development", "Spanish", "3D Modeling"],
    totalSessions: 24,
    rating: 4.8,
    badges: ["Mentor", "Top Teacher", "Quick Responder"],
  };

  // Mock skills data for this user
  const userSkills = [
    {
      id: "1",
      title: "Digital Photography Masterclass",
      category: "Photography",
      instructor: {
        name: user.name,
        avatar: user.avatar,
        rating: user.rating,
      },
      duration: "4 weeks",
      format: "video" as const,
      level: "intermediate" as const,
      description: "Learn professional photography techniques, from composition to post-processing.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=Photography",
    },
    {
      id: "2",
      title: "Front-end Web Development",
      category: "Programming",
      instructor: {
        name: user.name,
        avatar: user.avatar,
        rating: user.rating,
      },
      duration: "6 weeks",
      format: "live" as const,
      level: "intermediate" as const,
      description: "Master modern HTML, CSS, and JavaScript to build responsive websites and applications.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=WebDev",
    },
    {
      id: "3",
      title: "UI Design Fundamentals",
      category: "Design",
      instructor: {
        name: user.name,
        avatar: user.avatar,
        rating: user.rating,
      },
      duration: "3 weeks",
      format: "video" as const,
      level: "beginner" as const,
      description: "Learn the principles of effective user interface design and create beautiful interfaces.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=UI",
    },
  ];

  return (
    <>
      <Header />
      
      <main className="pt-16">
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-1">
                <ProfileCard user={user} />
              </div>
              
              {/* Skills and Activity */}
              <div className="lg:col-span-2 space-y-8">
                {/* Skills Offered Section */}
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-6">Skills Offered</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userSkills.map((skill, index) => (
                      <SkillCard key={skill.id} {...skill} index={index} />
                    ))}
                  </div>
                </div>
                
                {/* Upcoming Sessions */}
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-6">Upcoming Sessions</h2>
                  
                  {[1, 2].map((session) => (
                    <div key={session} className="mb-4 last:mb-0 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={`https://placehold.co/100/9b87f5/ffffff?text=U${session}`}
                              alt="User avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">Teaching UI Design to Emily</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Friday, June 3 • 2:00 PM - 3:30 PM</p>
                          </div>
                        </div>
                        <div className="bg-skill-soft-purple text-skill-purple text-sm font-medium px-3 py-1 rounded-full">
                          Live Session
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Reviews Section */}
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-6">Reviews</h2>
                  
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="mb-6 last:mb-0 pb-6 last:pb-0 border-b last:border-b-0 border-gray-200 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={`https://placehold.co/100/9b87f5/ffffff?text=R${review}`}
                            alt="Reviewer avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Sarah Johnson</h4>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < 5 - review % 2
                                          ? "text-yellow-400"
                                          : "text-gray-300 dark:text-gray-600"
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              2 weeks ago
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Alex is an amazing instructor. He explained complex photography concepts in a way that was easy to understand and provided practical examples. I've improved my photography skills significantly after our sessions.
                          </p>
                          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            For: Digital Photography Masterclass
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Profile;
