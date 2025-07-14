// Enhanced Lesson Types for Interactive Learning Experience

export interface LessonSection {
  id: string;
  type: 'introduction' | 'concept' | 'demonstration' | 'practice' | 'challenge';
  title: string;
  content: InteractiveContent;
  completionCriteria: CompletionCriteria;
  estimatedTime: number; // minutes
  order: number;
}

export interface InteractiveContent {
  text?: RichTextBlock[];
  media?: MediaElement[];
  interactive?: InteractiveElement[];
  quiz?: QuizElement[];
}

export interface RichTextBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'list' | 'code' | 'callout' | 'expandable';
  content: string;
  level?: number; // for headings
  style?: 'info' | 'warning' | 'success' | 'error';
  expandable?: {
    summary: string;
    details: string;
  };
  tooltip?: {
    trigger: string;
    content: string;
  };
}

export interface MediaElement {
  id: string;
  type: 'image' | 'video' | '3d-preview' | 'animation' | 'comparison';
  url: string;
  alt?: string;
  caption?: string;
  interactive?: boolean;
  beforeAfter?: {
    before: string;
    after: string;
    labels: { before: string; after: string };
  };
}

export interface InteractiveElement {
  id: string;
  type: 'checklist' | 'step-tracker' | 'simulator' | 'drag-drop' | 'hotspot' | 'blender-interface' | 'navigation-practice';
  title: string;
  description?: string;
  steps?: ChecklistStep[];
  config?: Record<string, any>;
}

export interface ChecklistStep {
  id: string;
  instruction: string;
  description?: string;
  hint?: string;
  completed: boolean;
  required: boolean;
}

export interface QuizElement {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'drag-drop' | 'practical';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
  points: number;
}

export interface CompletionCriteria {
  type: 'time-based' | 'interaction-based' | 'quiz-based' | 'manual';
  requirements: {
    minimumTime?: number; // seconds
    requiredInteractions?: string[]; // interaction IDs
    minimumQuizScore?: number; // percentage
    allStepsCompleted?: boolean;
  };
}

export interface EnhancedLesson {
  id: string;
  title: string;
  description: string;
  sections: LessonSection[];
  totalEstimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  learningObjectives: string[];
  tags: string[];
  version: string;
}

export interface UserLessonProgress {
  lessonId: string;
  userId: string;
  sectionsProgress: SectionProgress[];
  overallProgress: number; // 0-100
  timeSpent: number; // seconds
  lastAccessed: Date;
  completed: boolean;
  score?: number;
  achievements: Achievement[];
}

export interface SectionProgress {
  sectionId: string;
  completed: boolean;
  timeSpent: number;
  interactionsCompleted: string[];
  quizScores: Record<string, number>;
  notes?: string;
  lastAccessed: Date;
}

export interface Achievement {
  id: string;
  type: 'completion' | 'speed' | 'accuracy' | 'engagement' | 'milestone';
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  points: number;
}

export interface ProgressUpdate {
  sectionId: string;
  type: 'section-start' | 'section-complete' | 'interaction' | 'quiz-complete' | 'time-update';
  data: Record<string, any>;
  timestamp: Date;
}

export interface LearningAnalytics {
  timeSpent: number;
  sectionsCompleted: number;
  interactionCount: number;
  difficultyEncountered: string[];
  helpRequested: string[];
  completionAccuracy: number;
  engagementLevel: number;
  learningPace: 'slow' | 'normal' | 'fast';
  strugglingAreas: string[];
}

// Color coding for section types
export const SECTION_COLORS = {
  introduction: {
    accent: '#3B82F6',    // blue
    bg: '#EFF6FF',
    border: '#DBEAFE'
  },
  concept: {
    accent: '#8B5CF6',    // purple
    bg: '#F5F3FF',
    border: '#E9D5FF'
  },
  demonstration: {
    accent: '#F59E0B',    // orange
    bg: '#FFFBEB',
    border: '#FED7AA'
  },
  practice: {
    accent: '#10B981',    // green
    bg: '#ECFDF5',
    border: '#BBF7D0'
  },
  challenge: {
    accent: '#EF4444',    // red
    bg: '#FEF2F2',
    border: '#FECACA'
  }
} as const;

export type SectionType = keyof typeof SECTION_COLORS;