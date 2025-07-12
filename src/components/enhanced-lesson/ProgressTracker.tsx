import React from 'react';
import { Clock, CheckCircle2, Target, Trophy, Star } from 'lucide-react';
import { UserLessonProgress, Achievement } from '../../types/enhancedLesson';

interface ProgressTrackerProps {
  totalSections: number;
  completedSections: number;
  currentSection: number;
  progress: UserLessonProgress;
  estimatedTimeRemaining: number;
  onSectionClick?: (sectionIndex: number) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalSections,
  completedSections,
  currentSection,
  progress,
  estimatedTimeRemaining,
  onSectionClick
}) => {
  const overallProgress = (completedSections / totalSections) * 100;
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}分`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}時間${mins > 0 ? `${mins}分` : ''}`;
  };

  const formatTimeSpent = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return formatTime(minutes);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
      {/* 全体進捗 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">学習進捗</h3>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(overallProgress)}%
          </span>
        </div>
        
        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle2 className="w-4 h-4 text-blue-600 mr-1" />
            </div>
            <div className="font-semibold text-blue-900">{completedSections}</div>
            <div className="text-blue-700">完了セクション</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-green-600 mr-1" />
            </div>
            <div className="font-semibold text-green-900">
              {formatTimeSpent(progress.timeSpent)}
            </div>
            <div className="text-green-700">学習時間</div>
          </div>
        </div>
      </div>

      {/* セクション一覧 */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">セクション</h4>
        <div className="space-y-2">
          {Array.from({ length: totalSections }, (_, index) => {
            const isCompleted = index < completedSections;
            const isCurrent = index === currentSection;
            const isUnlocked = index <= currentSection;
            
            return (
              <div
                key={index}
                className={`
                  flex items-center p-2 rounded-lg cursor-pointer transition-colors
                  ${isCurrent ? 'bg-blue-100 border border-blue-200' : ''}
                  ${isCompleted ? 'bg-green-50' : ''}
                  ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
                `}
                onClick={() => isUnlocked && onSectionClick?.(index)}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium
                  ${isCompleted ? 'bg-green-500 text-white' : 
                    isCurrent ? 'bg-blue-500 text-white' : 
                    isUnlocked ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'}
                `}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`
                  text-sm flex-1
                  ${isCurrent ? 'font-medium text-blue-900' : 
                    isCompleted ? 'text-green-800' : 
                    isUnlocked ? 'text-gray-700' : 'text-gray-400'}
                `}>
                  セクション {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 予想残り時間 */}
      {estimatedTimeRemaining > 0 && (
        <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center mb-1">
            <Target className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-800">予想残り時間</span>
          </div>
          <div className="text-lg font-semibold text-yellow-900">
            {formatTime(estimatedTimeRemaining)}
          </div>
        </div>
      )}

      {/* 達成バッジ */}
      {progress.achievements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Trophy className="w-4 h-4 mr-1" />
            達成バッジ
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {progress.achievements.slice(0, 6).map((achievement) => (
              <div
                key={achievement.id}
                className="text-center p-2 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200"
                title={achievement.description}
              >
                <div className="text-lg mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium text-yellow-800 truncate">
                  {achievement.title}
                </div>
                <div className="flex items-center justify-center mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-yellow-700 ml-1">
                    {achievement.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* スコア表示 */}
      {progress.score !== undefined && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-800">現在のスコア</span>
            <span className="text-lg font-bold text-purple-900">
              {Math.round(progress.score)}%
            </span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.score}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;