import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, BarChart2, Award, Gamepad2, Code2, Layout, Zap, Check, Info } from 'lucide-react';

const UnityGameCourse = () => {
  const navigate = useNavigate();

  const courseModules = [
    {
      id: 1,
      title: "Unity Fundamentals",
      duration: "3h",
      topics: [
        "Introduction to Unity Interface",
        "GameObjects and Components",
        "Unity Asset Workflow",
        "Scene Management"
      ],
      icon: Layout
    },
    {
      id: 2,
      title: "C# Programming for Unity",
      duration: "4h",
      topics: [
        "C# Basics",
        "Unity Scripting",
        "Physics and Collisions",
        "Input Handling"
      ],
      icon: Code2
    },
    {
      id: 3,
      title: "Game Mechanics",
      duration: "5h",
      topics: [
        "Player Movement",
        "Camera Controls",
        "Collectibles and Scoring",
        "Enemy AI"
      ],
      icon: Gamepad2
    },
    {
      id: 4,
      title: "Polish and Deployment",
      duration: "4h",
      topics: [
        "UI Implementation",
        "Audio Integration",
        "Game States",
        "Build and Deploy"
      ],
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-green-500 bg-opacity-25 rounded-full text-sm font-medium">
                  Game Dev
                </span>
                <span className="px-3 py-1 bg-green-500 bg-opacity-25 rounded-full text-sm font-medium">
                  Beginner
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Unity Game Development Fundamentals</h1>
              <p className="text-xl text-green-100 mb-8">
                Learn game development from scratch using Unity. Create your own games while mastering 
                essential programming and design concepts.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>16 hours</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="w-5 h-5 mr-2" />
                  <span>4 modules</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  <span>Certificate</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/learn/unity-dev/1')}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000"
                alt="Unity Game Development"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Course Modules */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Course Modules</h2>
            <div className="space-y-6">
              {courseModules.map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Course Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
              <ul className="space-y-4">
                {[
                  "Create complete games from scratch",
                  "Master Unity's interface and workflow",
                  "Learn C# programming for game development",
                  "Implement common game mechanics"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
              <ul className="space-y-4">
                {[
                  "Basic computer skills",
                  "No prior programming experience needed",
                  "Unity Hub and Unity Editor (free)",
                  "Computer meeting Unity's requirements"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <Info className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnityGameCourse;