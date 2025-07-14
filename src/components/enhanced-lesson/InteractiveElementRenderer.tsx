import React, { useState } from 'react';
import { CheckCircle2, Circle, Lightbulb, ArrowRight } from 'lucide-react';
import { InteractiveElement, ChecklistStep, SectionProgress } from '../../types/enhancedLesson';
import BlenderInterfaceDemo from './BlenderInterfaceDemo';
import NavigationPracticeTracker from './NavigationPracticeTracker';

interface InteractiveElementRendererProps {
  element: InteractiveElement;
  progress: SectionProgress;
  onComplete: (data: any) => void;
}

const InteractiveElementRenderer: React.FC<InteractiveElementRendererProps> = ({
  element,
  progress,
  onComplete
}) => {
  const [localSteps, setLocalSteps] = useState<ChecklistStep[]>(element.steps || []);
  const [showHint, setShowHint] = useState<string | null>(null);

  const handleStepToggle = (stepId: string) => {
    const updatedSteps = localSteps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    setLocalSteps(updatedSteps);

    // 完了状況をチェック
    const requiredSteps = updatedSteps.filter(step => step.required);
    const completedRequiredSteps = requiredSteps.filter(step => step.completed);
    
    if (completedRequiredSteps.length === requiredSteps.length) {
      onComplete({
        elementId: element.id,
        type: element.type,
        completedSteps: updatedSteps.filter(step => step.completed).map(step => step.id),
        allRequired: true
      });
    }
  };

  const renderChecklist = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
        {element.title}
      </h4>
      
      {element.description && (
        <p className="text-gray-600 mb-6">{element.description}</p>
      )}

      <div className="space-y-4">
        {localSteps.map((step, index) => (
          <div key={step.id} className="flex items-start group">
            <button
              onClick={() => handleStepToggle(step.id)}
              className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 transition-colors
                ${step.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 hover:border-green-400 group-hover:border-green-400'
                }
              `}
            >
              {step.completed && <CheckCircle2 className="w-4 h-4" />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`
                    text-sm font-medium transition-colors
                    ${step.completed ? 'text-gray-500 line-through' : 'text-gray-900'}
                  `}>
                    {step.instruction}
                    {step.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </p>
                  
                  {step.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>

                {step.hint && (
                  <button
                    onClick={() => setShowHint(showHint === step.id ? null : step.id)}
                    className="ml-4 p-1 text-blue-500 hover:text-blue-700 flex-shrink-0"
                    title="ヒントを表示"
                  >
                    <Lightbulb className="w-4 h-4" />
                  </button>
                )}
              </div>

              {showHint === step.id && step.hint && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>ヒント:</strong> {step.hint}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 進捗インジケーター */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">進捗状況</span>
          <span className="text-sm text-gray-600">
            {localSteps.filter(step => step.completed).length} / {localSteps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(localSteps.filter(step => step.completed).length / localSteps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderStepTracker = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        {element.title}
      </h4>
      
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {localSteps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-shrink-0">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
              ${step.completed 
                ? 'bg-green-500 text-white' 
                : index === localSteps.findIndex(s => !s.completed)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }
            `}>
              {step.completed ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            
            {index < localSteps.length - 1 && (
              <ArrowRight className={`
                w-5 h-5 mx-2 transition-colors
                ${step.completed ? 'text-green-500' : 'text-gray-300'}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* 現在のステップ表示 */}
      {(() => {
        const currentStep = localSteps.find(step => !step.completed);
        if (currentStep) {
          return (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">現在のステップ:</h5>
              <p className="text-blue-800">{currentStep.instruction}</p>
              {currentStep.description && (
                <p className="text-sm text-blue-700 mt-1">{currentStep.description}</p>
              )}
              <button
                onClick={() => handleStepToggle(currentStep.id)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                完了
              </button>
            </div>
          );
        } else {
          return (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                🎉 すべてのステップが完了しました！
              </p>
            </div>
          );
        }
      })()}
    </div>
  );

  switch (element.type) {
    case 'checklist':
      return renderChecklist();
    case 'step-tracker':
      return renderStepTracker();
    case 'blender-interface':
      return <BlenderInterfaceDemo />;
    case 'navigation-practice':
      console.log('Rendering NavigationPracticeTracker for element:', element.id);
      try {
        return <NavigationPracticeTracker onComplete={(exerciseId) => onComplete({ elementId: element.id, exerciseId })} />;
      } catch (error) {
        console.error('Error rendering NavigationPracticeTracker:', error);
        return (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-800">NavigationPracticeTracker エラー: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        );
      }
    default:
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <p className="text-gray-600">
            インタラクティブ要素 ({element.type}) は開発中です。
          </p>
        </div>
      );
  }
};

export default InteractiveElementRenderer;