import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LessonContent from '../components/LessonContent';
import LessonSidebar from '../components/LessonSidebar';

const LessonViewer = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState(1);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div 
        className={`bg-white w-80 border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative h-full z-10`}
      >
        <LessonSidebar 
          currentLessonId={currentLessonId}
          onLessonSelect={setCurrentLessonId}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentLessonId(prev => Math.max(1, prev - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                disabled={currentLessonId === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentLessonId(prev => Math.min(13, prev + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                disabled={currentLessonId === 13}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Progress: 4/13 lessons</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-1/3 h-full bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-auto">
          <LessonContent lessonId={currentLessonId} />
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;