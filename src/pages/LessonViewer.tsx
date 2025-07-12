import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, X, PlayCircle, CheckCircle, Lock, Sparkles } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LessonContent from '../components/LessonContent';
import LessonSidebar from '../components/LessonSidebar';
import EnhancedLessonContent from '../components/enhanced-lesson/EnhancedLessonContent';
import { blenderCourse, getLesson, getNextLesson, getPreviousLesson } from '../data/blenderLessons';
import { convertLessonToEnhanced } from '../utils/lessonConverter';
import { UserLessonProgress } from '../types/enhancedLesson';

const LessonViewer = () => {
  const { t } = useTranslation();
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [useEnhancedView, setUseEnhancedView] = useState(true); // 新しいUIを使用するかの切り替え
  
  // 現在のレッスンデータを取得
  const currentModule = courseId === '3d-modeling' ? 
    blenderCourse.find(m => m.lessons.some(l => l.id === lessonId)) : null;
  const currentLesson = currentModule ? 
    currentModule.lessons.find(l => l.id === lessonId) : null;
  
  // レッスン変更時の処理
  const handleLessonChange = (newLessonId: string) => {
    navigate(`/learn/${courseId}/${newLessonId}`);
  };
  
  // 次のレッスンへ
  const goToNextLesson = () => {
    if (currentModule && currentLesson) {
      const next = getNextLesson(currentModule.id, currentLesson.id);
      if (next) {
        navigate(`/learn/${courseId}/${next.lessonId}`);
      }
    }
  };
  
  // 前のレッスンへ
  const goToPreviousLesson = () => {
    if (currentModule && currentLesson) {
      const prev = getPreviousLesson(currentModule.id, currentLesson.id);
      if (prev) {
        navigate(`/learn/${courseId}/${prev.lessonId}`);
      }
    }
  };
  
  // 進捗計算
  const totalLessons = courseId === '3d-modeling' ? 
    blenderCourse.reduce((total, module) => total + module.lessons.length, 0) : 0;
  
  let currentLessonIndex = 0;
  if (courseId === '3d-modeling' && lessonId) {
    let index = 0;
    for (const module of blenderCourse) {
      const lessonIdx = module.lessons.findIndex(l => l.id === lessonId);
      if (lessonIdx >= 0) {
        currentLessonIndex = index + lessonIdx;
        break;
      }
      index += module.lessons.length;
    }
  }
  
  const progress = totalLessons > 0 ? Math.round((currentLessonIndex / totalLessons) * 100) : 0;
  
  if (!currentLesson) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('lessonViewer.notFound.title')}</h2>
          <p className="text-gray-600 mb-4">{t('lessonViewer.notFound.description')}</p>
          <button
            onClick={() => navigate('/learn/3d-modeling/1-1')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('lessonViewer.notFound.backButton')}
          </button>
        </div>
      </div>
    );
  }

  // 新しいEnhancedUIを使用する場合
  if (useEnhancedView) {
    const enhancedLesson = convertLessonToEnhanced(currentLesson);
    
    const handleProgressUpdate = (progress: UserLessonProgress) => {
      console.log('Progress updated:', progress);
      // ここで実際のプログレス保存処理を実装
    };

    const handleLessonComplete = () => {
      console.log('Lesson completed!');
      // 次のレッスンへの自動遷移や完了処理
      setTimeout(() => {
        goToNextLesson();
      }, 2000);
    };

    return (
      <EnhancedLessonContent
        lesson={enhancedLesson}
        courseId={courseId || '3d-modeling'}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleLessonComplete}
      />
    );
  }

  // 従来のUIを使用する場合
  return (
    <div className="h-screen flex">
      {/* レガシーUI切り替えボタン */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setUseEnhancedView(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          <span>新しいUIを試す</span>
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-white w-80 border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative h-full z-10`}
      >
        <LessonSidebar 
          courseId={courseId || ''}
          currentLessonId={lessonId || ''}
          onLessonSelect={handleLessonChange}
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
                onClick={goToPreviousLesson}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                disabled={!currentModule || !getPreviousLesson(currentModule.id, currentLesson.id)}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium text-gray-900">{currentLesson.title}</span>
              <button
                onClick={goToNextLesson}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                disabled={!currentModule || !getNextLesson(currentModule.id, currentLesson.id)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {t('lessonViewer.progress')}: {currentLessonIndex + 1}/{totalLessons} {t('lessonViewer.lessons')}
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-auto">
          <LessonContent lesson={currentLesson} />
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;