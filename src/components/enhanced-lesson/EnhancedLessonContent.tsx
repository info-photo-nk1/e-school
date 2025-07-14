import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  EnhancedLesson, 
  UserLessonProgress, 
  SectionProgress, 
  ProgressUpdate,
  Achievement
} from '../../types/enhancedLesson';
import InteractiveSectionCard from './InteractiveSectionCard';
import ProgressTracker from './ProgressTracker';
import { useTranslation } from '../../hooks/useTranslation';
import { getTranslatedLesson } from '../../data/lessonTranslations';
import Breadcrumb, { BreadcrumbItem } from '../Breadcrumb';

interface EnhancedLessonContentProps {
  lesson: EnhancedLesson;
  courseId: string;
  onProgressUpdate?: (progress: UserLessonProgress) => void;
  onComplete?: () => void;
}

const EnhancedLessonContent: React.FC<EnhancedLessonContentProps> = ({
  lesson,
  courseId,
  onProgressUpdate,
  onComplete
}) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  
  // 翻訳されたレッスンデータを取得
  const translatedLesson = getTranslatedLesson(lesson.id, currentLanguage.code);
  
  // プログレス状態の管理
  const [userProgress, setUserProgress] = useState<UserLessonProgress>({
    lessonId: lesson.id,
    userId: 'current-user', // 実際の実装では認証システムから取得
    sectionsProgress: lesson.sections.map(section => ({
      sectionId: section.id,
      completed: false,
      timeSpent: 0,
      interactionsCompleted: [],
      quizScores: {},
      lastAccessed: new Date()
    })),
    overallProgress: 0,
    timeSpent: 0,
    lastAccessed: new Date(),
    completed: false,
    achievements: []
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [startTime] = useState(new Date());

  // セクション完了数の計算
  const completedSections = userProgress.sectionsProgress.filter(sp => sp.completed).length;
  
  // 残り時間の計算
  const completedTime = userProgress.sectionsProgress
    .filter(sp => sp.completed)
    .reduce((acc, sp) => acc + lesson.sections.find(s => s.id === sp.sectionId)?.estimatedTime || 0, 0);
  const estimatedTimeRemaining = Math.max(0, lesson.totalEstimatedTime - completedTime);

  // セクションが解除されているかチェック
  const isSectionUnlocked = (index: number) => {
    if (index === 0) return true; // 最初のセクションは常に解除
    // Introduction to 3D Modeling レッスン(1-1)とBlender Interface Navigation レッスン(1-2)の場合、全てのセクションに自由にアクセス可能
    if (lesson.id === '1-1' || lesson.id === '1-2') return true;
    return userProgress.sectionsProgress[index - 1]?.completed || false;
  };

  // プログレス更新処理
  const handleProgressUpdate = (update: ProgressUpdate) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      const sectionIndex = newProgress.sectionsProgress.findIndex(sp => sp.sectionId === update.sectionId);
      
      if (sectionIndex === -1) return prev;

      const sectionProgress = { ...newProgress.sectionsProgress[sectionIndex] };

      switch (update.type) {
        case 'section-start':
          sectionProgress.lastAccessed = update.timestamp;
          break;
          
        case 'time-update':
          sectionProgress.timeSpent = update.data.timeSpent;
          break;
          
        case 'interaction':
          if (!sectionProgress.interactionsCompleted.includes(update.data.interactionId)) {
            sectionProgress.interactionsCompleted.push(update.data.interactionId);
          }
          break;
          
        case 'quiz-complete':
          sectionProgress.quizScores[update.data.quizId] = update.data.score;
          break;
          
        case 'section-complete':
          sectionProgress.completed = true;
          sectionProgress.lastAccessed = update.timestamp;
          // 達成バッジの追加
          if (!newProgress.achievements.some(a => a.id === `section-${update.sectionId}`)) {
            const newAchievement: Achievement = {
              id: `section-${update.sectionId}`,
              type: 'completion',
              title: t('achievements.sectionComplete'),
              description: t('achievements.sectionCompleteDesc', { sectionTitle: lesson.sections[sectionIndex]?.title }),
              icon: '🎯',
              unlockedAt: update.timestamp,
              points: 10
            };
            newProgress.achievements.push(newAchievement);
          }
          break;
      }

      newProgress.sectionsProgress[sectionIndex] = sectionProgress;
      
      // 全体プログレスの更新
      const completedCount = newProgress.sectionsProgress.filter(sp => sp.completed).length;
      newProgress.overallProgress = (completedCount / lesson.sections.length) * 100;
      
      // 全体の学習時間更新
      newProgress.timeSpent = newProgress.sectionsProgress.reduce((acc, sp) => acc + sp.timeSpent, 0);
      
      // レッスン完了チェック
      if (completedCount === lesson.sections.length && !newProgress.completed) {
        newProgress.completed = true;
        const completionAchievement: Achievement = {
          id: `lesson-${lesson.id}`,
          type: 'milestone',
          title: t('achievements.lessonComplete'),
          description: t('achievements.lessonCompleteDesc', { lessonTitle: translatedLesson?.title || lesson.title }),
          icon: '🏆',
          unlockedAt: new Date(),
          points: 50
        };
        newProgress.achievements.push(completionAchievement);
        onComplete?.();
      }

      newProgress.lastAccessed = update.timestamp;
      
      // プログレス更新のコールバック実行
      onProgressUpdate?.(newProgress);
      
      return newProgress;
    });
  };

  // セクションアクティベーション
  const handleSectionActivate = (sectionIndex: number) => {
    const isUnlocked = isSectionUnlocked(sectionIndex);
    console.log(`Section ${sectionIndex} activation attempt:`, {
      isUnlocked,
      currentIndex: currentSectionIndex,
      sectionTitle: lesson.sections[sectionIndex]?.title,
      prevSectionCompleted: sectionIndex > 0 ? userProgress.sectionsProgress[sectionIndex - 1]?.completed : 'N/A'
    });
    
    if (isUnlocked) {
      setCurrentSectionIndex(sectionIndex);
      handleProgressUpdate({
        sectionId: lesson.sections[sectionIndex].id,
        type: 'section-start',
        data: {},
        timestamp: new Date()
      });
    }
  };

  // セクション完了処理
  const handleSectionComplete = (sectionIndex: number) => {
    handleProgressUpdate({
      sectionId: lesson.sections[sectionIndex].id,
      type: 'section-complete',
      data: {},
      timestamp: new Date()
    });
    
    // 次のセクションに自動進行
    if (sectionIndex < lesson.sections.length - 1) {
      setTimeout(() => {
        setCurrentSectionIndex(sectionIndex + 1);
      }, 1000);
    }
  };

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSectionIndex > 0) {
        handleSectionActivate(currentSectionIndex - 1);
      } else if (e.key === 'ArrowRight' && currentSectionIndex < lesson.sections.length - 1) {
        handleSectionActivate(currentSectionIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSectionIndex, lesson.sections.length]);

  // パンくずナビゲーション
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('navigation.home'), href: '/', icon: <Home className="w-4 h-4" /> },
    { label: t('navigation.courses'), href: '/courses', icon: <BookOpen className="w-4 h-4" /> },
    { label: t('course.blender3d.title'), href: `/learn/${courseId}` },
    { label: translatedLesson?.title || lesson.title }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                  {translatedLesson?.title || lesson.title}
                </h1>
              </div>
            </div>

            {/* ナビゲーションボタン */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => currentSectionIndex > 0 && handleSectionActivate(currentSectionIndex - 1)}
                disabled={currentSectionIndex === 0}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-sm text-gray-600 px-3">
                {currentSectionIndex + 1} / {lesson.sections.length}
              </span>
              
              <button
                onClick={() => currentSectionIndex < lesson.sections.length - 1 && handleSectionActivate(currentSectionIndex + 1)}
                disabled={currentSectionIndex === lesson.sections.length - 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* パンくずナビゲーション */}
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {lesson.sections.map((section, index) => (
                <InteractiveSectionCard
                  key={section.id}
                  section={section}
                  progress={userProgress.sectionsProgress[index]}
                  isActive={index === currentSectionIndex}
                  isCompleted={userProgress.sectionsProgress[index]?.completed || false}
                  isUnlocked={isSectionUnlocked(index)}
                  onActivate={() => handleSectionActivate(index)}
                  onComplete={() => handleSectionComplete(index)}
                  onProgressUpdate={handleProgressUpdate}
                />
              ))}
            </div>

            {/* レッスン完了メッセージ */}
            {userProgress.completed && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    {t('lessonComplete.title')}
                  </h3>
                  <p className="text-green-700 mb-6">
                    {t('lessonComplete.congratulations')}
                  </p>
                  
                  {/* 学習統計 */}
                  <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-gray-900">{t('lessonComplete.studyTime')}</div>
                        <div className="text-green-700">{Math.round(userProgress.timeSpent / 60)}{t('common.minutes')}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{t('lessonComplete.completedSections')}</div>
                        <div className="text-green-700">{completedSections}/{lesson.sections.length}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{t('lessonComplete.achievements')}</div>
                        <div className="text-green-700">{userProgress.achievements.length}{t('common.count')}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{t('lessonComplete.progress')}</div>
                        <div className="text-green-700">100%</div>
                      </div>
                    </div>
                  </div>

                  {/* ナビゲーションオプション */}
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 mb-4">
                      {t('lessonComplete.nextStep')}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => {
                          // 次のレッスンを取得
                          const nextLesson = lesson.id === '1-1' ? '1-2' : null;
                          if (nextLesson) {
                            navigate(`/learn/${courseId}/${nextLesson}`);
                          } else {
                            navigate(`/learn/${courseId}`);
                          }
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        📚 {t('lessonComplete.nextLesson')}
                        <div className="text-xs mt-1 opacity-90">
                          {lesson.id === '1-1' ? t('lessons.interfaceNavigation') : t('navigation.dashboard')}
                        </div>
                      </button>
                      
                      <button
                        onClick={() => navigate(`/learn/${courseId}`)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        📋 {t('lessonComplete.courseOverview')}
                        <div className="text-xs mt-1 opacity-90">
                          {t('lessonComplete.allLessons')}
                        </div>
                      </button>
                      
                      <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        🚀 {t('lessonComplete.otherCourses')}
                        <div className="text-xs mt-1 opacity-90">
                          {t('lessonComplete.newChallenge')}
                        </div>
                      </button>
                    </div>

                    {/* 自動遷移の案内 */}
                    <div className="text-xs text-gray-500 mt-4">
                      💡 {t('lessonComplete.autoAdvance')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            <ProgressTracker
              totalSections={lesson.sections.length}
              completedSections={completedSections}
              currentSection={currentSectionIndex}
              progress={userProgress}
              estimatedTimeRemaining={estimatedTimeRemaining}
              onSectionClick={handleSectionActivate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLessonContent;