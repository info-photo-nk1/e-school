import React, { useState } from 'react';
import { Play, Clock, BarChart2, Award, CheckCircle, Lock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: {
    id: number;
    title: string;
    duration: string;
    isLocked: boolean;
  }[];
}

const CourseDetail = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('curriculum');

  const modules: Module[] = [
    {
      id: 1,
      title: "Getting Started with Blender",
      duration: "2h 30m",
      lessons: [
        { id: 1, title: "Introduction to 3D Modeling", duration: "15m", isLocked: false },
        { id: 2, title: "Navigating the Blender Interface", duration: "25m", isLocked: false },
        { id: 3, title: "Essential Shortcuts and Tools", duration: "30m", isLocked: false },
        { id: 4, title: "Basic Mesh Modeling", duration: "40m", isLocked: false },
        { id: 5, title: "Your First 3D Model", duration: "40m", isLocked: true }
      ]
    },
    {
      id: 2,
      title: "Advanced Modeling Techniques",
      duration: "3h 45m",
      lessons: [
        { id: 6, title: "Modifiers and Their Uses", duration: "45m", isLocked: true },
        { id: 7, title: "Sculpting Basics", duration: "1h", isLocked: true },
        { id: 8, title: "UV Unwrapping", duration: "1h", isLocked: true },
        { id: 9, title: "Materials and Texturing", duration: "1h", isLocked: true }
      ]
    },
    {
      id: 3,
      title: "Lighting and Rendering",
      duration: "3h",
      lessons: [
        { id: 10, title: "Basic Lighting Setup", duration: "45m", isLocked: true },
        { id: 11, title: "Material Nodes", duration: "45m", isLocked: true },
        { id: 12, title: "Rendering Settings", duration: "45m", isLocked: true },
        { id: 13, title: "Post-Processing", duration: "45m", isLocked: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-500 bg-opacity-25 rounded-full text-sm font-medium">
                  3D Design
                </span>
                <span className="px-3 py-1 bg-blue-500 bg-opacity-25 rounded-full text-sm font-medium">
                  Beginner
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">3D Modeling with Blender</h1>
              <p className="text-lg text-blue-100 mb-6">
                Master the fundamentals of 3D modeling and bring your creative visions to life with Blender, 
                the industry-leading free 3D creation suite.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>9 hours</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="w-5 h-5 mr-2" />
                  <span>3 modules</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  <span>Certificate</span>
                </div>
              </div>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000"
                alt="3D Modeling Preview"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              {['curriculum', 'overview', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Curriculum Content */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{module.title}</h3>
                    <span className="text-sm text-gray-500">{module.duration}</span>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          {lesson.isLocked ? (
                            <Lock className="w-5 h-5 text-gray-400 mr-3" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          )}
                          <span className={lesson.isLocked ? 'text-gray-400' : 'text-gray-700'}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Overview Content */}
          {activeTab === 'overview' && (
            <div className="prose max-w-none">
              <h2>Course Description</h2>
              <p>
                This comprehensive course will teach you everything you need to know about 3D modeling 
                with Blender. Starting from the basics of navigating the interface to advanced 
                techniques in modeling, texturing, and rendering, you'll gain hands-on experience 
                creating stunning 3D models.
              </p>
              
              <h3>What you'll learn</h3>
              <ul>
                <li>Master the Blender interface and essential tools</li>
                <li>Create detailed 3D models using various modeling techniques</li>
                <li>Apply materials and textures to your 3D models</li>
                <li>Set up professional lighting and rendering</li>
                <li>Complete real-world projects to build your portfolio</li>
              </ul>

              <h3>Requirements</h3>
              <ul>
                <li>No prior experience with 3D modeling required</li>
                <li>Basic computer skills</li>
                <li>A computer capable of running Blender (free software)</li>
              </ul>
            </div>
          )}

          {/* Reviews Content */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Student Reviews</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">4.8 out of 5 (1,234 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[
                  {
                    name: "Sarah Johnson",
                    rating: 5,
                    comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
                    date: "2 weeks ago"
                  },
                  {
                    name: "Michael Chen",
                    rating: 4,
                    comment: "Great introduction to Blender. The pacing is perfect for beginners.",
                    date: "1 month ago"
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{review.date}</span>
                    </div>
                    <h4 className="font-medium mb-1">{review.name}</h4>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;