import React from 'react';
import { CheckCircle, Lock, X, Clock } from 'lucide-react';
import { blenderCourse } from '../data/blenderLessons';
import { useTranslation } from '../hooks/useTranslation';
import { getTranslatedLesson } from '../data/lessonTranslations';

interface LessonSidebarProps {
  courseId: string;
  currentLessonId: string;
  onLessonSelect: (id: string) => void;
  onClose: () => void;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({ courseId, currentLessonId, onLessonSelect, onClose }) => {
  const { t, currentLanguage } = useTranslation();
  // Blenderコースのデータを使用（他のコースの場合は条件分岐で対応）
  const modules = courseId === '3d-modeling' ? blenderCourse : [];
  
  // レッスンの完了状況を判定（現在は簡単な実装）
  const isLessonCompleted = (lessonId: string) => {
    // 現在のレッスンより前のレッスンは完了済みとみなす
    const allLessons = modules.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
    return lessonIndex < currentIndex;
  };
  
  // レッスンがロックされているかを判定
  const isLessonLocked = (lessonId: string) => {
    // Module 1の最初のレッスンまでは解放、それ以降は順次解放の実装
    const allLessons = modules.flatMap(m => m.lessons);
    const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    
    // 最初の4レッスンは解放、それ以降は現在のレッスンの次まで
    return lessonIndex > Math.max(3, currentIndex);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('blenderCourse.courseModules')}</h2>
        <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {modules.map((module) => (
          <div key={module.id} className="border-b border-gray-200">
            <div className="p-4 bg-purple-50 border-l-4 border-purple-600">
              <h3 className="font-semibold text-gray-900">{module.title}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>{Math.floor(module.totalDuration / 60)}{t('time.hoursShort')} {module.totalDuration % 60}{t('time.minutesShort')}</span>
                <span className="mx-2">•</span>
                <span>{module.lessons.length} {t('lessonViewer.lessons')}</span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {module.lessons.map((lesson) => {
                const isLocked = isLessonLocked(lesson.id);
                const isCompleted = isLessonCompleted(lesson.id);
                const isCurrent = currentLessonId === lesson.id;
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => !isLocked && onLessonSelect(lesson.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      isCurrent ? 'bg-purple-50 border-r-4 border-purple-600' : ''
                    } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        {isLocked ? (
                          <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                            isCurrent ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                          }`}>
                            {isCurrent && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isLocked ? 'text-gray-400' : isCurrent ? 'text-purple-700' : 'text-gray-700'
                          }`}>
                            {getTranslatedLesson(lesson.id, currentLanguage.code)?.title || lesson.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {getTranslatedLesson(lesson.id, currentLanguage.code)?.description || lesson.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {lesson.duration}{t('time.minutesShort')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonSidebar;