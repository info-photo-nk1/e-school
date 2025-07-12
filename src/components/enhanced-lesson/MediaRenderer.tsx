import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, ArrowLeftRight } from 'lucide-react';
import { MediaElement } from '../../types/enhancedLesson';

interface MediaRendererProps {
  media: MediaElement;
  onInteraction: (data: any) => void;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ media, onInteraction }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBefore, setShowBefore] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = (type: string, data: any = {}) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    onInteraction({
      mediaId: media.id,
      type,
      ...data,
      timestamp: new Date()
    });
  };

  const renderImage = () => (
    <div className="relative">
      <img
        src={media.url}
        alt={media.alt || ''}
        className="w-full rounded-lg shadow-sm"
        onLoad={() => handleInteraction('image-loaded')}
        onClick={() => handleInteraction('image-clicked')}
      />
      {media.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {media.caption}
        </p>
      )}
    </div>
  );

  const renderVideo = () => (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        src={media.url}
        className="w-full"
        controls
        onPlay={() => {
          setIsPlaying(true);
          handleInteraction('video-play');
        }}
        onPause={() => {
          setIsPlaying(false);
          handleInteraction('video-pause');
        }}
        onEnded={() => {
          setIsPlaying(false);
          handleInteraction('video-ended');
        }}
        onTimeUpdate={(e) => {
          const video = e.target as HTMLVideoElement;
          const progress = (video.currentTime / video.duration) * 100;
          handleInteraction('video-progress', { progress });
        }}
      />
      
      {media.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          {media.caption}
        </p>
      )}
    </div>
  );

  const render3DPreview = () => (
    <div className="bg-gray-900 rounded-lg p-8 text-center">
      <div className="text-white mb-4">
        <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">🎯</span>
        </div>
        <h4 className="text-lg font-semibold mb-2">3Dプレビュー</h4>
        <p className="text-gray-300 text-sm">
          3D表示機能は開発中です
        </p>
      </div>
      
      <button
        onClick={() => handleInteraction('3d-preview-clicked')}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        プレビューを開く
      </button>
      
      {media.caption && (
        <p className="text-sm text-gray-400 mt-4">
          {media.caption}
        </p>
      )}
    </div>
  );

  const renderAnimation = () => (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 text-center border border-purple-200">
      <div className="mb-4">
        <div className="w-16 h-16 bg-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center animate-pulse">
          <Play className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-lg font-semibold text-purple-900 mb-2">アニメーション</h4>
        <p className="text-purple-700 text-sm">
          ステップバイステップのアニメーション表示
        </p>
      </div>
      
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
          handleInteraction(isPlaying ? 'animation-pause' : 'animation-play');
        }}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 mr-2" />
            一時停止
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            再生
          </>
        )}
      </button>
      
      {media.caption && (
        <p className="text-sm text-purple-600 mt-4">
          {media.caption}
        </p>
      )}
    </div>
  );

  const renderComparison = () => {
    if (!media.beforeAfter) {
      return renderImage();
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={showBefore ? media.beforeAfter.before : media.beforeAfter.after}
            alt={showBefore ? media.beforeAfter.labels.before : media.beforeAfter.labels.after}
            className="w-full transition-all duration-300"
          />
          
          {/* 切り替えコントロール */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 border border-gray-200">
              <button
                onClick={() => {
                  setShowBefore(!showBefore);
                  handleInteraction('comparison-toggle', { 
                    showing: showBefore ? 'after' : 'before' 
                  });
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                {showBefore ? media.beforeAfter.labels.after : media.beforeAfter.labels.before}
              </button>
            </div>
          </div>

          {/* ラベル表示 */}
          <div className="absolute top-4 left-4">
            <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {showBefore ? media.beforeAfter.labels.before : media.beforeAfter.labels.after}
            </span>
          </div>
        </div>

        {/* 説明 */}
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className={`p-3 rounded-lg transition-colors ${showBefore ? 'bg-blue-100 border border-blue-200' : 'bg-white'}`}>
              <h5 className="font-medium text-gray-900 mb-1">
                {media.beforeAfter.labels.before}
              </h5>
              <button
                onClick={() => {
                  setShowBefore(true);
                  handleInteraction('comparison-select', { selected: 'before' });
                }}
                className={`text-sm ${showBefore ? 'text-blue-600' : 'text-gray-600'}`}
              >
                表示
              </button>
            </div>
            
            <div className={`p-3 rounded-lg transition-colors ${!showBefore ? 'bg-blue-100 border border-blue-200' : 'bg-white'}`}>
              <h5 className="font-medium text-gray-900 mb-1">
                {media.beforeAfter.labels.after}
              </h5>
              <button
                onClick={() => {
                  setShowBefore(false);
                  handleInteraction('comparison-select', { selected: 'after' });
                }}
                className={`text-sm ${!showBefore ? 'text-blue-600' : 'text-gray-600'}`}
              >
                表示
              </button>
            </div>
          </div>
        </div>

        {media.caption && (
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-600 text-center">
              {media.caption}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (media.type) {
      case 'image':
        return renderImage();
      case 'video':
        return renderVideo();
      case '3d-preview':
        return render3DPreview();
      case 'animation':
        return renderAnimation();
      case 'comparison':
        return renderComparison();
      default:
        return renderImage();
    }
  };

  return (
    <div className="mb-6">
      {renderContent()}
    </div>
  );
};

export default MediaRenderer;