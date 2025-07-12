import React from 'react';
import { PlayCircle, Download, BookOpen } from 'lucide-react';

interface LessonContentProps {
  lessonId: number;
}

const LessonContent: React.FC<LessonContentProps> = ({ lessonId }) => {
  const lessons = {
    1: {
      title: "Introduction to 3D Modeling",
      description: "Learn the fundamentals of 3D modeling and understand the basic concepts that will form the foundation of your 3D creation journey.",
      videoUrl: "https://example.com/lesson1",
      resources: [
        { name: "Course Introduction PDF", size: "2.4 MB" },
        { name: "3D Modeling Basics Cheat Sheet", size: "1.1 MB" }
      ]
    }
  };

  const lesson = lessons[lessonId as keyof typeof lessons];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Video Player */}
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <PlayCircle className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <p className="text-white/80">Click to play video</p>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-4">{lesson?.title}</h1>
          <p className="text-gray-600 mb-6">{lesson?.description}</p>

          {/* Resources */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Lesson Resources
            </h2>
            <div className="space-y-3">
              {lesson?.resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Download className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">{resource.name}</p>
                      <p className="text-sm text-gray-500">{resource.size}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Exercise Section */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h2 className="text-lg font-semibold mb-4">Practice Exercise</h2>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-gray-800 mb-4">
                Create a simple 3D cube and experiment with the basic transformation tools (Move, Rotate, Scale).
                Try to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Position the cube at different locations</li>
                <li>Rotate it along different axes</li>
                <li>Scale it uniformly and non-uniformly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;