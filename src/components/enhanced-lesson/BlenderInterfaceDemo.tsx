import React, { useState } from 'react';
import { 
  Monitor, 
  MousePointer, 
  Eye, 
  Settings, 
  Play, 
  Info,
  ChevronRight,
  Lightbulb,
  Target
} from 'lucide-react';

interface BlenderInterfaceArea {
  id: string;
  name: string;
  description: string;
  position: string;
  color: string;
  icon: React.ComponentType<any>;
  details: string[];
}

const BlenderInterfaceDemo: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const interfaceAreas: BlenderInterfaceArea[] = [
    {
      id: 'viewport',
      name: '3Dビューポート',
      description: '最も重要な作業エリア',
      position: 'メイン中央',
      color: 'bg-blue-100 border-blue-300',
      icon: Monitor,
      details: [
        '3Dシーンのリアルタイム表示',
        'モデリング作業のメインエリア',
        '複数の表示モード切り替え',
        'オブジェクトの直接操作'
      ]
    },
    {
      id: 'outliner',
      name: 'アウトライナー',
      description: 'シーン管理の中枢',
      position: '右上',
      color: 'bg-green-100 border-green-300',
      icon: Eye,
      details: [
        'オブジェクトの階層表示',
        '表示/非表示の制御',
        'レイヤーとコレクション管理',
        '素早いオブジェクト選択'
      ]
    },
    {
      id: 'properties',
      name: 'プロパティパネル',
      description: '詳細設定のコントロールセンター',
      position: '右下',
      color: 'bg-purple-100 border-purple-300',
      icon: Settings,
      details: [
        'オブジェクトの詳細設定',
        'マテリアル・テクスチャ設定',
        'レンダリング設定',
        'アニメーション設定'
      ]
    },
    {
      id: 'timeline',
      name: 'タイムライン',
      description: 'アニメーション制御',
      position: '下部',
      color: 'bg-orange-100 border-orange-300',
      icon: Play,
      details: [
        'フレーム間の移動',
        'キーフレームの表示',
        'アニメーション再生制御',
        '時間軸の管理'
      ]
    }
  ];

  const navigationTechniques = [
    {
      id: 'rotate',
      operation: '視点回転',
      shortcut: '中マウス + ドラッグ',
      description: 'オブジェクトの周りを自由に回転',
      importance: 'high'
    },
    {
      id: 'pan',
      operation: '視点移動',
      shortcut: 'Shift + 中マウス + ドラッグ',
      description: '視点を平行移動してシーンを探索',
      importance: 'high'
    },
    {
      id: 'zoom',
      operation: 'ズーム',
      shortcut: 'スクロールホイール',
      description: '細部から全体まで自在にズーム',
      importance: 'high'
    },
    {
      id: 'views',
      operation: '標準ビュー',
      shortcut: 'テンキー 1, 3, 7',
      description: '正面、右、上面の標準ビューに切り替え',
      importance: 'medium'
    }
  ];

  const selectedAreaData = interfaceAreas.find(area => area.id === selectedArea);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Monitor className="w-6 h-6 mr-2 text-blue-600" />
          Blenderインターフェースインタラクティブ概要
        </h3>
        <p className="text-gray-600">
          各エリアをクリックして詳細を確認してください
        </p>
      </div>

      {/* Interface Layout Visualization */}
      <div className="mb-8">
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
          <div className="grid grid-cols-12 grid-rows-8 gap-2 h-96">
            
            {/* 3D Viewport (Main Area) */}
            <div 
              className={`col-span-8 row-span-6 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                selectedArea === 'viewport' ? 'bg-blue-200 border-blue-400 shadow-lg' : 
                hoveredArea === 'viewport' ? 'bg-blue-100 border-blue-300' : 'bg-gray-100 border-gray-300'
              }`}
              onClick={() => setSelectedArea(selectedArea === 'viewport' ? null : 'viewport')}
              onMouseEnter={() => setHoveredArea('viewport')}
              onMouseLeave={() => setHoveredArea(null)}
            >
              <div className="text-center">
                <Monitor className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold text-gray-800">3Dビューポート</div>
                <div className="text-sm text-gray-600">メイン作業エリア</div>
              </div>
            </div>

            {/* Outliner */}
            <div 
              className={`col-span-4 row-span-3 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                selectedArea === 'outliner' ? 'bg-green-200 border-green-400 shadow-lg' : 
                hoveredArea === 'outliner' ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
              }`}
              onClick={() => setSelectedArea(selectedArea === 'outliner' ? null : 'outliner')}
              onMouseEnter={() => setHoveredArea('outliner')}
              onMouseLeave={() => setHoveredArea(null)}
            >
              <div className="text-center">
                <Eye className="w-6 h-6 mx-auto mb-1 text-green-600" />
                <div className="font-semibold text-gray-800 text-sm">アウトライナー</div>
              </div>
            </div>

            {/* Properties Panel */}
            <div 
              className={`col-span-4 row-span-3 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                selectedArea === 'properties' ? 'bg-purple-200 border-purple-400 shadow-lg' : 
                hoveredArea === 'properties' ? 'bg-purple-100 border-purple-300' : 'bg-gray-100 border-gray-300'
              }`}
              onClick={() => setSelectedArea(selectedArea === 'properties' ? null : 'properties')}
              onMouseEnter={() => setHoveredArea('properties')}
              onMouseLeave={() => setHoveredArea(null)}
            >
              <div className="text-center">
                <Settings className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                <div className="font-semibold text-gray-800 text-sm">プロパティ</div>
              </div>
            </div>

            {/* Timeline */}
            <div 
              className={`col-span-12 row-span-2 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                selectedArea === 'timeline' ? 'bg-orange-200 border-orange-400 shadow-lg' : 
                hoveredArea === 'timeline' ? 'bg-orange-100 border-orange-300' : 'bg-gray-100 border-gray-300'
              }`}
              onClick={() => setSelectedArea(selectedArea === 'timeline' ? null : 'timeline')}
              onMouseEnter={() => setHoveredArea('timeline')}
              onMouseLeave={() => setHoveredArea(null)}
            >
              <div className="text-center">
                <Play className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                <div className="font-semibold text-gray-800">タイムライン</div>
                <div className="text-sm text-gray-600">アニメーション制御</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Area Details */}
      {selectedAreaData && (
        <div className={`rounded-lg border-2 p-4 mb-6 ${selectedAreaData.color}`}>
          <div className="flex items-start">
            <selectedAreaData.icon className="w-6 h-6 mr-3 mt-1 text-gray-700" />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {selectedAreaData.name}
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>位置:</strong> {selectedAreaData.position} | <strong>役割:</strong> {selectedAreaData.description}
              </p>
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">主な機能:</h5>
                <ul className="space-y-1">
                  {selectedAreaData.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Techniques */}
      <div className="mt-8">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <MousePointer className="w-5 h-5 mr-2 text-blue-600" />
          必須ナビゲーション技術
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {navigationTechniques.map((technique) => (
            <div 
              key={technique.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                technique.importance === 'high' 
                  ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start">
                <div className={`w-3 h-3 rounded-full mr-3 mt-2 ${
                  technique.importance === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-1">
                    {technique.operation}
                  </h5>
                  <div className={`text-sm font-mono px-2 py-1 rounded mb-2 inline-block ${
                    technique.importance === 'high' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {technique.shortcut}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {technique.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          学習のコツ
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <Target className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-800 mb-1">段階的習得</div>
              <div className="text-gray-600 text-sm">
                一度にすべてを覚えようとせず、頻繁に使う操作から順番に習得
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <Target className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-800 mb-1">反復練習</div>
              <div className="text-gray-600 text-sm">
                ナビゲーション操作は筋肉記憶になるまで繰り返し練習
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
          <Info className="w-4 h-4 mr-2" />
          次のセクションで実際のBlenderを使った練習を行います
        </div>
      </div>
    </div>
  );
};

export default BlenderInterfaceDemo;