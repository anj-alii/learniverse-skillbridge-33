
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Clock, ListChecks, Settings, Users } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    // Redirect to home if not logged in
    navigate('/');
    return null;
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-10 lg:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your skills, sessions, and connections</p>
          </div>
          <ButtonCustom variant="outline" size="sm" onClick={logout}>
            Sign Out
          </ButtonCustom>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-sm md:text-base">Overview</TabsTrigger>
            <TabsTrigger value="skills" className="text-sm md:text-base">My Skills</TabsTrigger>
            <TabsTrigger value="sessions" className="text-sm md:text-base">Sessions</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm md:text-base">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2 text-skill-purple" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>Your scheduled learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <Calendar className="w-10 h-10 text-skill-purple bg-skill-soft-purple/30 p-2 rounded-lg" />
                      <div>
                        <h4 className="font-medium">JavaScript Basics</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow at 3:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <Calendar className="w-10 h-10 text-skill-purple bg-skill-soft-purple/30 p-2 rounded-lg" />
                      <div>
                        <h4 className="font-medium">UX Design Workshop</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Friday at 5:30 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="w-5 h-5 mr-2 text-skill-purple" />
                    Skills Progress
                  </CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">JavaScript</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-skill-purple h-2.5 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">React</span>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-skill-purple h-2.5 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">UX Design</span>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-skill-purple h-2.5 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="w-5 h-5 mr-2 text-skill-purple" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest platform interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="min-w-[30px] w-[30px] h-[30px] rounded-full bg-skill-soft-purple flex items-center justify-center text-skill-purple font-medium text-xs">
                        JS
                      </div>
                      <div>
                        <p className="text-sm font-medium">Completed JavaScript Basics</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[30px] w-[30px] h-[30px] rounded-full bg-skill-soft-purple flex items-center justify-center text-skill-purple font-medium text-xs">
                        UX
                      </div>
                      <div>
                        <p className="text-sm font-medium">Joined UX Design Group</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">4 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="min-w-[30px] w-[30px] h-[30px] rounded-full bg-skill-soft-purple flex items-center justify-center text-skill-purple font-medium text-xs">
                        RJ
                      </div>
                      <div>
                        <p className="text-sm font-medium">Started Learning React</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ListChecks className="w-5 h-5 mr-2 text-skill-purple" />
                    Suggested Skills
                  </CardTitle>
                  <CardDescription>Based on your interests and learning history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Advanced JavaScript", category: "Programming", level: "Intermediate" },
                      { name: "UI/UX Research", category: "Design", level: "Beginner" },
                      { name: "React Hooks", category: "Programming", level: "Intermediate" }
                    ].map((skill, index) => (
                      <div key={index} className="flex items-start p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div>
                          <h4 className="font-medium">{skill.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{skill.category} • {skill.level}</p>
                          <ButtonCustom variant="outline" size="sm" className="mt-2">
                            Explore
                          </ButtonCustom>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>My Skills</CardTitle>
                <CardDescription>Manage your skills and learning paths</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Skills management content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Sessions</CardTitle>
                <CardDescription>Manage your teaching and learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Sessions management content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-skill-purple" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Account settings content will go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
