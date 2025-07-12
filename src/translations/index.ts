import { Language } from '../types';

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
      title: 'Master Digital Skills with',
      titleHighlight: 'AI-Powered Learning',
      subtitle: 'Interactive courses in programming, 3D modeling, game development, and AI. Learn with personalized AI assistance in your preferred language.',
      startLearning: 'Start Learning',
      viewCourses: 'View Courses'
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
      title: 'デジタルスキルを習得',
      titleHighlight: 'AI支援型学習',
      subtitle: 'プログラミング、3Dモデリング、ゲーム開発、AI開発のインタラクティブなコース。AIアシスタントがあなたの言語でサポートします。',
      startLearning: '学習を始める',
      viewCourses: 'コースを見る'
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