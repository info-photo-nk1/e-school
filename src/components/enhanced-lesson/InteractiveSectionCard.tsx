import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Clock, 
  CheckCircle2, 
  PlayCircle,
  BookOpen,
  Lightbulb,
  Target,
  Zap,
  HelpCircle
} from 'lucide-react';
import { LessonSection, SectionProgress, SECTION_COLORS } from '../../types/enhancedLesson';
import RichTextRenderer from './RichTextRenderer';
import InteractiveElementRenderer from './InteractiveElementRenderer';
import QuizRenderer from './QuizRenderer';
import MediaRenderer from './MediaRenderer';

interface InteractiveSectionCardProps {
  section: LessonSection;
  progress: SectionProgress;
  isActive: boolean;
  isCompleted: boolean;
  isUnlocked: boolean;
  onActivate: () => void;
  onComplete: () => void;
  onProgressUpdate: (update: any) => void;
}

const InteractiveSectionCard: React.FC<InteractiveSectionCardProps> = ({
  section,
  progress,
  isActive,
  isCompleted,
  isUnlocked,
  onActivate,
  onComplete,
  onProgressUpdate
}) => {
  const [isExpanded, setIsExpanded] = useState(isActive);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [sectionStartTime, setSectionStartTime] = useState<Date | null>(null);

  const colors = SECTION_COLORS[section.type];

  // アイコンの選択
  const getSectionIcon = () => {
    switch (section.type) {
      case 'introduction': return BookOpen;
      case 'concept': return Lightbulb;
      case 'demonstration': return PlayCircle;
      case 'practice': return Target;
      case 'challenge': return Zap;
      default: return BookOpen;
    }
  };

  const SectionIcon = getSectionIcon();

  // セクションが開かれた時の処理
  useEffect(() => {
    if (isActive && !sectionStartTime) {
      setSectionStartTime(new Date());
      setIsExpanded(true);
    }
  }, [isActive]);

  // 時間追跡
  useEffect(() => {
    if (sectionStartTime && isActive) {
      const interval = setInterval(() => {
        const timeSpent = Math.floor((new Date().getTime() - sectionStartTime.getTime()) / 1000);
        onProgressUpdate({
          sectionId: section.id,
          type: 'time-update',
          data: { timeSpent },
          timestamp: new Date()
        });
      }, 10000); // 10秒ごとに更新

      return () => clearInterval(interval);
    }
  }, [sectionStartTime, isActive]);

  // セクション完了チェック
  const checkCompletion = () => {
    const { completionCriteria } = section;
    const { requirements } = completionCriteria;

    let completed = false;

    switch (completionCriteria.type) {
      case 'time-based':
        completed = progress.timeSpent >= (requirements.minimumTime || 0);
        break;
      case 'interaction-based':
        completed = requirements.requiredInteractions?.every(id => 
          progress.interactionsCompleted.includes(id)
        ) || false;
        break;
      case 'quiz-based':
        const quizScores = Object.values(progress.quizScores);
        const averageScore = quizScores.length > 0 
          ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length 
          : 0;
        completed = averageScore >= (requirements.minimumQuizScore || 70);
        break;
      case 'manual':
        completed = requirements.allStepsCompleted ? 
          progress.interactionsCompleted.length > 0 : true;
        break;
    }

    if (completed && !isCompleted) {
      onComplete();
    }
  };

  // コンテンツの進行度計算
  const getContentProgress = () => {
    const totalItems = [
      ...(section.content.text || []),
      ...(section.content.media || []),
      ...(section.content.interactive || []),
      ...(section.content.quiz || [])
    ].length;

    return totalItems > 0 ? (currentContentIndex / totalItems) * 100 : 0;
  };

  const handleInteractionComplete = (interactionId: string, data: any) => {
    onProgressUpdate({
      sectionId: section.id,
      type: 'interaction',
      data: { interactionId, ...data },
      timestamp: new Date()
    });
    checkCompletion();
  };

  const handleQuizComplete = (quizId: string, score: number) => {
    onProgressUpdate({
      sectionId: section.id,
      type: 'quiz-complete',
      data: { quizId, score },
      timestamp: new Date()
    });
    checkCompletion();
  };

  return (
    <div className={`
      rounded-xl border-2 transition-all duration-300 mb-4
      ${isActive ? `border-[${colors.accent}] shadow-lg` : `border-[${colors.border}]`}
      ${isCompleted ? 'bg-green-50 border-green-200' : `bg-[${colors.bg}]`}
      ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}>
      {/* セクションヘッダー */}
      <div 
        className={`
          p-6 flex items-center justify-between
          ${!isUnlocked ? 'pointer-events-none' : ''}
        `}
        onClick={() => {
          if (isUnlocked) {
            onActivate();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="flex items-center space-x-4">
          {/* セクションアイコン */}
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${isCompleted ? 'bg-green-100' : `bg-[${colors.bg}]`}
          `}>
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <SectionIcon 
                className="w-6 h-6" 
                style={{ color: colors.accent }}
              />
            )}
          </div>

          {/* セクション情報 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {section.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{section.estimatedTime} min</span>
              </div>
              <div className="flex items-center">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  bg-[${colors.bg}]
                `} style={{ color: colors.accent }}>
                  {section.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 展開アイコンと進捗 */}
        <div className="flex items-center space-x-4">
          {/* 進捗インジケーター */}
          {isActive && (
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${getContentProgress()}%`,
                  backgroundColor: colors.accent 
                }}
              />
            </div>
          )}
          
          {/* 展開アイコン */}
          {isUnlocked && (
            isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )
          )}
        </div>
      </div>

      {/* セクションコンテンツ */}
      {isExpanded && isUnlocked && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="mt-6 space-y-6">
            {/* テキストコンテンツ */}
            {section.content.text?.map((textBlock, index) => (
              <RichTextRenderer 
                key={textBlock.id} 
                block={textBlock}
                onInteraction={(data) => handleInteractionComplete(textBlock.id, data)}
              />
            ))}

            {/* メディアコンテンツ */}
            {section.content.media?.map((media, index) => (
              <MediaRenderer 
                key={media.id} 
                media={media}
                onInteraction={(data) => handleInteractionComplete(media.id, data)}
              />
            ))}

            {/* インタラクティブ要素 */}
            {section.content.interactive?.map((interactive, index) => (
              <InteractiveElementRenderer 
                key={interactive.id} 
                element={interactive}
                progress={progress}
                onComplete={(data) => handleInteractionComplete(interactive.id, data)}
              />
            ))}

            {/* クイズ */}
            {section.content.quiz?.map((quiz, index) => (
              <QuizRenderer 
                key={quiz.id} 
                quiz={quiz}
                onComplete={(score) => handleQuizComplete(quiz.id, score)}
              />
            ))}

            {/* セクション完了ボタン */}
            {!isCompleted && section.completionCriteria.type === 'manual' && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    onProgressUpdate({
                      sectionId: section.id,
                      type: 'section-complete',
                      data: { manual: true },
                      timestamp: new Date()
                    });
                    onComplete();
                  }}
                  className="px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                  style={{ backgroundColor: colors.accent }}
                >
                  セクション完了
                </button>
              </div>
            )}

            {/* ヘルプボタン */}
            <div className="mt-6 flex justify-center">
              <button className="flex items-center text-gray-500 hover:text-gray-700 text-sm">
                <HelpCircle className="w-4 h-4 mr-1" />
                このセクションでお困りですか？
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveSectionCard;