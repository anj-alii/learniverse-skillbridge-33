
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User, Clock, Tag } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

const blogPosts = [
  {
    id: 1,
    title: "How to Make the Most of Your SkillSwap Experience",
    excerpt: "Discover tips and strategies to maximize your learning and teaching on the SkillSwap platform.",
    category: "Tips & Tricks",
    author: "Sarah Johnson",
    date: "April 2, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "The Psychology of Skill Exchange: Why Teaching Others Helps You Learn Better",
    excerpt: "Explore how the act of teaching can deepen your own understanding of a subject and accelerate your learning journey.",
    category: "Learning",
    author: "Michael Chen",
    date: "March 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "From Novice to Expert: How One User Mastered Three New Skills in Six Months",
    excerpt: "Read the inspiring story of Alex, who went from complete beginner to proficient practitioner in web development, digital illustration, and Spanish.",
    category: "Success Stories",
    author: "Jessica Park",
    date: "March 21, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "5 Emerging Skills That Will Be in High Demand by 2026",
    excerpt: "Stay ahead of the curve by learning these in-demand skills that experts predict will be crucial in the job market in the coming years.",
    category: "Trends",
    author: "Robert Williams",
    date: "March 15, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["All", "Tips & Tricks", "Learning", "Success Stories", "Trends", "Community"];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">SkillSwap Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Insights, tips, and stories from the SkillSwap community to help you learn and teach more effectively.
            </p>
          </div>

          {/* Categories */}
          <div className="mb-10 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <ButtonCustom
                key={category}
                variant={category === "All" ? "primary" : "outline"}
                size="sm"
              >
                {category}
              </ButtonCustom>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16 rounded-xl overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Featured post about skill exchange" 
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-10 bg-white dark:bg-gray-900">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-skill-soft-purple text-skill-purple rounded-full mb-4">
                  Featured
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  The Future of Learning: How Peer-to-Peer Skill Exchange is Changing Education
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore how platforms like SkillSwap are disrupting traditional education models and creating more accessible, personalized learning experiences for everyone.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-6">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">David Miller</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">April 5, 2025</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>10 min read</span>
                </div>
                <ButtonCustom to="/blog/future-of-learning">
                  Read Article
                </ButtonCustom>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow transition-transform hover:scale-[1.02]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Tag className="h-4 w-4 text-skill-purple mr-2" />
                    <span className="text-sm text-skill-purple font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.author}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <ButtonCustom 
                    variant="outline" 
                    size="sm" 
                    to={`/blog/${post.id}`}
                  >
                    Read More
                  </ButtonCustom>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-skill-purple to-skill-vivid-purple rounded-xl p-8 md:p-12 text-white">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
                <p className="text-white/90">
                  Get the latest articles, tutorials, and updates from SkillSwap delivered to your inbox.
                </p>
              </div>
              <div className="md:w-1/3">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-3 rounded-l-full w-full text-gray-900 focus:outline-none" 
                  />
                  <ButtonCustom 
                    className="rounded-l-none bg-white text-skill-purple hover:bg-gray-100"
                  >
                    Subscribe
                  </ButtonCustom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
