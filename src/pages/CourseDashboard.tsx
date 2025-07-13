import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  PlayCircle, 
  Lock, 
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  Award,
  ChevronRight,
  Home
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { blenderCourse } from '../data/blenderLessons';
import Breadcrumb, { BreadcrumbItem } from '../components/Breadcrumb';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  progress: number;
  timeSpent: number;
  lastAccessed?: Date;
}

interface CourseStats {
  totalLessons: number;
  completedLessons: number;
  totalTimeSpent: number;
  estimatedTimeRemaining: number;
  overallProgress: number;
}

const CourseDashboard = () => {
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // モックデータ - 実際の実装では認証システムから取得
  const [lessonsProgress, setLessonsProgress] = useState<LessonProgress[]>([
    { lessonId: '1-1', completed: true, progress: 100, timeSpent: 25 },
    { lessonId: '1-2', completed: false, progress: 0, timeSpent: 0 },
    { lessonId: '1-3', completed: false, progress: 0, timeSpent: 0 },
    { lessonId: '1-4', completed: false, progress: 0, timeSpent: 0 },
    { lessonId: '1-5', completed: false, progress: 0, timeSpent: 0 },
  ]);

  // コースデータの取得
  const courseData = courseId === '3d-modeling' ? blenderCourse[0] : null;
  
  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('courseDashboard.notFound.title')}</h2>
          <p className="text-gray-600 mb-4">{t('courseDashboard.notFound.description')}</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('courseDashboard.notFound.backToCourses')}
          </button>
        </div>
      </div>
    );
  }

  // 統計計算
  const stats: CourseStats = {
    totalLessons: courseData.lessons.length,
    completedLessons: lessonsProgress.filter(p => p.completed).length,
    totalTimeSpent: lessonsProgress.reduce((acc, p) => acc + p.timeSpent, 0),
    estimatedTimeRemaining: courseData.totalDuration - lessonsProgress.reduce((acc, p) => acc + p.timeSpent, 0),
    overallProgress: Math.round((lessonsProgress.filter(p => p.completed).length / courseData.lessons.length) * 100)
  };

  // 次の推奨レッスン
  const nextLesson = courseData.lessons.find(lesson => {
    const progress = lessonsProgress.find(p => p.lessonId === lesson.id);
    return !progress?.completed;
  });

  const handleLessonStart = (lessonId: string) => {
    navigate(`/learn/${courseId}/${lessonId}`);
  };

  const isLessonUnlocked = (lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    const prevLesson = courseData.lessons[lessonIndex - 1];
    const prevProgress = lessonsProgress.find(p => p.lessonId === prevLesson.id);
    return prevProgress?.completed || false;
  };

  // パンくずナビゲーション
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('courseDashboard.breadcrumb.home'), href: '/', icon: <Home className="w-4 h-4" /> },
    { label: t('courseDashboard.breadcrumb.courses'), href: '/courses', icon: <BookOpen className="w-4 h-4" /> },
    { label: courseData.title }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <Home className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">
                  {courseData.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {t('courseDashboard.progress')}: {stats.overallProgress}%
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${stats.overallProgress}%` }}
                ></div>
              </div>
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
          <div className="lg:col-span-3 space-y-8">
            {/* コース概要 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('courseDashboard.overview.title')}</h2>
              <p className="text-gray-600 mb-6">{courseData.description}</p>
              
              {/* 統計カード */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.completedLessons}</div>
                  <div className="text-sm text-gray-600">{t('courseDashboard.overview.completedLessons')}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.totalTimeSpent}</div>
                  <div className="text-sm text-gray-600">{t('courseDashboard.overview.studyTime')}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.overallProgress}%</div>
                  <div className="text-sm text-gray-600">{t('courseDashboard.overview.progressRate')}</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{Math.ceil(stats.estimatedTimeRemaining / 60)}</div>
                  <div className="text-sm text-gray-600">{t('courseDashboard.overview.remainingTime')}</div>
                </div>
              </div>
            </div>

            {/* 次の推奨レッスン */}
            {nextLesson && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t('courseDashboard.nextLesson.title')}
                    </h3>
                    <h4 className="text-lg font-semibold text-blue-900 mb-1">
                      {nextLesson.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{nextLesson.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {nextLesson.duration}分
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleLessonStart(nextLesson.id)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>{t('courseDashboard.nextLesson.startButton')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* レッスン一覧 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('courseDashboard.lessonList.title')}</h2>
              <div className="space-y-4">
                {courseData.lessons.map((lesson, index) => {
                  const progress = lessonsProgress.find(p => p.lessonId === lesson.id);
                  const isUnlocked = isLessonUnlocked(index);
                  const isCompleted = progress?.completed || false;
                  
                  return (
                    <div
                      key={lesson.id}
                      className={`border rounded-lg p-4 transition-all ${
                        isCompleted 
                          ? 'border-green-200 bg-green-50' 
                          : isUnlocked 
                            ? 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm cursor-pointer' 
                            : 'border-gray-100 bg-gray-50'
                      }`}
                      onClick={() => isUnlocked ? handleLessonStart(lesson.id) : null}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-8 h-8 text-green-600" />
                            ) : isUnlocked ? (
                              <PlayCircle className="w-8 h-8 text-blue-600" />
                            ) : (
                              <Lock className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {t('courseDashboard.lessonList.lesson')} {index + 1}: {lesson.title}
                            </h3>
                            <p className="text-gray-600">{lesson.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {lesson.duration}分
                              </span>
                              {progress?.timeSpent && progress.timeSpent > 0 && (
                                <span>{t('courseDashboard.lessonList.studiedTime')}: {progress.timeSpent}分</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {isCompleted && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              {t('courseDashboard.lessonList.completed')}
                            </span>
                          )}
                          {isUnlocked && !isCompleted && (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* プログレスバー */}
                      {isUnlocked && progress && progress.progress > 0 && (
                        <div className="mt-3">
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${progress.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1 space-y-6">
            {/* 学習目標 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                {t('courseDashboard.goals.title')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {t('courseDashboard.goals.goal1')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {t('courseDashboard.goals.goal2')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {t('courseDashboard.goals.goal3')}
                </li>
              </ul>
            </div>

            {/* 達成バッジ */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-600" />
                {t('courseDashboard.achievements.title')}
              </h3>
              <div className="space-y-3">
                {stats.completedLessons > 0 && (
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <div className="font-medium text-gray-900">{t('courseDashboard.achievements.firstCompletion.title')}</div>
                      <div className="text-xs text-gray-600">{t('courseDashboard.achievements.firstCompletion.description')}</div>
                    </div>
                  </div>
                )}
                {stats.completedLessons >= 3 && (
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🚀</div>
                    <div>
                      <div className="font-medium text-gray-900">{t('courseDashboard.achievements.continuousLearning.title')}</div>
                      <div className="text-xs text-gray-600">{t('courseDashboard.achievements.continuousLearning.description')}</div>
                    </div>
                  </div>
                )}
                {stats.overallProgress === 100 && (
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <div className="font-medium text-gray-900">{t('courseDashboard.achievements.courseCompletion.title')}</div>
                      <div className="text-xs text-gray-600">{t('courseDashboard.achievements.courseCompletion.description')}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 学習統計 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                {t('courseDashboard.stats.title')}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('courseDashboard.stats.weeklyTime')}</span>
                  <span className="font-medium">{stats.totalTimeSpent}分</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('courseDashboard.stats.avgSession')}</span>
                  <span className="font-medium">25分</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('courseDashboard.stats.lastStudy')}</span>
                  <span className="font-medium">{t('courseDashboard.stats.today')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;