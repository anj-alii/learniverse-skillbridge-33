
import React, { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import SkillCard from "@/components/marketplace/SkillCard";
import { ButtonCustom } from "@/components/ui/button-custom";
import { getSkills, Skill } from "@/services/skillService";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const Marketplace = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setIsLoading(true);
    try {
      const data = await getSkills();
      console.log("Loaded skills:", data);
      setSkills(data);
      setFilteredSkills(data);
      
      if (data.length === 0) {
        toast("No skills found. You might want to add some skills to the marketplace.");
      }
    } catch (error) {
      console.error("Failed to load skills:", error);
      toast.error("Failed to load skills. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterSkills();
  }, [searchTerm, activeCategory, skills]);

  const filterSkills = () => {
    let result = [...skills];

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter((skill) => 
        skill.title.toLowerCase().includes(lowercasedTerm) ||
        skill.description.toLowerCase().includes(lowercasedTerm) ||
        skill.category.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((skill) => skill.category === activeCategory);
    }

    setFilteredSkills(result);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const categories = ["All", "Programming", "Design", "Business", "Marketing", "Language", "Music", "Other"];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-skill-purple to-skill-vivid-purple mix-blend-multiply" />
            <div className="relative py-16 px-8 md:px-16 flex flex-col items-start text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Discover & Exchange Skills
              </h1>
              <p className="text-lg md:max-w-2xl mb-6">
                Browse the marketplace to find skills you want to learn. Use your credits to connect with instructors and arrange skill swap sessions.
              </p>
              <div className="flex w-full max-w-lg rounded-lg overflow-hidden">
                <div className="relative w-full">
                  <div className="absolute top-0 bottom-0 left-3 flex items-center">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for skills, topics, or instructors..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 rounded-l-lg focus:outline-none"
                  />
                </div>
                <ButtonCustom
                  variant="primary"
                  size="lg"
                  className="rounded-l-none bg-white text-skill-purple hover:bg-gray-100"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filter
                </ButtonCustom>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <ButtonCustom
                key={category}
                variant={activeCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </ButtonCustom>
            ))}
            <ButtonCustom variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </ButtonCustom>
          </div>

          {/* Skill Cards Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader"></div>
            </div>
          ) : filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  id={skill.id}
                  title={skill.title}
                  category={skill.category}
                  instructor={skill.instructor}
                  duration={skill.duration}
                  format={skill.format}
                  level={skill.level}
                  description={skill.description}
                  imageUrl={skill.image}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No skills found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <ButtonCustom onClick={() => { 
                setSearchTerm(""); 
                setActiveCategory("All");
              }}>
                Clear Filters
              </ButtonCustom>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
