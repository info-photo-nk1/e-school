import React from 'react';
import { CheckCircle, Lock, X } from 'lucide-react';

interface LessonSidebarProps {
  currentLessonId: number;
  onLessonSelect: (id: number) => void;
  onClose: () => void;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({ currentLessonId, onLessonSelect, onClose }) => {
  const modules = [
    {
      id: 1,
      title: "Getting Started with Blender",
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
      lessons: [
        { id: 10, title: "Basic Lighting Setup", duration: "45m", isLocked: true },
        { id: 11, title: "Material Nodes", duration: "45m", isLocked: true },
        { id: 12, title: "Rendering Settings", duration: "45m", isLocked: true },
        { id: 13, title: "Post-Processing", duration: "45m", isLocked: true }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Course Content</h2>
        <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {modules.map((module) => (
          <div key={module.id} className="border-b border-gray-200">
            <div className="p-4 bg-gray-50">
              <h3 className="font-medium">{module.title}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {module.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => !lesson.isLocked && onLessonSelect(lesson.id)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                    currentLessonId === lesson.id ? 'bg-blue-50' : ''
                  } ${lesson.isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    {lesson.isLocked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : currentLessonId > lesson.id ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        currentLessonId === lesson.id ? 'border-blue-600' : 'border-gray-300'
                      }`} />
                    )}
                    <span className={`text-sm ${lesson.isLocked ? 'text-gray-400' : 'text-gray-700'}`}>
                      {lesson.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonSidebar;