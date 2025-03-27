
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Award, Calendar, Video, MessageSquare } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import AuthModal from "@/components/auth/AuthModal";
import SkillCard from "@/components/marketplace/SkillCard";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const featuredSkills = [
    {
      id: "1",
      title: "Digital Photography Masterclass",
      category: "Photography",
      instructor: {
        id: "instructor1",
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
        id: "instructor2",
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
        id: "instructor3",
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
  ];

  const howItWorks = [
    {
      icon: <Search className="w-10 h-10 text-skill-purple" />,
      title: "Discover Skills",
      description: "Browse the marketplace for skills you want to learn or share what you can teach others.",
    },
    {
      icon: <Award className="w-10 h-10 text-skill-purple" />,
      title: "AI Matching",
      description: "Our algorithm pairs you with perfect skill exchange partners based on mutual interests.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-skill-purple" />,
      title: "Schedule Sessions",
      description: "Coordinate convenient times for both parties using our integrated calendar system.",
    },
    {
      icon: <Video className="w-10 h-10 text-skill-purple" />,
      title: "Learn Together",
      description: "Connect through video or chat sessions and exchange knowledge at your own pace.",
    },
  ];

  const testimonials = [
    {
      quote: "SkillSwap completely changed how I approach learning. Instead of paying for expensive courses, I teach Spanish and learn piano in return!",
      author: "Emma R.",
      role: "Language Teacher",
      avatar: "https://placehold.co/100/9b87f5/ffffff?text=ER",
    },
    {
      quote: "As a self-taught developer, I was missing structured guidance. On SkillSwap, I found mentors who helped me grow while I shared my design knowledge.",
      author: "Michael T.",
      role: "Front-end Developer",
      avatar: "https://placehold.co/100/9b87f5/ffffff?text=MT",
    },
    {
      quote: "The community here is incredibly supportive. Everyone is both a teacher and a student, creating an environment where knowledge flows freely.",
      author: "Sophia L.",
      role: "UX Designer",
      avatar: "https://placehold.co/100/9b87f5/ffffff?text=SL",
    },
  ];

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/f8f9fa/ffffff')] bg-fixed opacity-5"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-block px-3 py-1 bg-skill-soft-purple text-skill-purple text-sm font-medium rounded-full mb-6 animate-fade-in">
                  Peer-to-Peer Skill Exchange Platform
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                  Learn Anything.
                  <br /> 
                  <span className="text-gradient">Teach Everything.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
                  SkillSwap connects you with others for mutual learning. Exchange your expertise for the skills you want to acquire, all in one community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <ButtonCustom
                    variant="primary"
                    size="lg"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Join SkillSwap
                  </ButtonCustom>
                  
                  <ButtonCustom
                    variant="outline"
                    size="lg"
                    to="/marketplace"
                  >
                    Explore Skills
                  </ButtonCustom>
                </div>
                
                <div className="mt-10 text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: "400ms" }}>
                  <p>Already trusted by 10,000+ learners worldwide</p>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-70 animate-float"></div>
                <div className="absolute top-1/2 -right-12 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "2s" }}></div>
                
                <div className="relative z-10 glass-card p-4 shadow-xl animate-fade-in" style={{ animationDelay: "400ms" }}>
                  <img
                    src="https://placehold.co/600x400/9b87f5/ffffff?text=SkillSwap"
                    alt="SkillSwap Platform"
                    className="rounded-lg w-full"
                  />
                </div>
                
                <div className="absolute top-10 -right-12 glass-card p-4 shadow-lg animate-fade-in" style={{ animationDelay: "600ms", width: "200px" }}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-skill-purple flex items-center justify-center text-white">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">Live Session</h4>
                      <p className="text-xs text-gray-500">Starting in 10 min</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 glass-card p-4 shadow-lg animate-fade-in" style={{ animationDelay: "800ms", width: "220px" }}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">New Match Found!</h4>
                      <p className="text-xs text-gray-500">Python ↔ Graphic Design</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Skills Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Skills Exchange
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover popular skills being exchanged in our community right now
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSkills.map((skill, index) => (
                <SkillCard key={skill.id} {...skill} index={index} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <ButtonCustom 
                variant="outline" 
                size="lg"
                to="/marketplace"
              >
                View All Skills
              </ButtonCustom>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How SkillSwap Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our simple process makes exchanging skills effortless and rewarding
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-skill-soft-purple flex items-center justify-center mx-auto mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Community Says
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Real stories from people who've experienced the power of skill exchange
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6">
                  <svg className="w-10 h-10 text-skill-purple mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-skill-purple to-skill-vivid-purple text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Skill Exchange Journey?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
              Join thousands of learners and teachers who are already exchanging skills and growing together on SkillSwap.
            </p>
            <ButtonCustom
              variant="secondary"
              size="lg"
              onClick={() => setAuthModalOpen(true)}
              className="bg-white text-skill-purple hover:bg-gray-100"
            >
              Get Started — It's Free
            </ButtonCustom>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};

export default Index;
