import React from 'react';
import { Play, Clock, BarChart2, Award, Brain, Code2, Database, Bot, Check, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PythonAICourse = () => {
  const navigate = useNavigate();

  const courseModules = [
    {
      id: 1,
      title: "Python Fundamentals",
      duration: "4 hours",
      topics: [
        "Introduction to Python",
        "Variables and Data Types",
        "Control Flow and Functions",
        "Object-Oriented Programming"
      ],
      icon: Code2
    },
    {
      id: 2,
      title: "Data Science Essentials",
      duration: "6 hours",
      topics: [
        "NumPy and Pandas",
        "Data Visualization with Matplotlib",
        "Statistical Analysis",
        "Data Preprocessing"
      ],
      icon: Database
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      duration: "8 hours",
      topics: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Model Evaluation",
        "Feature Engineering"
      ],
      icon: Brain
    },
    {
      id: 4,
      title: "Deep Learning & AI",
      duration: "10 hours",
      topics: [
        "Neural Networks",
        "TensorFlow Basics",
        "Computer Vision",
        "Natural Language Processing"
      ],
      icon: Bot
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-500 bg-opacity-25 rounded-full text-sm font-medium">
                  AI/ML
                </span>
                <span className="px-3 py-1 bg-blue-500 bg-opacity-25 rounded-full text-sm font-medium">
                  Beginner Friendly
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Python for AI & Machine Learning</h1>
              <p className="text-xl text-blue-100 mb-8">
                Master Python programming and build real AI applications. Learn machine learning, 
                deep learning, and data science from scratch with hands-on projects.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>28 hours</span>
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
                onClick={() => navigate('/get-started')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000"
                alt="Python AI Course"
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
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
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
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-600">Build real-world AI applications from scratch</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-600">Master Python programming fundamentals</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-600">Understand machine learning algorithms</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-600">Create deep learning models with TensorFlow</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-600">Basic computer skills</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-600">No prior programming experience required</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-600">Basic mathematics knowledge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonAICourse;