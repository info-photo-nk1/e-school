import React, { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { QuizElement } from '../../types/enhancedLesson';

interface QuizRendererProps {
  quiz: QuizElement;
  onComplete: (score: number) => void;
}

const QuizRenderer: React.FC<QuizRendererProps> = ({ quiz, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowExplanation(true);
    
    // スコア計算
    let isCorrect = false;
    if (Array.isArray(quiz.correctAnswer)) {
      // 複数回答の場合
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
      isCorrect = quiz.correctAnswer.length === selected.length &&
                 quiz.correctAnswer.every(answer => selected.includes(answer));
    } else {
      // 単一回答の場合
      isCorrect = selectedAnswer === quiz.correctAnswer;
    }
    
    const score = isCorrect ? 100 : 0;
    onComplete(score);
  };

  const handleRetry = () => {
    setSelectedAnswer('');
    setIsSubmitted(false);
    setShowHint(false);
    setShowExplanation(false);
  };

  const isCorrect = () => {
    if (Array.isArray(quiz.correctAnswer)) {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
      return quiz.correctAnswer.length === selected.length &&
             quiz.correctAnswer.every(answer => selected.includes(answer));
    }
    return selectedAnswer === quiz.correctAnswer;
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {quiz.options?.map((option, index) => {
        const isSelected = Array.isArray(selectedAnswer) 
          ? selectedAnswer.includes(option)
          : selectedAnswer === option;
        const isCorrectOption = Array.isArray(quiz.correctAnswer)
          ? quiz.correctAnswer.includes(option)
          : quiz.correctAnswer === option;
        
        let buttonStyle = 'border-gray-200 hover:border-blue-300 bg-white';
        let textStyle = 'text-gray-700';
        
        if (isSubmitted) {
          if (isCorrectOption) {
            buttonStyle = 'border-green-500 bg-green-50';
            textStyle = 'text-green-800';
          } else if (isSelected && !isCorrectOption) {
            buttonStyle = 'border-red-500 bg-red-50';
            textStyle = 'text-red-800';
          }
        } else if (isSelected) {
          buttonStyle = 'border-blue-500 bg-blue-50';
          textStyle = 'text-blue-800';
        }

        return (
          <button
            key={index}
            onClick={() => {
              if (isSubmitted) return;
              
              if (Array.isArray(quiz.correctAnswer)) {
                // 複数選択
                const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
                if (current.includes(option)) {
                  setSelectedAnswer(current.filter(a => a !== option));
                } else {
                  setSelectedAnswer([...current, option]);
                }
              } else {
                // 単一選択
                setSelectedAnswer(option);
              }
            }}
            disabled={isSubmitted}
            className={`
              w-full p-4 text-left border-2 rounded-lg transition-all duration-200
              ${buttonStyle}
              ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:shadow-sm'}
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                ${isSelected ? 'border-current' : 'border-gray-300'}
              `}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>
              <span className={`font-medium ${textStyle}`}>
                {option}
              </span>
              {isSubmitted && isCorrectOption && (
                <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
              )}
              {isSubmitted && isSelected && !isCorrectOption && (
                <XCircle className="w-5 h-5 text-red-600 ml-auto" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderTrueFalse = () => (
    <div className="grid grid-cols-2 gap-4">
      {['true', 'false'].map((option) => {
        const isSelected = selectedAnswer === option;
        const isCorrectOption = quiz.correctAnswer === option;
        const label = option === 'true' ? '正しい' : '間違い';
        
        let buttonStyle = 'border-gray-200 hover:border-blue-300 bg-white';
        let textStyle = 'text-gray-700';
        
        if (isSubmitted) {
          if (isCorrectOption) {
            buttonStyle = 'border-green-500 bg-green-50';
            textStyle = 'text-green-800';
          } else if (isSelected && !isCorrectOption) {
            buttonStyle = 'border-red-500 bg-red-50';
            textStyle = 'text-red-800';
          }
        } else if (isSelected) {
          buttonStyle = 'border-blue-500 bg-blue-50';
          textStyle = 'text-blue-800';
        }

        return (
          <button
            key={option}
            onClick={() => !isSubmitted && setSelectedAnswer(option)}
            disabled={isSubmitted}
            className={`
              p-6 text-center border-2 rounded-lg transition-all duration-200 font-medium
              ${buttonStyle} ${textStyle}
              ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:shadow-sm'}
            `}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg mb-2">{label}</span>
              {isSubmitted && isCorrectOption && (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              )}
              {isSubmitted && isSelected && !isCorrectOption && (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderFillBlank = () => (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={Array.isArray(selectedAnswer) ? selectedAnswer[0] || '' : selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          disabled={isSubmitted}
          placeholder="回答を入力してください..."
          className={`
            w-full p-4 border-2 rounded-lg transition-all duration-200
            ${isSubmitted 
              ? isCorrect() 
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-red-500 bg-red-50 text-red-800'
              : 'border-gray-200 focus:border-blue-500 focus:outline-none'
            }
          `}
        />
        {isSubmitted && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isCorrect() ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
          </div>
        )}
      </div>
      
      {isSubmitted && !isCorrect() && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>正解:</strong> {quiz.correctAnswer}
          </p>
        </div>
      )}
    </div>
  );

  const renderQuizContent = () => {
    switch (quiz.type) {
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'true-false':
        return renderTrueFalse();
      case 'fill-blank':
        return renderFillBlank();
      default:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              このクイズタイプ ({quiz.type}) は開発中です。
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white border border-purple-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold text-purple-900 flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-purple-600">Q</span>
          </div>
          クイズ
        </h4>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
            {quiz.points}pt
          </span>
          
          {quiz.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="p-1 text-blue-500 hover:text-blue-700"
              title="ヒントを表示"
            >
              <Lightbulb className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-900 font-medium text-lg leading-relaxed">
          {quiz.question}
        </p>
      </div>

      {showHint && quiz.hint && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <strong>ヒント:</strong> {quiz.hint}
          </p>
        </div>
      )}

      <div className="mb-6">
        {renderQuizContent()}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          回答を提出
        </button>
      ) : (
        <div className="space-y-4">
          {/* 結果表示 */}
          <div className={`
            p-4 rounded-lg border
            ${isCorrect() 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
            }
          `}>
            <div className="flex items-center mb-2">
              {isCorrect() ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">正解です！</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-semibold text-red-800">不正解です</span>
                </>
              )}
            </div>
            
            {showExplanation && (
              <p className={`text-sm ${isCorrect() ? 'text-green-700' : 'text-red-700'}`}>
                {quiz.explanation}
              </p>
            )}
          </div>

          <button
            onClick={handleRetry}
            className="w-full py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            もう一度挑戦
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizRenderer;