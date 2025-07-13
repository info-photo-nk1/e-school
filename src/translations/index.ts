// Language type definition
export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const translations = {
  en: {
    nav: {
      courses: 'Courses',
      community: 'Community',
      enterprise: 'Enterprise',
      signIn: 'Sign In',
      getStarted: 'Get Started'
    },
    hero: {
      title: 'Your Personalized Learning Plan',
      titleHighlight: 'Created by AI',
      subtitle: 'Take our 30-question diagnostic test and receive a customized curriculum tailored to your learning style, goals, and experience level.',
      startDiagnostic: 'Start Free Diagnostic',
      viewCourses: 'Browse Courses',
      watchDemo: 'Watch Demo'
    },
    diagnostic: {
      title: 'Discover Your Learning Style in 30 Questions',
      subtitle: 'Our AI-powered diagnostic test creates a personalized learning journey just for you',
      step1: {
        title: 'Diagnostic Test',
        description: '30 questions, 10 minutes',
        detail: 'Answer questions about your learning preferences, experience, and goals'
      },
      step2: {
        title: 'AI Analysis',
        description: 'Instant personalization',
        detail: 'Our AI analyzes your responses to identify your learning type, strengths, and areas for growth'
      },
      step3: {
        title: 'Custom Curriculum',
        description: 'Your learning path',
        detail: 'Get a personalized curriculum with the optimal learning sequence and methods for you'
      },
      cta: 'Start Your Diagnostic Test'
    },
    aiFeatures: {
      title: 'AI-Powered Learning Experience',
      subtitle: 'Experience the future of personalized education',
      feature1: {
        title: 'Multilingual AI Support',
        description: 'Learn in 20+ languages with AI assistance that adapts to your preferred language and cultural context'
      },
      feature2: {
        title: 'Individual Progress Tracking',
        description: 'Real-time analysis of your learning behavior and progress with personalized insights and recommendations'
      },
      feature3: {
        title: 'Adaptive Curriculum',
        description: 'Your learning path automatically adjusts based on your comprehension level and learning speed'
      },
      feature4: {
        title: '24/7 AI Support',
        description: 'Get instant answers, hints, and explanations whenever you need help, day or night'
      }
    },
    learningProcess: {
      title: 'Your Learning Journey',
      subtitle: 'See how you\'ll transform your skills in just 3 months',
      day1: {
        title: 'Day 1: Get Started',
        description: 'Complete diagnostic test → Receive personalized plan'
      },
      week1: {
        title: 'Week 1: Build Foundation',
        description: 'Master basic skills → AI tracks your progress'
      },
      month1: {
        title: 'Month 1: Create Projects',
        description: 'Build real projects → Earn skill certificates'
      },
      month3: {
        title: 'Month 3: Achieve Goals',
        description: 'Portfolio ready → Career advancement'
      }
    },
    stats: {
      title: 'Trusted by Learners Worldwide',
      diagnostics: 'Diagnostic Tests Completed',
      satisfaction: 'Average Satisfaction Rating',
      completion: 'Skill Mastery Rate',
      languages: 'Supported Languages'
    },
    testimonials: {
      title: 'Success Stories',
      subtitle: 'Real learners, real results',
      testimonial1: {
        name: 'Sarah Chen',
        role: 'AI Engineer at TechCorp',
        duration: '4 months',
        quote: 'The personalized Python AI course helped me transition from marketing to AI engineering. The diagnostic test identified my visual learning style perfectly.',
        achievement: 'Career Change Success'
      },
      testimonial2: {
        name: 'Marcus Rodriguez',
        role: 'Freelance 3D Artist',
        duration: '3 months',
        quote: 'Blender was intimidating until the AI customized my learning path. Now I\'m creating characters for indie games and earning $4000/month.',
        achievement: 'Freelance Independence'
      },
      testimonial3: {
        name: 'Akiko Tanaka',
        role: 'Indie Game Developer',
        duration: '6 months',
        quote: 'My first Unity game earned $15,000 in its first month. The personalized curriculum made complex concepts feel manageable.',
        achievement: 'Revenue Generation'
      }
    },
    featuredCourses: {
      title: 'Featured Learning Paths',
      subtitle: 'Explore our most popular courses designed for career transformation',
      viewAll: 'View All Courses',
      course1: {
        title: 'Python for AI & Machine Learning',
        description: 'Master Python programming and build real AI applications with hands-on projects. Perfect for beginners starting their AI journey.',
        category: 'AI/ML',
        level: 'Beginner',
        duration: '28 hours',
        students: '2,156',
        rating: '4.9',
        highlights: ['NumPy & Pandas', 'Machine Learning', 'Neural Networks', 'Real Projects']
      },
      course2: {
        title: '3D Character Modeling in Blender',
        description: 'Create stunning 3D characters using industry-standard techniques. From basic modeling to advanced texturing and rendering.',
        category: '3D Design',
        level: 'Beginner',
        duration: '12 hours',
        students: '1,834',
        rating: '4.8',
        highlights: ['Character Design', 'Texturing', 'Rigging Basics', 'Portfolio Ready']
      },
      course3: {
        title: 'Unity Game Development',
        description: 'Build complete games from scratch using Unity. Learn C# programming, game physics, and monetization strategies.',
        category: 'Game Dev',
        level: 'Intermediate',
        duration: '16 hours',
        students: '1,567',
        rating: '4.7',
        highlights: ['C# Programming', '2D & 3D Games', 'Physics & AI', 'Publishing']
      }
    },
    finalCta: {
      title: 'Transform Your Future in 3 Months',
      subtitle: 'Join thousands of learners who discovered their potential through personalized AI education',
      benefit1: 'Free 30-question diagnostic test',
      benefit2: 'Personalized learning curriculum',
      benefit3: '24/7 AI learning support',
      benefit4: 'Industry-recognized certificates',
      cta: 'Start Your Free Diagnostic',
      guarantee: '100% Free to start - No credit card required'
    },
    features: {
      languages: {
        title: '20+ Languages',
        description: 'Learn in your native language with AI-powered translation'
      },
      ai: {
        title: 'AI Assistant',
        description: 'Get instant help and feedback from our AI tutor'
      },
      projects: {
        title: 'Project-Based',
        description: 'Build real projects and get certified'
      }
    },
    courses: {
      title: 'Featured Courses',
      searchPlaceholder: 'Search courses...',
      level: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      students: 'students'
    },
    blenderCourse: {
      title: '3D Character Modeling in Blender',
      description: 'Master the art of 3D character modeling using Blender. Learn industry-standard techniques for creating stunning 3D characters from concept to final render.',
      category: '3D Design',
      startLearning: 'Start Learning',
      courseModules: 'Course Modules',
      whatYouLearn: 'What you\'ll learn',
      prerequisites: 'Prerequisites',
      hours: 'hours',
      modules: 'modules',
      certificate: 'Certificate',
      moduleContent: {
        module1: {
          title: 'Getting Started with Blender',
          topics: [
            'Introduction to 3D Modeling',
            'Navigating the Interface',
            'Essential Tools',
            'Basic Mesh Modeling'
          ]
        },
        module2: {
          title: 'Advanced Modeling',
          topics: [
            'Modifiers',
            'Sculpting',
            'UV Unwrapping',
            'Texturing'
          ]
        },
        module3: {
          title: 'Materials and Texturing',
          topics: [
            'Material Basics',
            'PBR Materials',
            'Texture Painting',
            'Node Editor'
          ]
        },
        module4: {
          title: 'Lighting and Rendering',
          topics: [
            'Lighting Setup',
            'Camera Settings',
            'Rendering Basics',
            'Post-Processing'
          ]
        }
      },
      learningOutcomes: [
        'Create professional 3D character models',
        'Master Blender\'s modeling tools and workflows',
        'UV unwrapping and texture painting',
        'Rendering and presentation techniques'
      ],
      prerequisitesList: [
        'Basic computer skills',
        'No prior 3D modeling experience required',
        'Blender software (free)',
        'Computer with dedicated graphics recommended'
      ]
    },
    lessonViewer: {
      notFound: {
        title: 'Lesson Not Found',
        description: 'The specified lesson does not exist.',
        backButton: 'Return to First Lesson'
      },
      progress: 'Progress',
      lessons: 'lessons',
      practiceExercises: 'Practice Exercises',
      exercise: 'Exercise',
      instructions: 'Instructions:',
      expectedResult: 'Expected Result:',
      lessonResources: 'Lesson Resources',
      clickToPlay: 'Click to play video',
      open: 'Open',
      download: 'Download'
    },
    coursesOverview: {
      title: 'Explore Our Courses',
      subtitle: 'Discover a wide range of courses designed to help you master new skills and advance your career. From programming to design, we have something for everyone.',
      searchPlaceholder: 'Search courses...',
      stats: {
        coursesAvailable: 'Courses Available',
        studentsEnrolled: 'Students Enrolled',
        averageRating: 'Average Rating'
      },
      filters: {
        filterBy: 'Filter by:',
        category: 'Category:',
        difficulty: 'Difficulty:'
      },
      categories: {
        all: 'All',
        programming: 'Programming',
        design: 'Design',
        gameDev: 'Game Dev'
      },
      difficulty: {
        all: 'All',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      coursesFound: '{count} Course{s} Found',
      description: 'Choose from our selection of high-quality courses designed by industry experts',
      viewCourse: 'View Course',
      students: 'students',
      noResults: {
        title: 'No courses found',
        description: 'Try adjusting your search criteria or filters to find the perfect course.',
        clearFilters: 'Clear Filters'
      },
      courseData: {
        pythonAi: {
          title: 'Python for AI & Machine Learning',
          description: 'Master Python programming and build real AI applications with hands-on projects.'
        },
        blender3d: {
          title: '3D Character Modeling in Blender',
          description: 'Create stunning 3D characters using industry-standard techniques in Blender.'
        },
        unityDev: {
          title: 'Unity Game Development Fundamentals',
          description: 'Learn game development from scratch and create your own games.'
        }
      }
    },
    time: {
      hours: 'hours',
      minutes: 'min',
      hoursShort: 'h',
      minutesShort: 'm'
    },
    courseDashboard: {
      notFound: {
        title: 'Course Not Found',
        description: 'The specified course does not exist.',
        backToCourses: 'Back to Course List'
      },
      breadcrumb: {
        home: 'Home',
        courses: 'Courses'
      },
      progress: 'Progress',
      overview: {
        title: 'Course Overview',
        completedLessons: 'Completed Lessons',
        studyTime: 'Study Time (min)',
        progressRate: 'Progress Rate',
        remainingTime: 'Remaining Time (hours)'
      },
      nextLesson: {
        title: '📚 Next Recommended Lesson',
        startButton: 'Start'
      },
      lessonList: {
        title: 'Lesson List',
        lesson: 'Lesson',
        studiedTime: 'Studied',
        completed: 'Completed'
      },
      goals: {
        title: 'Learning Goals',
        goal1: 'Master Blender basics',
        goal2: 'Understand 3D modeling fundamentals',
        goal3: 'Create original characters'
      },
      achievements: {
        title: 'Achievement Badges',
        firstCompletion: {
          title: 'First Completion',
          description: 'Completed first lesson'
        },
        continuousLearning: {
          title: 'Continuous Learning',
          description: 'Completed 3 lessons'
        },
        courseCompletion: {
          title: 'Course Completion',
          description: 'Completed all lessons'
        }
      },
      stats: {
        title: 'Learning Statistics',
        weeklyTime: 'This week\'s study time',
        avgSession: 'Average session time',
        lastStudy: 'Last study',
        today: 'Today'
      }
    },
    footer: {
      about: 'Master digital skills with AI-powered learning in your preferred language.',
      platform: 'Platform',
      resources: 'Resources',
      company: 'Company',
      copyright: '© 2024 SkillsAI. All rights reserved.'
    }
  },
  ja: {
    nav: {
      courses: 'コース',
      community: 'コミュニティ',
      enterprise: '法人向け',
      signIn: 'ログイン',
      getStarted: '始める'
    },
    hero: {
      title: 'あなただけの学習プランを',
      titleHighlight: 'AIが作成',
      subtitle: '30問の診断テストを受けて、あなたの学習スタイル、目標、経験レベルに合わせてカスタマイズされたカリキュラムを受け取りましょう。',
      startDiagnostic: '無料診断を始める',
      viewCourses: 'コースを見る',
      watchDemo: 'デモを見る'
    },
    diagnostic: {
      title: '30問でわかる、あなたの学習スタイル',
      subtitle: 'AI支援診断テストで、あなただけのパーソナライズされた学習ジャーニーを作成します',
      step1: {
        title: '診断テスト',
        description: '30問・約10分',
        detail: '学習の好み、経験、目標について質問にお答えください'
      },
      step2: {
        title: 'AI分析',
        description: '瞬時にパーソナライズ',
        detail: 'AIがあなたの回答を分析し、学習タイプ、強み、成長領域を特定します'
      },
      step3: {
        title: '個別カリキュラム',
        description: 'あなたの学習パス',
        detail: 'あなたに最適な学習順序と方法でパーソナライズされたカリキュラムを取得'
      },
      cta: '診断テストを始める'
    },
    aiFeatures: {
      title: 'AI支援学習体験',
      subtitle: 'パーソナライズド教育の未来を体験してください',
      feature1: {
        title: '多言語AIサポート',
        description: '20以上の言語で学習でき、あなたの好みの言語と文化的背景に適応するAIアシスタント'
      },
      feature2: {
        title: '個別進捗追跡',
        description: '学習行動と進捗のリアルタイム分析により、パーソナライズされた洞察と推奨事項を提供'
      },
      feature3: {
        title: '適応的カリキュラム',
        description: '理解度と学習スピードに基づいて学習パスが自動的に調整されます'
      },
      feature4: {
        title: '24時間AIサポート',
        description: '昼夜を問わず、必要な時にいつでも即座に回答、ヒント、説明を取得'
      }
    },
    learningProcess: {
      title: 'あなたの学習ジャーニー',
      subtitle: 'たった3ヶ月でスキルがどう変わるかをご覧ください',
      day1: {
        title: '1日目：スタート',
        description: '診断テスト完了 → パーソナライズプラン受信'
      },
      week1: {
        title: '1週間目：基礎構築',
        description: '基本スキル習得 → AI進捗追跡'
      },
      month1: {
        title: '1ヶ月目：プロジェクト作成',
        description: '実践プロジェクト構築 → スキル証明書取得'
      },
      month3: {
        title: '3ヶ月目：目標達成',
        description: 'ポートフォリオ完成 → キャリアアップ'
      }
    },
    stats: {
      title: '世界中の学習者に信頼されています',
      diagnostics: '診断テスト完了者数',
      satisfaction: '平均満足度評価',
      completion: 'スキル習得率',
      languages: '対応言語数'
    },
    testimonials: {
      title: '成功事例',
      subtitle: '実際の学習者、実際の成果',
      testimonial1: {
        name: '田中 花子',
        role: 'TechCorp AI エンジニア',
        duration: '4ヶ月',
        quote: 'パーソナライズされたPython AIコースのおかげで、マーケティングからAIエンジニアに転職できました。診断テストで私の視覚学習スタイルを完璧に特定してくれました。',
        achievement: 'キャリアチェンジ成功'
      },
      testimonial2: {
        name: 'ロドリゲス マルコス',
        role: 'フリーランス3Dアーティスト',
        duration: '3ヶ月',
        quote: 'Blenderは難しそうでしたが、AIが私の学習パスをカスタマイズしてくれました。今はインディーゲーム用のキャラクターを作成し、月収40万円を稼いでいます。',
        achievement: 'フリーランス独立'
      },
      testimonial3: {
        name: '佐藤 明子',
        role: 'インディーゲーム開発者',
        duration: '6ヶ月',
        quote: '初めてのUnityゲームで最初の月に150万円の収益を上げました。パーソナライズされたカリキュラムのおかげで複雑な概念が理解しやすくなりました。',
        achievement: '収益化達成'
      }
    },
    featuredCourses: {
      title: '注目の学習パス',
      subtitle: 'キャリア変革のために設計された人気コースをご覧ください',
      viewAll: 'すべてのコースを見る',
      course1: {
        title: 'Python AI・機械学習コース',
        description: 'Pythonプログラミングを習得し、実践的なプロジェクトで本格的なAIアプリケーションを構築。AI分野への第一歩に最適です。',
        category: 'AI/ML',
        level: '初級',
        duration: '28時間',
        students: '2,156',
        rating: '4.9',
        highlights: ['NumPy & Pandas', '機械学習', 'ニューラルネットワーク', '実践プロジェクト']
      },
      course2: {
        title: 'Blender 3Dキャラクターモデリング',
        description: '業界標準技術を使用して魅力的な3Dキャラクターを作成。基本モデリングから高度なテクスチャリング・レンダリングまで。',
        category: '3Dデザイン',
        level: '初級',
        duration: '12時間',
        students: '1,834',
        rating: '4.8',
        highlights: ['キャラクターデザイン', 'テクスチャリング', 'リギング基礎', 'ポートフォリオ制作']
      },
      course3: {
        title: 'Unity ゲーム開発',
        description: 'Unityを使ってゼロから本格的なゲームを構築。C#プログラミング、ゲーム物理学、収益化戦略を学習。',
        category: 'ゲーム開発',
        level: '中級',
        duration: '16時間',
        students: '1,567',
        rating: '4.7',
        highlights: ['C#プログラミング', '2D & 3Dゲーム', '物理学 & AI', 'パブリッシング']
      }
    },
    finalCta: {
      title: '3ヶ月で未来を変えよう',
      subtitle: 'パーソナライズされたAI教育を通じて自分の可能性を発見した数千人の学習者の仲間入りをしましょう',
      benefit1: '無料30問診断テスト',
      benefit2: 'パーソナライズされた学習カリキュラム',
      benefit3: '24時間AIサポート',
      benefit4: '業界認定証明書',
      cta: '無料診断を始める',
      guarantee: '開始は100%無料 - クレジットカード不要'
    },
    features: {
      languages: {
        title: '20以上の言語',
        description: 'AI翻訳で母国語での学習が可能'
      },
      ai: {
        title: 'AIアシスタント',
        description: 'AIチューターからの即時サポートとフィードバック'
      },
      projects: {
        title: 'プロジェクト型',
        description: '実践的なプロジェクトと認定証の取得'
      }
    },
    courses: {
      title: '注目のコース',
      searchPlaceholder: 'コースを検索...',
      level: {
        beginner: '初級',
        intermediate: '中級',
        advanced: '上級'
      },
      students: '受講生'
    },
    blenderCourse: {
      title: 'Blenderで3Dキャラクターモデリング',
      description: 'Blenderを使った3Dキャラクターモデリングの技術を習得します。コンセプトから最終レンダリングまで、業界標準の技術で美しい3Dキャラクターを作成する方法を学びます。',
      category: '3Dデザイン',
      startLearning: '学習を始める',
      courseModules: 'コースモジュール',
      whatYouLearn: '学習内容',
      prerequisites: '前提条件',
      hours: '時間',
      modules: 'モジュール',
      certificate: '認定証',
      moduleContent: {
        module1: {
          title: 'Blenderの基礎',
          topics: [
            '3Dモデリング入門',
            'インターフェースの操作',
            '基本ツール',
            'メッシュモデリングの基礎'
          ]
        },
        module2: {
          title: '高度なモデリング',
          topics: [
            'モディファイアー',
            'スカルプティング',
            'UVアンラッピング',
            'テクスチャリング'
          ]
        },
        module3: {
          title: 'マテリアルとテクスチャ',
          topics: [
            'マテリアルの基礎',
            'PBRマテリアル',
            'テクスチャペイント',
            'ノードエディター'
          ]
        },
        module4: {
          title: 'ライティングとレンダリング',
          topics: [
            'ライティング設定',
            'カメラ設定',
            'レンダリングの基礎',
            'ポストプロセッシング'
          ]
        }
      },
      learningOutcomes: [
        'プロフェッショナルな3Dキャラクターモデルの作成',
        'Blenderのモデリングツールとワークフローの習得',
        'UVアンラッピングとテクスチャペイント',
        'レンダリングとプレゼンテーション技術'
      ],
      prerequisitesList: [
        '基本的なコンピュータースキル',
        '3Dモデリング経験は不要',
        'Blenderソフトウェア（無料）',
        '専用グラフィックス搭載PCを推奨'
      ]
    },
    lessonViewer: {
      notFound: {
        title: 'レッスンが見つかりません',
        description: '指定されたレッスンは存在しません。',
        backButton: '最初のレッスンに戻る'
      },
      progress: '進捗',
      lessons: 'レッスン',
      practiceExercises: '実習課題',
      exercise: '課題',
      instructions: '手順:',
      expectedResult: '期待される結果:',
      lessonResources: 'レッスンリソース',
      clickToPlay: 'クリックして動画を再生',
      open: '開く',
      download: 'ダウンロード'
    },
    coursesOverview: {
      title: 'コース一覧',
      subtitle: 'キャリアアップに役立つ新しいスキルを習得できる幅広いコースをご覧ください。プログラミングからデザインまで、すべてのレベルに対応したコースをご用意しています。',
      searchPlaceholder: 'コースを検索...',
      stats: {
        coursesAvailable: 'コース数',
        studentsEnrolled: '受講生数',
        averageRating: '平均評価'
      },
      filters: {
        filterBy: 'フィルター:',
        category: 'カテゴリ:',
        difficulty: '難易度:'
      },
      categories: {
        all: 'すべて',
        programming: 'プログラミング',
        design: 'デザイン',
        gameDev: 'ゲーム開発'
      },
      difficulty: {
        all: 'すべて',
        beginner: '初級',
        intermediate: '中級',
        advanced: '上級'
      },
      coursesFound: '{count}件のコースが見つかりました',
      description: '業界エキスパートが設計した高品質なコースから選択してください',
      viewCourse: 'コースを見る',
      students: '受講生',
      noResults: {
        title: 'コースが見つかりません',
        description: '検索条件やフィルターを調整して、最適なコースを見つけてください。',
        clearFilters: 'フィルターをクリア'
      },
      courseData: {
        pythonAi: {
          title: 'Python AI・機械学習コース',
          description: 'Pythonプログラミングを習得し、実践的なプロジェクトで本格的なAIアプリケーションを構築します。'
        },
        blender3d: {
          title: 'Blender 3Dキャラクターモデリング',
          description: 'Blenderで業界標準技術を使用して、魅力的な3Dキャラクターを作成します。'
        },
        unityDev: {
          title: 'Unity ゲーム開発基礎',
          description: 'ゲーム開発をゼロから学び、あなた自身のゲームを作成しましょう。'
        }
      }
    },
    time: {
      hours: '時間',
      minutes: '分',
      hoursShort: '時間',
      minutesShort: '分'
    },
    courseDashboard: {
      notFound: {
        title: 'コースが見つかりません',
        description: '指定されたコースは存在しません。',
        backToCourses: 'コース一覧に戻る'
      },
      breadcrumb: {
        home: 'ホーム',
        courses: 'コース'
      },
      progress: '進捗',
      overview: {
        title: 'コース概要',
        completedLessons: '完了レッスン',
        studyTime: '学習時間(分)',
        progressRate: '進捗率',
        remainingTime: '残り時間(時)'
      },
      nextLesson: {
        title: '📚 次の推奨レッスン',
        startButton: '開始する'
      },
      lessonList: {
        title: 'レッスン一覧',
        lesson: 'レッスン',
        studiedTime: '学習済み',
        completed: '完了'
      },
      goals: {
        title: '学習目標',
        goal1: 'Blenderの基本操作をマスター',
        goal2: '3Dモデリングの基礎理解',
        goal3: 'オリジナルキャラクター作成'
      },
      achievements: {
        title: '達成バッジ',
        firstCompletion: {
          title: '初回完了',
          description: '最初のレッスンを完了'
        },
        continuousLearning: {
          title: '継続学習',
          description: '3つのレッスンを完了'
        },
        courseCompletion: {
          title: 'コース完了',
          description: '全てのレッスンを完了'
        }
      },
      stats: {
        title: '学習統計',
        weeklyTime: '今週の学習時間',
        avgSession: '平均セッション時間',
        lastStudy: '最後の学習',
        today: '今日'
      }
    },
    footer: {
      about: 'AI支援型学習で、あなたの言語でデジタルスキルを習得できます。',
      platform: 'プラットフォーム',
      resources: 'リソース',
      company: '会社情報',
      copyright: '© 2024 SkillsAI. All rights reserved.'
    }
  },
  // Add other languages similarly...
} as const;

export type TranslationKey = keyof typeof translations.en;
export type NestedTranslationKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? `${string & K}.${string & keyof T[K]}`
    : K;
}[keyof T];

export type TranslationType = typeof translations.en;

// Helper function to get nested translation keys
export const getNestedValue = (obj: any, key: string): string => {
  return key.split('.').reduce((o, i) => o?.[i], obj) || key;
};