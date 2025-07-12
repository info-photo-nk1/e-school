import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { RichTextBlock } from '../../types/enhancedLesson';

interface RichTextRendererProps {
  block: RichTextBlock;
  onInteraction: (data: any) => void;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ block, onInteraction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // スタイルアイコンの取得
  const getStyleIcon = () => {
    switch (block.style) {
      case 'info': return Info;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      default: return null;
    }
  };

  // スタイルカラーの取得
  const getStyleColors = () => {
    switch (block.style) {
      case 'info': return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-600'
      };
      case 'warning': return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600'
      };
      case 'success': return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        icon: 'text-green-600'
      };
      case 'error': return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: 'text-red-600'
      };
      default: return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-800',
        icon: 'text-gray-600'
      };
    }
  };

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
    onInteraction({
      type: 'expand',
      expanded: !isExpanded,
      blockId: block.id
    });
  };

  const handleTooltipInteraction = () => {
    if (!isTooltipVisible) {
      setIsTooltipVisible(true);
      onInteraction({
        type: 'tooltip',
        blockId: block.id
      });
    }
  };

  const StyleIcon = getStyleIcon();
  const colors = getStyleColors();

  // コンテンツのレンダリング
  const renderContent = () => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${Math.min(block.level || 2, 6)}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-3xl font-bold text-gray-900 mb-6',
          2: 'text-2xl font-bold text-gray-900 mb-4',
          3: 'text-xl font-semibold text-gray-900 mb-3',
          4: 'text-lg font-semibold text-gray-900 mb-2',
          5: 'text-base font-semibold text-gray-900 mb-2',
          6: 'text-sm font-semibold text-gray-900 mb-2'
        };
        
        return (
          <HeadingTag className={headingClasses[block.level as keyof typeof headingClasses] || headingClasses[2]}>
            {block.content}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p className="text-gray-700 leading-relaxed mb-4">
            {block.tooltip ? (
              <span className="relative">
                <span 
                  className="border-b border-dotted border-blue-500 cursor-help"
                  onMouseEnter={handleTooltipInteraction}
                  onMouseLeave={() => setIsTooltipVisible(false)}
                >
                  {block.content}
                </span>
                {isTooltipVisible && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg max-w-xs z-10">
                    {block.tooltip.content}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </span>
            ) : (
              block.content
            )}
          </p>
        );

      case 'list':
        const items = block.content.split('\n').filter(item => item.trim());
        return (
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
            {items.map((item, index) => (
              <li key={index} className="leading-relaxed">
                {item.replace(/^-\s*/, '')}
              </li>
            ))}
          </ul>
        );

      case 'code':
        return (
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>{block.content}</code>
          </pre>
        );

      case 'callout':
        return (
          <div className={`p-4 rounded-lg border-l-4 mb-4 ${colors.bg} ${colors.border} ${colors.text}`}>
            <div className="flex items-start">
              {StyleIcon && (
                <StyleIcon className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${colors.icon}`} />
              )}
              <div className="flex-1">
                <p className="leading-relaxed">{block.content}</p>
              </div>
            </div>
          </div>
        );

      case 'expandable':
        return (
          <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
            <button
              onClick={handleExpandToggle}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors"
            >
              <span className="font-medium text-gray-900">
                {block.expandable?.summary || 'クリックして詳細を表示'}
              </span>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {isExpanded && (
              <div className="p-4 bg-white border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {block.expandable?.details || block.content}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <p className="text-gray-700 leading-relaxed mb-4">
            {block.content}
          </p>
        );
    }
  };

  return (
    <div className="mb-4">
      {renderContent()}
    </div>
  );
};

export default RichTextRenderer;