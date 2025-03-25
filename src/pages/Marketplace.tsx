
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkillCard from "@/components/marketplace/SkillCard";
import { ButtonCustom } from "@/components/ui/button-custom";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  // Mock skills data
  const allSkills = [
    {
      id: "1",
      title: "Digital Photography Masterclass",
      category: "Photography",
      instructor: {
        name: "Alex Morgan",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=AM",
        rating: 4.8,
      },
      duration: "4 weeks",
      format: "video" as const,
      level: "intermediate" as const,
      description: "Learn professional photography techniques, from composition to post-processing.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=Photography",
    },
    {
      id: "2",
      title: "JavaScript for Beginners",
      category: "Programming",
      instructor: {
        name: "Sarah Johnson",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=SJ",
        rating: 4.9,
      },
      duration: "6 weeks",
      format: "live" as const,
      level: "beginner" as const,
      description: "Start your coding journey with JavaScript fundamentals and build your first web app.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=JavaScript",
    },
    {
      id: "3",
      title: "Watercolor Painting Techniques",
      category: "Art",
      instructor: {
        name: "David Chen",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=DC",
        rating: 4.7,
      },
      duration: "3 weeks",
      format: "video" as const,
      level: "beginner" as const,
      description: "Explore watercolor fundamentals and create beautiful paintings step by step.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=Painting",
    },
    {
      id: "4",
      title: "Guitar for Intermediate Players",
      category: "Music",
      instructor: {
        name: "James Wilson",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=JW",
        rating: 4.6,
      },
      duration: "8 weeks",
      format: "live" as const,
      level: "intermediate" as const,
      description: "Take your guitar skills to the next level with advanced techniques and music theory.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=Guitar",
    },
    {
      id: "5",
      title: "Advanced Machine Learning",
      category: "Programming",
      instructor: {
        name: "Emily Zhang",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=EZ",
        rating: 4.9,
      },
      duration: "10 weeks",
      format: "video" as const,
      level: "advanced" as const,
      description: "Dive deep into machine learning algorithms and implement complex models.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=ML",
    },
    {
      id: "6",
      title: "French Cuisine Basics",
      category: "Cooking",
      instructor: {
        name: "Pierre Dubois",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=PD",
        rating: 4.8,
      },
      duration: "4 weeks",
      format: "live" as const,
      level: "beginner" as const,
      description: "Learn authentic French cooking techniques and classic recipes from a professional chef.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=Cooking",
    },
    {
      id: "7",
      title: "Marketing Strategy for Startups",
      category: "Business",
      instructor: {
        name: "Rachel Green",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=RG",
        rating: 4.7,
      },
      duration: "6 weeks",
      format: "video" as const,
      level: "intermediate" as const,
      description: "Develop effective marketing strategies for new businesses with limited resources.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=Marketing",
    },
    {
      id: "8",
      title: "Yoga for Flexibility",
      category: "Fitness",
      instructor: {
        name: "Mia Patel",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=MP",
        rating: 4.9,
      },
      duration: "ongoing",
      format: "live" as const,
      level: "beginner" as const,
      description: "Improve your flexibility and balance with targeted yoga sequences for all body types.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=Yoga",
    },
    {
      id: "9",
      title: "3D Modeling with Blender",
      category: "Design",
      instructor: {
        name: "Carlos Vega",
        avatar: "https://placehold.co/100/9b87f5/ffffff?text=CV",
        rating: 4.8,
      },
      duration: "8 weeks",
      format: "video" as const,
      level: "intermediate" as const,
      description: "Create stunning 3D models and animations using the free Blender software.",
      imageUrl: "https://placehold.co/400x250/9b87f5/ffffff?text=3D",
    },
  ];

  // Filter skills based on search and filters
  const filteredSkills = allSkills.filter((skill) => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    const matchesLevel = !selectedLevel || skill.level === selectedLevel;
    const matchesFormat = !selectedFormat || skill.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesFormat;
  });

  // Extract unique categories, levels, and formats for filters
  const categories = Array.from(new Set(allSkills.map(skill => skill.category)));
  const levels = Array.from(new Set(allSkills.map(skill => skill.level)));
  const formats = Array.from(new Set(allSkills.map(skill => skill.format)));

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedLevel(null);
    setSelectedFormat(null);
  };

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-skill-purple to-skill-vivid-purple text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              Skill Marketplace
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Discover skills to learn or share your expertise with others
            </p>
            
            <div className="relative max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for skills, topics, or keywords..."
                className="w-full py-3 pl-10 pr-4 rounded-full text-gray-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </section>
        
        {/* Filters and Skills Grid */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="glass-card p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-skill-purple hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                      Category
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`category-${category}`}
                            type="checkbox"
                            checked={selectedCategory === category}
                            onChange={() => 
                              setSelectedCategory(
                                selectedCategory === category ? null : category
                              )
                            }
                            className="h-4 w-4 text-skill-purple focus:ring-skill-purple border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Level Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                      Level
                    </h3>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level} className="flex items-center">
                          <input
                            id={`level-${level}`}
                            type="checkbox"
                            checked={selectedLevel === level}
                            onChange={() => 
                              setSelectedLevel(
                                selectedLevel === level ? null : level
                              )
                            }
                            className="h-4 w-4 text-skill-purple focus:ring-skill-purple border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`level-${level}`}
                            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Format Filter */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                      Format
                    </h3>
                    <div className="space-y-2">
                      {formats.map((format) => (
                        <div key={format} className="flex items-center">
                          <input
                            id={`format-${format}`}
                            type="checkbox"
                            checked={selectedFormat === format}
                            onChange={() => 
                              setSelectedFormat(
                                selectedFormat === format ? null : format
                              )
                            }
                            className="h-4 w-4 text-skill-purple focus:ring-skill-purple border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`format-${format}`}
                            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {format === "video" ? "Video" : format === "live" ? "Live Session" : "Chat"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Share Your Skills
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Have expertise to share? Create a listing and start exchanging skills today.
                  </p>
                  <ButtonCustom
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    Create Skill Listing
                  </ButtonCustom>
                </div>
              </div>
              
              {/* Skills Grid */}
              <div className="lg:w-3/4">
                {filteredSkills.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No skills found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <ButtonCustom
                      variant="outline"
                      size="md"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </ButtonCustom>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex justify-between items-center">
                      <p className="text-gray-600 dark:text-gray-400">
                        Showing <span className="font-medium">{filteredSkills.length}</span> results
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                          Sort by:
                        </span>
                        <select className="text-sm border-gray-300 dark:border-gray-700 rounded-md focus:ring-skill-purple focus:border-skill-purple bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                          <option>Relevance</option>
                          <option>Newest</option>
                          <option>Rating (High to Low)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredSkills.map((skill, index) => (
                        <SkillCard key={skill.id} {...skill} index={index} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Marketplace;
