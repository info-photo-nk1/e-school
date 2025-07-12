import React from 'react';
import { PlayCircle, Download, BookOpen, Target, CheckCircle2, ExternalLink } from 'lucide-react';
import { Lesson } from '../data/blenderLessons';
import { useTranslation } from '../hooks/useTranslation';
import { getTranslatedLesson } from '../data/lessonTranslations';

interface LessonContentProps {
  lesson: Lesson;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const { t, currentLanguage } = useTranslation();
  
  // 翻訳されたレッスンデータを取得
  const translatedLesson = getTranslatedLesson(lesson.id, currentLanguage.code);
  // Markdownを簡単なHTMLに変換する関数（基本的なパース）
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-3xl font-bold text-gray-900 mb-4">{line.substring(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-2xl font-semibold text-gray-900 mb-3 mt-6">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-xl font-semibold text-gray-900 mb-2 mt-4">{line.substring(4)}</h3>);
      } else if (line.startsWith('- ')) {
        elements.push(<li key={index} className="text-gray-700 mb-1">{line.substring(2)}</li>);
      } else if (line.trim() === '') {
        elements.push(<br key={index} />);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(<p key={index} className="font-semibold text-gray-900 mb-2">{line.slice(2, -2)}</p>);
      } else if (line.trim() !== '') {
        elements.push(<p key={index} className="text-gray-700 mb-3 leading-relaxed">{line}</p>);
      }
    });
    
    return elements;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{translatedLesson?.title || lesson.title}</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {lesson.duration} {t('time.minutesShort')}
            </span>
          </div>
          <p className="text-gray-600 text-lg">{translatedLesson?.description || lesson.description}</p>
        </div>

        {/* Video Player */}
        {lesson.videoUrl && (
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 text-white/80 mx-auto mb-4" />
              <p className="text-white/80">{t('lessonViewer.clickToPlay')}</p>
              <p className="text-white/60 text-sm mt-2">{lesson.videoUrl}</p>
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {renderContent(translatedLesson?.content || lesson.content)}
          </div>
        </div>

        {/* Exercises */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-purple-600" />
              {t('lessonViewer.practiceExercises')}
            </h2>
            <div className="space-y-6">
              {lesson.exercises.map((exercise, index) => (
                <div key={exercise.id} className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('lessonViewer.exercise')} {index + 1}: {exercise.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{exercise.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('lessonViewer.instructions')}</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {exercise.instructions.map((instruction, idx) => (
                        <li key={idx} className="text-gray-700">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                  
                  {exercise.solution && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        {t('lessonViewer.expectedResult')}
                      </h4>
                      <p className="text-green-700">{exercise.solution}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              {t('lessonViewer.lessonResources')}
            </h2>
            <div className="space-y-3">
              {lesson.resources.map((resource, index) => {
                const translatedResource = translatedLesson?.resources?.[index] || resource;
                return (
                  <div key={resource.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      {resource.type === 'download' && <Download className="w-5 h-5 text-gray-400 mr-3" />}
                      {resource.type === 'link' && <ExternalLink className="w-5 h-5 text-gray-400 mr-3" />}
                      {resource.type === 'document' && <BookOpen className="w-5 h-5 text-gray-400 mr-3" />}
                      <div>
                        <p className="font-medium text-gray-900">{translatedResource?.title || resource.title}</p>
                        {(translatedResource?.description || resource.description) && (
                          <p className="text-sm text-gray-600">{translatedResource?.description || resource.description}</p>
                        )}
                      </div>
                    </div>
                    <a
                      href={resource.url}
                      target={resource.type === 'link' ? '_blank' : undefined}
                      rel={resource.type === 'link' ? 'noopener noreferrer' : undefined}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      {resource.type === 'link' ? t('lessonViewer.open') : t('lessonViewer.download')}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonContent;