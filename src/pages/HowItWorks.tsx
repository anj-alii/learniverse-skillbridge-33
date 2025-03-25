
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, Award, Calendar, Video } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-16 h-16 text-skill-purple" />,
      title: "Discover Skills",
      description: "Browse the marketplace for skills you want to learn or share what you can teach others. Filter by categories, experience levels, and availability to find the perfect match for your learning journey.",
    },
    {
      icon: <Award className="w-16 h-16 text-skill-purple" />,
      title: "AI Matching",
      description: "Our advanced algorithm pairs you with perfect skill exchange partners based on mutual interests and complementary skills. The more you use SkillSwap, the better our AI becomes at finding your ideal matches.",
    },
    {
      icon: <Calendar className="w-16 h-16 text-skill-purple" />,
      title: "Schedule Sessions",
      description: "Coordinate convenient times for both parties using our integrated calendar system. Set up one-on-one or group sessions and receive automated reminders before each learning exchange.",
    },
    {
      icon: <Video className="w-16 h-16 text-skill-purple" />,
      title: "Learn Together",
      description: "Connect through our integrated video platform or chat sessions and exchange knowledge at your own pace. Record sessions for future reference and track your progress over time.",
    },
  ];

  const faqs = [
    {
      question: "Is SkillSwap completely free to use?",
      answer: "Yes, the core SkillSwap platform is completely free to use. We believe in the power of knowledge exchange without barriers. Premium features are available for users who want enhanced capabilities."
    },
    {
      question: "How does the skill matching algorithm work?",
      answer: "Our AI-powered matching system analyzes the skills you want to learn and the skills you can teach. It then identifies users with complementary needs and offerings, factoring in experience levels, availability, and learning styles."
    },
    {
      question: "Can I exchange skills with someone in a different country?",
      answer: "Absolutely! SkillSwap is a global community. Our platform automatically handles time zone differences to make scheduling easier for international skill exchanges."
    },
    {
      question: "What if I don't have any skills to offer?",
      answer: "Everyone has something valuable to share! Our onboarding process helps you identify skills you might not realize you have. Even beginners in a subject can offer fresh perspectives to others."
    },
  ];

  return (
    <>
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-950 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="text-gradient">SkillSwap</span> Works
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Our platform makes exchanging skills effortless, connecting people who want to learn from each other through a simple, four-step process.
            </p>
          </div>
        </section>
        
        {/* Process Steps */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-20 h-20 rounded-full bg-skill-soft-purple flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="w-8 h-8 rounded-full bg-skill-purple text-white flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to know about using SkillSwap
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-skill-purple to-skill-vivid-purple text-white">
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
              to="/"
              className="bg-white text-skill-purple hover:bg-gray-100"
            >
              Get Started — It's Free
            </ButtonCustom>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default HowItWorks;
