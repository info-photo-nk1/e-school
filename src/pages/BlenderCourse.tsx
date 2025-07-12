import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, BarChart2, Award, Package, Palette, Camera, Box, Check, Info } from 'lucide-react';

const BlenderCourse = () => {
  const navigate = useNavigate();

  const courseModules = [
    {
      id: 1,
      title: "Getting Started with Blender",
      duration: "2h 30m",
      topics: [
        "Introduction to 3D Modeling",
        "Navigating the Interface",
        "Essential Tools",
        "Basic Mesh Modeling"
      ],
      icon: Box
    },
    {
      id: 2,
      title: "Advanced Modeling",
      duration: "4h",
      topics: [
        "Modifiers",
        "Sculpting",
        "UV Unwrapping",
        "Texturing"
      ],
      icon: Package
    },
    {
      id: 3,
      title: "Materials and Texturing",
      duration: "3h",
      topics: [
        "Material Basics",
        "PBR Materials",
        "Texture Painting",
        "Node Editor"
      ],
      icon: Palette
    },
    {
      id: 4,
      title: "Lighting and Rendering",
      duration: "2h 30m",
      topics: [
        "Lighting Setup",
        "Camera Settings",
        "Rendering Basics",
        "Post-Processing"
      ],
      icon: Camera
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-purple-500 bg-opacity-25 rounded-full text-sm font-medium">
                  3D Design
                </span>
                <span className="px-3 py-1 bg-purple-500 bg-opacity-25 rounded-full text-sm font-medium">
                  Beginner
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">3D Character Modeling in Blender</h1>
              <p className="text-xl text-purple-100 mb-8">
                Master the art of 3D character modeling using Blender. Learn industry-standard 
                techniques for creating stunning 3D characters from concept to final render.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>12 hours</span>
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
                onClick={() => navigate('/learn/3d-modeling/1')}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000"
                alt="3D Modeling Course"
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
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
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
                  "Create professional 3D character models",
                  "Master Blender's modeling tools and workflows",
                  "UV unwrapping and texture painting",
                  "Rendering and presentation techniques"
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
                  "No prior 3D modeling experience required",
                  "Blender software (free)",
                  "Computer with dedicated graphics recommended"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <Info className="w-4 h-4 text-purple-600" />
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

export default BlenderCourse;