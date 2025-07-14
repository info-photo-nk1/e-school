import { Lesson } from '../data/blenderLessons';
import { getTranslatedLesson } from '../data/lessonTranslations';
import { 
  EnhancedLesson, 
  LessonSection, 
  RichTextBlock, 
  InteractiveElement,
  QuizElement,
  MediaElement 
} from '../types/enhancedLesson';

// 既存のレッスンデータを新しい形式に変換
export const convertLessonToEnhanced = (lesson: Lesson, language: string = 'en'): EnhancedLesson => {
  // 翻訳されたレッスンデータを取得
  const translatedLesson = getTranslatedLesson(lesson.id, language);
  // コンテンツをセクションに分割
  const sections: LessonSection[] = [];
  
  // Introduction to 3D Modeling レッスン専用の処理
  if (lesson.id === '1-1') {
    // 1. What is 3D Modeling?
    // 翻訳されたコンテンツから最初のセクション部分を抽出
    const content = translatedLesson?.content || lesson.content;
    const firstSection = content.split('##')[1] || content.substring(0, 500);
    
    sections.push({
      id: `${lesson.id}-what-is-3d`,
      type: 'concept',
      title: language === 'ja' ? '3Dモデリングとは？' : 'What is 3D Modeling?',
      estimatedTime: 8,
      order: 0,
      content: {
        text: [
          {
            id: `${lesson.id}-what-is-3d-heading`,
            type: 'heading',
            level: 2,
            content: language === 'ja' ? '3Dモデリングとは？' : 'What is 3D Modeling?'
          },
          {
            id: `${lesson.id}-what-is-3d-content`,
            type: 'paragraph',
            content: firstSection.replace(/^#+ /, '').trim() || (translatedLesson?.description || lesson.description)
          }
        ]
      },
      completionCriteria: {
        type: 'time-based',
        requirements: {
          minimumTime: 30
        }
      }
    });

    // 翻訳されたコンテンツから2番目のセクション部分を抽出
    const contentSections = content.split('##');
    const secondSection = contentSections[2] || 'Blender features and benefits';
    
    sections.push({
      id: `${lesson.id}-why-blender`,
      type: 'concept',
      title: language === 'ja' ? 'なぜBlender？' : 'Why Blender?',
      estimatedTime: 8,
      order: 1,
      content: {
        text: [
          {
            id: `${lesson.id}-why-blender-heading`,
            type: 'heading',
            level: 2,
            content: language === 'ja' ? 'なぜBlender？' : 'Why Blender?'
          },
          {
            id: `${lesson.id}-why-blender-content`,
            type: 'paragraph',
            content: secondSection.replace(/^#+ /, '').trim() || (language === 'ja' ? 'Blenderは無料でオープンソースの3D制作スイートです。' : 'Blender is a free and open-source 3D creation suite.')
          }
        ]
      },
      completionCriteria: {
        type: 'time-based',
        requirements: {
          minimumTime: 30
        }
      }
    });

    // 翻訳されたコンテンツから3番目のセクション部分を抽出
    const thirdSection = contentSections[3] || 'Course learning objectives';
    
    sections.push({
      id: `${lesson.id}-course-overview`,
      type: 'concept',
      title: language === 'ja' ? 'コース概要' : 'Course Overview',
      estimatedTime: 8,
      order: 2,
      content: {
        text: [
          {
            id: `${lesson.id}-course-overview-heading`,
            type: 'heading',
            level: 2,
            content: language === 'ja' ? 'コース概要' : 'Course Overview'
          },
          {
            id: `${lesson.id}-course-overview-content`,
            type: 'paragraph',
            content: thirdSection.replace(/^#+ /, '').trim() || (language === 'ja' ? 'このコースでは、Blenderの基礎から実践的な3Dモデリングまでを学習します。' : 'In this course, you will learn from Blender basics to practical 3D modeling.')
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
              content: language === 'ja' ? 'Blenderの基本的な操作と今後のレッスンで学ぶ内容をプレビューします。' : 'Preview of basic Blender operations and future lesson content.'
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
  } else if (lesson.id === '1-2') {
    // Blender Interface Navigation lesson専用の処理（30分版）
    
    // 1. イントロダクションと学習目標 (3分)
    sections.push({
      id: `${lesson.id}-intro`,
      type: 'introduction',
      title: `${translatedLesson?.title || lesson.title} - ${language === 'ja' ? '学習目標と概要' : 'Learning Objectives & Overview'}`,
      estimatedTime: 3,
      order: 0,
      content: {
        text: [
          {
            id: `${lesson.id}-intro-heading`,
            type: 'heading',
            level: 2,
            content: translatedLesson?.title || lesson.title
          },
          {
            id: `${lesson.id}-intro-desc`,
            type: 'paragraph',
            content: translatedLesson?.description || lesson.description
          },
          {
            id: `${lesson.id}-learning-objectives`,
            type: 'callout',
            style: 'info',
            content: language === 'ja' ? 
              `このレッスンの学習目標:\n• Blenderの4つのメインエリアの完全理解\n• プロフェッショナルなナビゲーション技術の習得\n• 効率的なワークフロー構築の基礎\n• 高度なショートカットとカスタマイゼーション\n\n予想学習時間: ${lesson.duration}分` :
              `Learning objectives:\n• Complete understanding of Blender's 4 main areas\n• Master professional navigation techniques\n• Foundation for efficient workflow\n• Advanced shortcuts and customization\n\nEstimated time: ${lesson.duration} minutes`
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

    // 2. Blenderワークスペース深層理解 (5分)
    sections.push({
      id: `${lesson.id}-workspace-theory`,
      type: 'concept',
      title: language === 'ja' ? 'Blenderワークスペースの深層理解' : 'Deep Understanding of Blender Workspace',
      estimatedTime: 5,
      order: 1,
      content: {
        text: [
          {
            id: `${lesson.id}-philosophy`,
            type: 'heading',
            level: 3,
            content: language === 'ja' ? 'インターフェース設計哲学' : 'Interface Design Philosophy'
          },
          {
            id: `${lesson.id}-philosophy-desc`,
            type: 'paragraph',
            content: language === 'ja' ? 
              'Blenderは「非破壊ワークフロー」の思想に基づいて設計されています。各パネルは特定の役割を持ち、相互連携することで効率的な3D制作環境を提供します。' :
              'Blender is designed based on the philosophy of "non-destructive workflow". Each panel has a specific role and works together to provide an efficient 3D production environment.'
          },
          {
            id: `${lesson.id}-workspace-benefits`,
            type: 'callout',
            style: 'success',
            content: language === 'ja' ? 
              '効率的なワークスペース活用のメリット:\n• 作業時間の大幅短縮\n• ミスの削減\n• クリエイティブフローの維持\n• プロフェッショナルな品質達成' :
              'Benefits of efficient workspace usage:\n• Significant time savings\n• Error reduction\n• Maintaining creative flow\n• Achieving professional quality'
          }
        ]
      },
      completionCriteria: {
        type: 'time-based',
        requirements: {
          minimumTime: 120
        }
      }
    });

    // 3. インタラクティブインターフェース探索 (7分)
    sections.push({
      id: `${lesson.id}-interface-demo`,
      type: 'demonstration',
      title: language === 'ja' ? 'インタラクティブインターフェース探索' : 'Interactive Interface Exploration',
      estimatedTime: 7,
      order: 2,
      content: {
        text: [
          {
            id: `${lesson.id}-interface-intro`,
            type: 'paragraph',
            content: language === 'ja' ? 
              'Blenderの4つのメインエリアを対話的に学習しましょう。各エリアをクリックして、詳細な機能と使用方法を確認してください。' :
              'Learn Blender\'s 4 main areas interactively. Click on each area to see detailed functions and usage.'
          },
          {
            id: `${lesson.id}-exploration-tips`,
            type: 'callout',
            style: 'warning',
            content: language === 'ja' ? 
              '効果的な探索のコツ:\n• 各エリアの基本機能を理解してから詳細へ\n• 実際のBlenderと比較しながら学習\n• 疑問点はメモして後で調べる\n• ホバー効果と詳細説明を活用' :
              'Tips for effective exploration:\n• Understand basic functions before details\n• Compare with actual Blender while learning\n• Note questions for later research\n• Use hover effects and detailed explanations'
          }
        ],
        interactive: [
          {
            id: `${lesson.id}-interface-visualization`,
            type: 'blender-interface',
            title: language === 'ja' ? 'インタラクティブBlenderレイアウト' : 'Interactive Blender Layout',
            description: language === 'ja' ? 'Blenderワークスペースの完全探索' : 'Complete Blender workspace exploration'
          }
        ]
      },
      completionCriteria: {
        type: 'interaction-based',
        requirements: {
          requiredInteractions: [`${lesson.id}-interface-visualization`]
        }
      }
    });

    // 4. 基本ナビゲーション実習 (8分)
    sections.push({
      id: `${lesson.id}-basic-navigation`,
      type: 'practice',
      title: language === 'ja' ? '基本ナビゲーション実習' : 'Basic Navigation Practice',
      estimatedTime: 8,
      order: 3,
      content: {
        text: [
          {
            id: `${lesson.id}-basic-intro`,
            type: 'paragraph',
            content: language === 'ja' ? 
              '実際のBlenderを使って基本的なナビゲーション技術を練習します。段階的に難易度が上がる練習プログラムを用意しました。' :
              'Practice basic navigation techniques with actual Blender. We\'ve prepared progressive difficulty practice programs.'
          },
          {
            id: `${lesson.id}-practice-preparation`,
            type: 'callout',
            style: 'info',
            content: language === 'ja' ? 
              '実習の準備:\n• Blenderを起動してデフォルトシーンを表示\n• マウスの中ボタンが機能することを確認\n• キーボードのテンキーをチェック\n• 画面を見やすい大きさに調整' :
              'Practice preparation:\n• Launch Blender with default scene\n• Confirm middle mouse button functionality\n• Check keyboard numpad\n• Adjust screen to comfortable size'
          }
        ],
        interactive: [
          {
            id: `${lesson.id}-basic-navigation-tracker`,
            type: 'navigation-practice',
            title: language === 'ja' ? '基本ナビゲーション練習' : 'Basic Navigation Practice',
            description: language === 'ja' ? '段階的練習でマスタリング' : 'Progressive mastery practice',
            steps: [] // Add empty steps array to satisfy interface
          }
        ]
      },
      completionCriteria: {
        type: 'interaction-based',
        requirements: {
          requiredInteractions: [`${lesson.id}-basic-navigation-tracker`],
          allStepsCompleted: true
        }
      }
    });

    // 5. 高度なナビゲーション技術 (7分)
    sections.push({
      id: `${lesson.id}-advanced-navigation`,
      type: 'challenge',
      title: language === 'ja' ? '高度なナビゲーション技術' : 'Advanced Navigation Techniques',
      estimatedTime: 7,
      order: 4,
      content: {
        text: [
          {
            id: `${lesson.id}-advanced-intro`,
            type: 'heading',
            level: 3,
            content: language === 'ja' ? 'プロフェッショナルレベルの技術習得' : 'Professional Level Skill Acquisition'
          },
          {
            id: `${lesson.id}-advanced-desc`,
            type: 'paragraph',
            content: language === 'ja' ? 
              'より効率的で高度なナビゲーション技術を学習します。これらの技術により、複雑な3Dシーンでも迅速かつ正確に作業できるようになります。' :
              'Learn more efficient and advanced navigation techniques. These skills will enable quick and accurate work even in complex 3D scenes.'
          },
          {
            id: `${lesson.id}-shortcut-mastery`,
            type: 'expandable',
            content: language === 'ja' ? 'プロが使うショートカット集' : 'Professional Shortcuts Collection',
            expandable: {
              summary: language === 'ja' ? '高度なショートカット一覧' : 'Advanced Shortcuts List',
              details: language === 'ja' ? 
                'Ctrl+テンキー: 裏面ビュー\nテンキー2,4,6,8: 段階的回転\nAlt+Home: 分離表示\nShift+C: 3Dカーソルリセット\nL: リンク選択\nShift+L: 類似選択' :
                'Ctrl+Numpad: Back view\nNumpad 2,4,6,8: Step rotation\nAlt+Home: Isolation display\nShift+C: 3D cursor reset\nL: Linked selection\nShift+L: Similar selection'
            }
          }
        ],
        interactive: [
          {
            id: `${lesson.id}-advanced-checklist`,
            type: 'checklist',
            title: language === 'ja' ? '高度な技術チェックリスト' : 'Advanced Techniques Checklist',
            description: language === 'ja' ? '以下の技術を実際に試してマスターしましょう' : 'Try and master the following techniques',
            steps: [
              {
                id: 'advanced-1',
                instruction: language === 'ja' ? 'Ctrl+テンキー1で裏面ビューに切り替える' : 'Switch to back view with Ctrl+Numpad1',
                description: language === 'ja' ? '正面の反対側から見る技術' : 'Technique to view from opposite of front',
                hint: language === 'ja' ? 'テンキー1の後にCtrlを押しながらもう一度1を押す' : 'Press Ctrl+1 after numpad 1',
                completed: false,
                required: true
              },
              {
                id: 'advanced-2', 
                instruction: language === 'ja' ? 'テンキー2,4,6,8で段階的にビューを回転' : 'Rotate view step by step with numpad 2,4,6,8',
                description: language === 'ja' ? '細かい角度調整のテクニック' : 'Technique for fine angle adjustment',
                hint: language === 'ja' ? '各キーで15度ずつ回転する' : 'Each key rotates 15 degrees',
                completed: false,
                required: true
              },
              {
                id: 'advanced-3',
                instruction: language === 'ja' ? 'Shift+Cで3Dカーソルを中心にリセット' : 'Reset 3D cursor to center with Shift+C',
                description: language === 'ja' ? '作業基準点のリセット' : 'Reset work reference point',
                hint: language === 'ja' ? 'カーソルが原点(0,0,0)に戻る' : 'Cursor returns to origin (0,0,0)',
                completed: false,
                required: true
              }
            ]
          }
        ]
      },
      completionCriteria: {
        type: 'interaction-based',
        requirements: {
          requiredInteractions: [`${lesson.id}-advanced-checklist`],
          allStepsCompleted: true
        }
      }
    });
  } else {
    // 他のレッスン用の既存の処理
    // 1. イントロダクションセクション
    sections.push({
      id: `${lesson.id}-intro`,
      type: 'introduction',
      title: `${translatedLesson?.title || lesson.title} - ${language === 'ja' ? '概要' : 'Overview'}`,
      estimatedTime: Math.ceil(lesson.duration * 0.2), // 20%の時間を概要に
      order: 0,
      content: {
        text: [
          {
            id: `${lesson.id}-intro-heading`,
            type: 'heading',
            level: 2,
            content: translatedLesson?.title || lesson.title
          },
          {
            id: `${lesson.id}-intro-desc`,
            type: 'paragraph',
            content: translatedLesson?.description || lesson.description
          },
          {
            id: `${lesson.id}-intro-time`,
            type: 'callout',
            style: 'info',
            content: language === 'ja' ? `このレッスンの予想学習時間: ${lesson.duration}分` : `Estimated learning time: ${lesson.duration} minutes`
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
    const contentSections = parseContentIntoSections(translatedLesson?.content || lesson.content, lesson.id);
    sections.push(...contentSections);
  }

  // 3. 動画セクション（動画がある場合、他のレッスン用）
  if (lesson.videoUrl && lesson.id !== '1-1' && lesson.id !== '1-2') {
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

  // 4. 演習セクション（演習がある場合、他のレッスン用）
  if (lesson.exercises && lesson.exercises.length > 0 && lesson.id !== '1-2') {
    sections.push({
      id: `${lesson.id}-exercises`,
      type: 'practice',
      title: language === 'ja' ? '実習課題' : 'Practice Exercises',
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
            hint: index === 0 ? (language === 'ja' ? '最初のステップから始めましょう' : 'Let\'s start with the first step') : undefined
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

  // 5. クイズセクション（理解度チェック、他のレッスン用）
  if (lesson.id !== '1-2') {
    const quizSection = createQuizSection(lesson, language);
    if (quizSection) {
      sections.push(quizSection);
    }
  }

  // 6. リソースセクション（リソースがある場合、他のレッスン用）
  if (lesson.resources && lesson.resources.length > 0 && lesson.id !== '1-2') {
    sections.push({
      id: `${lesson.id}-resources`,
      type: 'concept',
      title: language === 'ja' ? 'リソース・参考資料' : 'Resources & References',
      estimatedTime: 5,
      order: sections.length,
      content: {
        text: [
          {
            id: `${lesson.id}-resources-intro`,
            type: 'paragraph',
            content: language === 'ja' ? 'このレッスンに関連する追加リソースです。ダウンロードや参照にご活用ください。' : 'Additional resources related to this lesson. Please use them for downloads and reference.'
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
    title: translatedLesson?.title || lesson.title,
    description: translatedLesson?.description || lesson.description,
    sections,
    totalEstimatedTime: lesson.duration,
    difficulty: 'beginner', // デフォルトで初級
    learningObjectives: extractLearningObjectives(translatedLesson?.content || lesson.content, language),
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
const createQuizSection = (lesson: Lesson, language: string = 'en'): LessonSection | null => {
  // 翻訳されたレッスンデータを取得
  const translatedLesson = getTranslatedLesson(lesson.id, language);
  const lessonTitle = translatedLesson?.title || lesson.title;
  const lessonDescription = translatedLesson?.description || lesson.description;
  
  // レッスン内容に基づいて自動的にクイズを生成
  const quiz: QuizElement[] = [
    {
      id: `${lesson.id}-quiz-1`,
      type: 'multiple-choice',
      question: language === 'ja' ? `${lessonTitle}の主な目的は何ですか？` : `What is the main purpose of ${lessonTitle}?`,
      options: [
        lessonDescription,
        language === 'ja' ? '別の学習目標' : 'Different learning objective',
        language === 'ja' ? '関連のない内容' : 'Unrelated content',
        language === 'ja' ? '上記のすべて' : 'All of the above'
      ],
      correctAnswer: lessonDescription,
      explanation: language === 'ja' ? `正解です。${lessonTitle}は${lessonDescription}を目的としています。` : `Correct! ${lessonTitle} aims to ${lessonDescription}.`,
      points: 10
    }
  ];

  return {
    id: `${lesson.id}-quiz`,
    type: 'challenge',
    title: language === 'ja' ? '理解度チェック' : 'Understanding Check',
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
const extractLearningObjectives = (content: string, language: string = 'en'): string[] => {
  const objectives: string[] = [];
  const lines = content.split('\n');
  
  let inObjectiveSection = false;
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // 日本語と英語の両方の学習目標セクションを検出
    if (trimmed.includes('学習内容') || trimmed.includes('この講座では') || trimmed.includes('学びます') ||
        trimmed.includes('you\'ll learn') || trimmed.includes('learning objectives') || trimmed.includes('In this course')) {
      inObjectiveSection = true;
    } else if (trimmed.startsWith('- ') && inObjectiveSection) {
      objectives.push(trimmed.substring(2));
    } else if (trimmed.startsWith('#') && inObjectiveSection) {
      inObjectiveSection = false;
    }
  });
  
  // デフォルトの学習目標
  if (objectives.length === 0) {
    if (language === 'ja') {
      objectives.push('基本概念の理解', '実践的なスキルの習得', '応用力の向上');
    } else {
      objectives.push('Understanding basic concepts', 'Acquiring practical skills', 'Improving application abilities');
    }
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