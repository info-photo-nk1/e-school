import { Lesson } from '../data/blenderLessons';
import { 
  EnhancedLesson, 
  LessonSection, 
  RichTextBlock, 
  InteractiveElement,
  QuizElement,
  MediaElement 
} from '../types/enhancedLesson';

// 既存のレッスンデータを新しい形式に変換
export const convertLessonToEnhanced = (lesson: Lesson): EnhancedLesson => {
  // コンテンツをセクションに分割
  const sections: LessonSection[] = [];
  
  // Introduction to 3D Modeling レッスン専用の処理
  if (lesson.id === '1-1') {
    // 1. What is 3D Modeling?
    sections.push({
      id: `${lesson.id}-what-is-3d`,
      type: 'concept',
      title: 'What is 3D Modeling?',
      estimatedTime: 8,
      order: 0,
      content: {
        text: [
          {
            id: `${lesson.id}-what-is-3d-heading`,
            type: 'heading',
            level: 2,
            content: 'What is 3D Modeling?'
          },
          {
            id: `${lesson.id}-what-is-3d-definition`,
            type: 'paragraph',
            content: '3D modeling is the process of creating a mathematical coordinate-based representation of any surface of an object in three dimensions via specialized software.'
          },
          {
            id: `${lesson.id}-what-is-3d-explanation`,
            type: 'paragraph',
            content: '3Dモデリングは、特殊なソフトウェアを使用して、オブジェクトの表面を三次元で数学的に表現する技術です。現実世界の物体や想像上のキャラクターを仮想空間で作り出すことができます。'
          },
          {
            id: `${lesson.id}-what-is-3d-uses`,
            type: 'list',
            content: '• 映画やアニメーションの制作\n• ゲーム開発\n• 建築や製品設計\n• 医療や科学的可視化\n• VR/ARコンテンツ制作'
          }
        ]
      },
      completionCriteria: {
        type: 'time-based',
        requirements: {
          minimumTime: 30  // 30秒に短縮でより早く次のセクションへ進める
        }
      }
    });

    // 2. Why Blender?
    sections.push({
      id: `${lesson.id}-why-blender`,
      type: 'concept',
      title: 'Why Blender?',
      estimatedTime: 8,
      order: 1,
      content: {
        text: [
          {
            id: `${lesson.id}-why-blender-heading`,
            type: 'heading',
            level: 2,
            content: 'Why Blender?'
          },
          {
            id: `${lesson.id}-why-blender-intro`,
            type: 'paragraph',
            content: 'Blender is a free and open-source 3D creation suite that supports the entirety of the 3D pipeline.'
          },
          {
            id: `${lesson.id}-why-blender-features`,
            type: 'callout',
            style: 'info',
            content: 'Blenderが支援する機能:'
          },
          {
            id: `${lesson.id}-why-blender-list`,
            type: 'list',
            content: '• モデリング、リギング、アニメーション\n• シミュレーション、レンダリング\n• コンポジティングとモーショントラッキング\n• ビデオ編集とゲーム制作\n• スクリプティングとカスタマイゼーション'
          },
          {
            id: `${lesson.id}-why-blender-advantages`,
            type: 'callout',
            style: 'success',
            content: '完全無料でプロレベルの機能を提供し、活発なコミュニティサポートがあります'
          }
        ]
      },
      completionCriteria: {
        type: 'time-based',
        requirements: {
          minimumTime: 30  // Why Blenderセクションも30秒に短縮
        }
      }
    });

    // 3. Course Overview
    sections.push({
      id: `${lesson.id}-course-overview`,
      type: 'concept',
      title: 'Course Overview',
      estimatedTime: 8,
      order: 2,
      content: {
        text: [
          {
            id: `${lesson.id}-course-overview-heading`,
            type: 'heading',
            level: 2,
            content: 'Course Overview'
          },
          {
            id: `${lesson.id}-course-overview-intro`,
            type: 'paragraph',
            content: 'このコースでは、Blenderの基礎から実践的な3Dモデリングまでを段階的に学習します。'
          },
          {
            id: `${lesson.id}-course-overview-objectives`,
            type: 'callout',
            style: 'info',
            content: 'このコースで学ぶこと:'
          },
          {
            id: `${lesson.id}-course-overview-list`,
            type: 'list',
            content: '1. **Basic Navigation** - 3D空間での移動方法\n2. **Essential Tools** - 最も頻繁に使用するツール\n3. **Modeling Techniques** - ゼロから3Dオブジェクトを作成\n4. **Materials & Texturing** - モデルをリアルに見せる方法\n5. **Lighting & Rendering** - 作品を生き生きとさせる技術'
          },
          {
            id: `${lesson.id}-course-overview-project`,
            type: 'callout',
            style: 'success',
            content: '最終プロジェクト: オリジナルロボットキャラクター "Robo-Friend" の制作'
          }
        ]
      },
      completionCriteria: {
        type: 'time-based',
        requirements: {
          minimumTime: 60
        }
      }
    });

    // 4. 実演動画
    if (lesson.videoUrl) {
      sections.push({
        id: `${lesson.id}-video`,
        type: 'demonstration',
        title: '実演動画',
        estimatedTime: 6,
        order: 3,
        content: {
          text: [
            {
              id: `${lesson.id}-video-intro`,
              type: 'paragraph',
              content: 'Blenderの基本的な操作と今後のレッスンで学ぶ内容をプレビューします。'
            }
          ],
          media: [
            {
              id: `${lesson.id}-main-video`,
              type: 'video',
              url: lesson.videoUrl,
              caption: `${lesson.title}の実演動画`
            }
          ]
        },
        completionCriteria: {
          type: 'interaction-based',
          requirements: {
            requiredInteractions: [`${lesson.id}-main-video`]
          }
        }
      });
    }
  } else {
    // 他のレッスン用の既存の処理
    // 1. イントロダクションセクション
    sections.push({
      id: `${lesson.id}-intro`,
      type: 'introduction',
      title: `${lesson.title} - 概要`,
      estimatedTime: Math.ceil(lesson.duration * 0.2), // 20%の時間を概要に
      order: 0,
      content: {
        text: [
          {
            id: `${lesson.id}-intro-heading`,
            type: 'heading',
            level: 2,
            content: lesson.title
          },
          {
            id: `${lesson.id}-intro-desc`,
            type: 'paragraph',
            content: lesson.description
          },
          {
            id: `${lesson.id}-intro-time`,
            type: 'callout',
            style: 'info',
            content: `このレッスンの予想学習時間: ${lesson.duration}分`
          }
        ]
      },
      completionCriteria: {
        type: 'time-based',
        requirements: {
          minimumTime: 30 // 30秒
        }
      }
    });

    // 2. メインコンテンツセクション
    const contentSections = parseContentIntoSections(lesson.content, lesson.id);
    sections.push(...contentSections);
  }

  // 3. 動画セクション（動画がある場合、他のレッスン用）
  if (lesson.videoUrl && lesson.id !== '1-1') {
    sections.push({
      id: `${lesson.id}-video`,
      type: 'demonstration',
      title: '実演動画',
      estimatedTime: Math.ceil(lesson.duration * 0.3), // 30%の時間を動画に
      order: sections.length,
      content: {
        media: [
          {
            id: `${lesson.id}-main-video`,
            type: 'video',
            url: lesson.videoUrl,
            caption: `${lesson.title}の実演動画`
          }
        ]
      },
      completionCriteria: {
        type: 'interaction-based',
        requirements: {
          requiredInteractions: [`${lesson.id}-main-video`]
        }
      }
    });
  }

  // 4. 演習セクション（演習がある場合）
  if (lesson.exercises && lesson.exercises.length > 0) {
    sections.push({
      id: `${lesson.id}-exercises`,
      type: 'practice',
      title: '実習課題',
      estimatedTime: Math.ceil(lesson.duration * 0.4), // 40%の時間を演習に
      order: sections.length,
      content: {
        interactive: lesson.exercises.map(exercise => ({
          id: exercise.id,
          type: 'checklist',
          title: exercise.title,
          description: exercise.description,
          steps: exercise.instructions.map((instruction, index) => ({
            id: `${exercise.id}-step-${index}`,
            instruction,
            description: index === exercise.instructions.length - 1 ? exercise.solution : undefined,
            completed: false,
            required: true,
            hint: index === 0 ? '最初のステップから始めましょう' : undefined
          }))
        }))
      },
      completionCriteria: {
        type: 'interaction-based',
        requirements: {
          requiredInteractions: lesson.exercises.map(ex => ex.id),
          allStepsCompleted: true
        }
      }
    });
  }

  // 5. クイズセクション（理解度チェック）
  const quizSection = createQuizSection(lesson);
  if (quizSection) {
    sections.push(quizSection);
  }

  // 6. リソースセクション（リソースがある場合）
  if (lesson.resources && lesson.resources.length > 0) {
    sections.push({
      id: `${lesson.id}-resources`,
      type: 'concept',
      title: 'リソース・参考資料',
      estimatedTime: 5,
      order: sections.length,
      content: {
        text: [
          {
            id: `${lesson.id}-resources-intro`,
            type: 'paragraph',
            content: 'このレッスンに関連する追加リソースです。ダウンロードや参照にご活用ください。'
          }
        ],
        media: lesson.resources.map(resource => ({
          id: resource.id,
          type: resource.type === 'link' ? 'image' : 'image', // 簡易的な変換
          url: resource.url,
          caption: `${resource.title}${resource.description ? ` - ${resource.description}` : ''}`
        }))
      },
      completionCriteria: {
        type: 'manual',
        requirements: {}
      }
    });
  }

  return {
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    sections,
    totalEstimatedTime: lesson.duration,
    difficulty: 'beginner', // デフォルトで初級
    learningObjectives: extractLearningObjectives(lesson.content),
    tags: extractTags(lesson),
    version: '1.0'
  };
};

// コンテンツをセクションに分割
const parseContentIntoSections = (content: string, lessonId: string): LessonSection[] => {
  const sections: LessonSection[] = [];
  const lines = content.split('\n');
  
  let currentSection: Partial<LessonSection> | null = null;
  let currentTextBlocks: RichTextBlock[] = [];
  let sectionCounter = 1;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // 新しいセクションの開始（## で始まる行）
    if (trimmedLine.startsWith('## ') && trimmedLine.length > 3) {
      // 前のセクションを完了
      if (currentSection && currentTextBlocks.length > 0) {
        currentSection.content = { text: currentTextBlocks };
        sections.push(currentSection as LessonSection);
      }
      
      // 新しいセクションを開始
      currentSection = {
        id: `${lessonId}-section-${sectionCounter}`,
        type: getSectionType(trimmedLine, sectionCounter),
        title: trimmedLine.substring(3),
        estimatedTime: 8, // デフォルト8分
        order: sectionCounter
      };
      
      currentTextBlocks = [];
      sectionCounter++;
      
    } else if (currentSection) {
      // 既存セクション内のコンテンツ処理
      const textBlock = parseLineToTextBlock(`${lessonId}-section-${sectionCounter-1}-block-${index}`, line);
      if (textBlock) {
        currentTextBlocks.push(textBlock);
      }
    }
  });

  // 最後のセクションを追加
  if (currentSection && currentTextBlocks.length > 0) {
    currentSection.content = { text: currentTextBlocks };
    currentSection.completionCriteria = {
      type: 'time-based',
      requirements: { minimumTime: 60 } // 1分
    };
    sections.push(currentSection as LessonSection);
  }

  return sections;
};

// 行をテキストブロックに変換
const parseLineToTextBlock = (id: string, line: string): RichTextBlock | null => {
  const trimmedLine = line.trim();
  
  if (!trimmedLine) return null;
  
  if (trimmedLine.startsWith('### ')) {
    return {
      id,
      type: 'heading',
      level: 3,
      content: trimmedLine.substring(4)
    };
  }
  
  if (trimmedLine.startsWith('- ')) {
    return {
      id,
      type: 'list',
      content: trimmedLine
    };
  }
  
  if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
    return {
      id,
      type: 'callout',
      style: 'info',
      content: trimmedLine.slice(2, -2)
    };
  }
  
  // 重要な情報は展開可能に
  if (trimmedLine.includes('重要') || trimmedLine.includes('注意') || trimmedLine.includes('ポイント')) {
    return {
      id,
      type: 'expandable',
      content: trimmedLine,
      expandable: {
        summary: '重要ポイント',
        details: trimmedLine
      }
    };
  }
  
  return {
    id,
    type: 'paragraph',
    content: trimmedLine
  };
};

// セクションタイプの推定
const getSectionType = (title: string, index: number): LessonSection['type'] => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('intro') || titleLower.includes('概要') || titleLower.includes('はじめに')) {
    return 'introduction';
  }
  if (titleLower.includes('practice') || titleLower.includes('実習') || titleLower.includes('練習')) {
    return 'practice';
  }
  if (titleLower.includes('challenge') || titleLower.includes('挑戦') || titleLower.includes('応用')) {
    return 'challenge';
  }
  if (titleLower.includes('demo') || titleLower.includes('example') || titleLower.includes('例')) {
    return 'demonstration';
  }
  
  return 'concept'; // デフォルト
};

// クイズセクションの生成
const createQuizSection = (lesson: Lesson): LessonSection | null => {
  // レッスン内容に基づいて自動的にクイズを生成
  const quiz: QuizElement[] = [
    {
      id: `${lesson.id}-quiz-1`,
      type: 'multiple-choice',
      question: `${lesson.title}の主な目的は何ですか？`,
      options: [
        lesson.description,
        '別の学習目標',
        '関連のない内容',
        '上記のすべて'
      ],
      correctAnswer: lesson.description,
      explanation: `正解です。${lesson.title}は${lesson.description}を目的としています。`,
      points: 10
    }
  ];

  return {
    id: `${lesson.id}-quiz`,
    type: 'challenge',
    title: '理解度チェック',
    estimatedTime: 5,
    order: 999, // 最後に配置
    content: { quiz },
    completionCriteria: {
      type: 'quiz-based',
      requirements: {
        minimumQuizScore: 70
      }
    }
  };
};

// 学習目標の抽出
const extractLearningObjectives = (content: string): string[] => {
  const objectives: string[] = [];
  const lines = content.split('\n');
  
  let inObjectiveSection = false;
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed.includes('学習内容') || trimmed.includes('この講座では') || trimmed.includes('学びます')) {
      inObjectiveSection = true;
    } else if (trimmed.startsWith('- ') && inObjectiveSection) {
      objectives.push(trimmed.substring(2));
    } else if (trimmed.startsWith('#') && inObjectiveSection) {
      inObjectiveSection = false;
    }
  });
  
  // デフォルトの学習目標
  if (objectives.length === 0) {
    objectives.push('基本概念の理解', '実践的なスキルの習得', '応用力の向上');
  }
  
  return objectives.slice(0, 5); // 最大5個
};

// タグの抽出
const extractTags = (lesson: Lesson): string[] => {
  const tags: string[] = ['blender', '3d-modeling'];
  
  if (lesson.title.toLowerCase().includes('basic') || lesson.title.includes('基礎')) {
    tags.push('beginner');
  }
  if (lesson.title.toLowerCase().includes('advanced') || lesson.title.includes('上級')) {
    tags.push('advanced');
  }
  if (lesson.exercises && lesson.exercises.length > 0) {
    tags.push('hands-on');
  }
  
  return tags;
};