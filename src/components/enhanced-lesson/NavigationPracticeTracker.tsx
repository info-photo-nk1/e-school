import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  MousePointer, 
  Keyboard, 
  Eye, 
  RotateCcw,
  Move,
  ZoomIn,
  Timer,
  Trophy,
  AlertCircle,
  Target,
  Zap
} from 'lucide-react';

interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  steps: string[];
  icon: React.ComponentType<any>;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // minutes
  tips: string[];
  completed: boolean;
}

interface NavigationPracticeTrackerProps {
  onComplete?: (exerciseId: string) => void;
}

const NavigationPracticeTracker: React.FC<NavigationPracticeTrackerProps> = ({ onComplete }) => {
  // エラーハンドリング用のstate
  const [hasError, setHasError] = useState(false);

  // エラーバウンダリ的な処理
  React.useEffect(() => {
    const handleError = (error: any) => {
      console.error('NavigationPracticeTracker Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-red-900 mb-2">コンポーネントエラー</h3>
        <p className="text-red-700">NavigationPracticeTrackerでエラーが発生しました。ページを再読み込みしてください。</p>
      </div>
    );
  }
  const [exercises, setExercises] = useState<PracticeExercise[]>([
    {
      id: 'basic-mouse-navigation',
      title: '基本マウスナビゲーション',
      description: 'マウスを使った基本的な3D空間ナビゲーションをマスターします',
      steps: [
        'Blenderを開き、デフォルトシーンを確認',
        '中マウスボタンを押しながらドラッグして視点回転（360度回転を試す）',
        'Shift + 中マウスボタンでパン（平行移動）を複数方向に試す',
        'スクロールホイールでズームイン・ズームアウト（限界まで試す）',
        'キューブを様々な角度と距離から観察する',
        '滑らかな操作で任意の角度にキューブを配置する'
      ],
      icon: MousePointer,
      difficulty: 'easy',
      estimatedTime: 4,
      tips: [
        'マウスの中ボタンがない場合は、設定で「マウスエミュレート」を有効にしてください',
        '操作は滑らかに、急がずに行いましょう',
        '様々な距離からキューブを観察してみてください',
        '回転の中心点を意識して操作してください'
      ],
      completed: false
    },
    {
      id: 'keyboard-views',
      title: 'キーボードビュー切り替え',
      description: 'キーボードショートカットを使った効率的なビュー切り替えを習得します',
      steps: [
        'テンキー「1」で正面ビュー（Front View）に切り替え',
        'テンキー「3」で右側面ビュー（Right View）に切り替え',
        'テンキー「7」で上面ビュー（Top View）に切り替え',
        'テンキー「0」でカメラビューに切り替え',
        'テンキー「5」で正投影/透視投影を切り替え',
        'Ctrl + テンキー「1」で裏面ビュー（Back View）を試す',
        '各ビューでキューブの見え方の違いを確認'
      ],
      icon: Keyboard,
      difficulty: 'easy',
      estimatedTime: 3,
      tips: [
        'テンキーがない場合は、設定で「テンキーエミュレート」を使用',
        '正投影では遠近感がなく、技術図面のような表示になります',
        '透視投影では自然な遠近感のある表示になります',
        'カメラビューはレンダリング時の視点です'
      ],
      completed: false
    },
    {
      id: 'selection-mastery',
      title: '選択操作の完全習得',
      description: '効率的なオブジェクト選択方法を身につけます',
      steps: [
        '左クリックでキューブを選択（オレンジ色の枠で囲まれる）',
        'Shift + A でメニューを開き、UV Sphereを追加',
        'さらにCylinderとConeも追加する',
        '左クリックで異なるオブジェクトを選択',
        'Shift + 左クリックで複数オブジェクトを選択',
        'Aキーですべて選択、Alt + Aですべて選択解除',
        'ボックス選択（Bキー）で複数オブジェクトを範囲選択',
        'サークル選択（Cキー）で柔軟な選択を試す'
      ],
      icon: Target,
      difficulty: 'medium',
      estimatedTime: 5,
      tips: [
        '選択されたオブジェクトはオレンジ色で強調表示されます',
        '最後に選択したオブジェクトがアクティブオブジェクト（明るいオレンジ）になります',
        'アウトライナーでもオブジェクトの選択状態を確認できます',
        'ボックス選択では中クリックで選択解除できます'
      ],
      completed: false
    },
    {
      id: 'framing-focus',
      title: 'フレーミングとフォーカス技術',
      description: '効率的な画面フレーミング技術を習得します',
      steps: [
        'オブジェクトを選択してテンキー「.」（Period）を押す',
        '選択したオブジェクトが画面中央にフレームされることを確認',
        'Homeキーを押してすべてのオブジェクトを画面に収める',
        'キューブをGキー + X軸で遠くに移動してみる',
        '再度Homeキーでフレーミングを確認',
        'Alt + Homeで選択オブジェクトの分離表示を試す',
        'Shift + Cで3Dカーソルを原点にリセット'
      ],
      icon: ZoomIn,
      difficulty: 'medium',
      estimatedTime: 4,
      tips: [
        'フレーミングは大きなシーンで作業する際に非常に重要',
        'オブジェクトを見失った時の救済方法として覚えておきましょう',
        'ズームが極端になった場合にも有効です',
        '分離表示は複雑なシーンで特定のオブジェクトに集中したい時に便利'
      ],
      completed: false
    },
    {
      id: 'advanced-shortcuts',
      title: '高度なショートカット技術',
      description: 'プロフェッショナルレベルの効率的操作を習得します',
      steps: [
        'テンキー「2,4,6,8」で段階的視点移動（15度ずつ）を試す',
        'Ctrl + 中マウスドラッグで精密ズーム操作',
        'Shift + 中マウスドラッグで制約付きパン操作',
        'Ctrl + Shift + 中マウスで軌道回転の練習',
        'スペースキーでクイック検索を試す（「rotate」等で検索）',
        'ミニマップ（N → View → Navigation）の表示と活用',
        '複数ビューポート分割で異なる角度から同時確認'
      ],
      icon: Zap,
      difficulty: 'hard',
      estimatedTime: 6,
      tips: [
        'これらの技術は作業効率を劇的に向上させます',
        '段階的視点移動は精密な角度調整に最適',
        'クイック検索は覚えていないコマンドを素早く呼び出せます',
        'ビューポート分割は複雑なモデリング時に威力を発揮'
      ],
      completed: false
    },
    {
      id: 'workflow-optimization',
      title: 'ワークフロー最適化実践',
      description: '実際の作業を想定した効率的な操作パターンを身につけます',
      steps: [
        '新しいBlenderファイルを開く（Ctrl + N）',
        'デフォルトキューブを削除（X → Delete）',
        'Shift + A → Mesh → Monkey でSuzanneを追加',
        'テンキー「7」で上面ビュー、テンキー「1」で正面ビューに素早く切り替え',
        'オブジェクトをGキー → X → 2 で正確に移動',
        'Rキー → Z → 45 で45度回転',
        'Sキー → 2 で2倍に拡大',
        'Tab でEdit Mode、Aで全選択、Eで押し出し',
        'Tab でObject Modeに戻り、作業完了'
      ],
      icon: Trophy,
      difficulty: 'hard',
      estimatedTime: 8,
      tips: [
        'これは実際のモデリング作業の典型的な流れです',
        '各操作を素早く正確に行うことが重要',
        'ショートカットキーを意識的に使用してください',
        '操作のリズムと流れを身につけることで大幅な時短が可能'
      ],
      completed: false
    }
  ]);

  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean[]>>({});

  const toggleStepCompletion = (exerciseId: string, stepIndex: number) => {
    setCompletedSteps(prev => {
      const exerciseSteps = prev[exerciseId] || [];
      const newSteps = [...exerciseSteps];
      newSteps[stepIndex] = !newSteps[stepIndex];
      return {
        ...prev,
        [exerciseId]: newSteps
      };
    });
  };

  const markExerciseComplete = (exerciseId: string) => {
    setExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      )
    );
    onComplete?.(exerciseId);
  };

  const getCompletedStepsCount = (exerciseId: string) => {
    const steps = completedSteps[exerciseId] || [];
    return steps.filter(Boolean).length;
  };

  const isExerciseCompleted = (exerciseId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return false;
    return getCompletedStepsCount(exerciseId) === exercise.steps.length;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalExercises = exercises?.length || 0;
  const completedExercises = exercises?.filter(ex => ex.completed)?.length || 0;
  const totalEstimatedTime = exercises?.reduce((sum, ex) => sum + (ex.estimatedTime || 0), 0) || 0;

  // データが正しく読み込まれているかチェック
  if (!exercises || exercises.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-2">データ読み込み中</h3>
        <p className="text-yellow-700">練習データを読み込んでいます...</p>
      </div>
    );
  }

  console.log('NavigationPracticeTracker rendering with', { exercisesLength: exercises?.length });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Keyboard className="w-6 h-6 mr-2 text-blue-600" />
          ナビゲーション実習トラッカー
        </h3>
        <p className="text-gray-600 mb-4">
          段階的な練習でBlenderナビゲーションをマスターしましょう
        </p>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{completedExercises}/{totalExercises}</div>
                <div className="text-sm text-blue-600">完了した練習</div>
              </div>
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{totalEstimatedTime}</div>
                <div className="text-sm text-green-600">予想時間（分）</div>
              </div>
              <Timer className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((completedExercises / totalExercises) * 100)}%
                </div>
                <div className="text-sm text-purple-600">進捗率</div>
              </div>
              <CheckCircle2 className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        {exercises.map((exercise) => {
          const isExpanded = currentExercise === exercise.id;
          const stepsCompleted = getCompletedStepsCount(exercise.id);
          const exerciseCompleted = isExerciseCompleted(exercise.id);
          
          return (
            <div 
              key={exercise.id} 
              className={`border-2 rounded-lg transition-all duration-200 ${
                exercise.completed 
                  ? 'border-green-300 bg-green-50' 
                  : isExpanded 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 bg-white'
              }`}
            >
              {/* Exercise Header */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setCurrentExercise(isExpanded ? null : exercise.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      exercise.completed ? 'bg-green-200' : 'bg-blue-100'
                    }`}>
                      {exercise.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <exercise.icon className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {exercise.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{exercise.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{exercise.estimatedTime}分</span>
                    <span className="text-sm text-gray-500">
                      {stepsCompleted}/{exercise.steps.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Exercise Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-4">
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-3">実習手順:</h5>
                    <div className="space-y-2">
                      {exercise.steps.map((step, index) => {
                        const stepCompleted = completedSteps[exercise.id]?.[index] || false;
                        return (
                          <div 
                            key={index}
                            className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleStepCompletion(exercise.id, index)}
                          >
                            <div className="mt-0.5">
                              {stepCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <span className={`${stepCompleted ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                                {index + 1}. {step}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 text-yellow-500" />
                      ヒント:
                    </h5>
                    <ul className="space-y-1">
                      {exercise.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-yellow-200">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Complete Button */}
                  {exerciseCompleted && !exercise.completed && (
                    <div className="text-center">
                      <button
                        onClick={() => markExerciseComplete(exercise.id)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        この練習を完了する
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedExercises === totalExercises && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
          <div className="text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              おめでとうございます！
            </h4>
            <p className="text-gray-600">
              すべてのナビゲーション練習を完了しました。次のレッスンに進む準備ができています！
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationPracticeTracker;