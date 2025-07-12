# E-School プロジェクト 開発ガイド

## プロジェクト概要
- **プロジェクト名**: e-school (AI支援型パーソナライゼーション学習プラットフォーム)
- **技術スタック**: React 18 + TypeScript + Vite + Tailwind CSS
- **開発戦略**: 段階的AI導入（Phase 1→2→3）
- **差別化要素**: 30問診断→AI分析→個別カリキュラム生成

## 段階的AI導入戦略

### Phase 1: AI機能なしで基本システム構築（4週間）
**即座開始可能 - 現在の優先度**
- 30問診断テストシステム
- 基本スコア計算ロジック
- テンプレートベースカリキュラム
- パーソナライゼーション基盤

### Phase 2: Claude/Gemini API統合（6週間）
- AI診断結果分析
- AI生成個別カリキュラム
- 適応的推薦システム
- 高度な学習支援

### Phase 3: 高度な予測的学習支援（4週間以降）
- リアルタイム学習行動分析
- 予測的つまずき支援
- 動的カリキュラム調整

## ディレクトリ構造

```
/workspaces/e-school/
├── README.md
├── package.json
├── index.html                 # エントリーポイント
├── vite.config.ts            # Vite設定
├── tailwind.config.js        # Tailwind CSS設定
├── postcss.config.js         # PostCSS設定
├── eslint.config.js          # ESLint設定
├── tsconfig.json             # TypeScript設定（ルート）
├── tsconfig.app.json         # TypeScript設定（アプリ用）
├── tsconfig.node.json        # TypeScript設定（Node.js用）
├── dist/                     # ビルド出力
├── node_modules/             # 依存関係
└── src/                      # ソースコード
    ├── App.tsx              # メインアプリケーションコンポーネント
    ├── main.tsx             # アプリケーションエントリーポイント
    ├── index.css            # グローバルスタイル
    ├── vite-env.d.ts        # Vite型定義
    ├── components/          # 再利用可能なUIコンポーネント
    │   ├── CourseCard.tsx
    │   ├── Footer.tsx
    │   ├── LanguageMenu.tsx
    │   ├── LessonContent.tsx
    │   ├── LessonSidebar.tsx
    │   └── Navbar.tsx
    ├── contexts/            # React Context（状態管理）
    │   └── LanguageContext.tsx
    ├── hooks/               # カスタムReactフック
    │   └── useTranslation.ts
    ├── pages/               # ページコンポーネント
    │   ├── BlenderCourse.tsx
    │   ├── CourseDetail.tsx
    │   ├── GetStarted.tsx
    │   ├── Home.tsx
    │   ├── LessonViewer.tsx
    │   ├── PythonAICourse.tsx
    │   └── UnityGameCourse.tsx
    └── translations/        # 多言語対応
        └── index.ts
```

## 主要な技術仕様

### フロントエンド
- **React 18.3.1**: UIライブラリ
- **TypeScript 5.5.3**: 型安全性
- **Vite 5.4.2**: ビルドツール・開発サーバー
- **React Router 6.22.3**: ルーティング
- **Tailwind CSS 3.4.1**: CSSフレームワーク
- **Lucide React 0.344.0**: アイコンライブラリ
- **Lodash ES 4.17.21**: ユーティリティライブラリ

### 開発ツール
- **ESLint 9.9.1**: コード品質チェック
- **TypeScript ESLint 8.3.0**: TypeScript用ESLint
- **PostCSS 8.4.35**: CSS後処理
- **Autoprefixer 10.4.18**: CSSベンダープレフィックス

## アプリケーション機能

### ルーティング構造
```
/ → Home.tsx (ホームページ)
/get-started → GetStarted.tsx (開始ページ)
/courses/python-ai → PythonAICourse.tsx (Python/AIコース)
/courses/3d-modeling → BlenderCourse.tsx (3Dモデリングコース)
/courses/unity-dev → UnityGameCourse.tsx (Unityゲーム開発コース)
/learn/:courseId/:lessonId → LessonViewer.tsx (レッスン視聴)
```

### 多言語対応
- 英語（en）と日本語（ja）をサポート
- `LanguageContext`でグローバル言語状態管理
- `useTranslation`フックで翻訳機能提供
- UI要素、コース名、説明文など全体的に多言語化

### コンポーネント設計
- **レイアウト**: Navbar, Footer
- **UI**: CourseCard, LanguageMenu
- **学習**: LessonContent, LessonSidebar, LessonViewer
- **ページ**: Home, GetStarted, コース別ページ

## 開発環境
- **ポート**: デフォルトでViteの開発サーバー（通常3000または5173）
- **ビルド**: `npm run build`
- **開発**: `npm run dev`
- **リント**: `npm run lint`
- **プレビュー**: `npm run preview`

## 現在の状態
- 基本的なフレームワークとコンポーネント構造が設定済み
- 多言語対応の基盤が実装済み
- 主要なページとルーティングが定義済み
- レッスン視聴機能の骨格が用意済み
- AI支援学習プラットフォームの基礎構造が完成

## 🚀 Phase 1 推奨開発手順（即座開始可能）

### 1. 診断テストDB構築（1週間）
```sql
-- 優先実装テーブル
CREATE TABLE diagnostic_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    questions JSONB NOT NULL, -- 30問の質問データ
    version INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    test_id UUID REFERENCES diagnostic_tests(id),
    answers JSONB NOT NULL,
    raw_scores JSONB,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, test_id)
);
```

### 2. パーソナライゼーション基盤（2週間）
```typescript
// 学習者プロファイル
interface UserLearningProfile {
  learning_style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  difficulty_preference: 'easy_start' | 'challenge_driven' | 'balanced';
  pace_preference: 'slow' | 'normal' | 'fast';
  interest_areas: string[];
  skill_levels: Record<string, number>;
  personality_traits: Record<string, number>;
  motivation_factors: string[];
}

// 個別カリキュラム
interface PersonalizedCurriculum {
  recommended_path: CourseRecommendation[];
  milestones: LearningMilestone[];
  generation_method: 'template' | 'ai_generated';
  estimated_duration_weeks: number;
}
```

### 3. UI実装（1週間）
**必要なコンポーネント**
- `/src/pages/DiagnosticTest.tsx` - 30問診断テスト
- `/src/pages/PersonalizedDashboard.tsx` - 個別ダッシュボード
- `/src/components/diagnostic/QuestionCard.tsx` - 質問表示
- `/src/components/personalization/LearningPathCard.tsx` - 学習パス表示

## 🤖 Phase 2 AI統合準備

### マルチLLM対応アーキテクチャ
```typescript
// src/services/ai/LLMProvider.ts
interface LLMProvider {
  analyze(prompt: string): Promise<AIResponse>;
  generateCurriculum(profile: UserProfile): Promise<Curriculum>;
}

class ClaudeProvider implements LLMProvider {
  async analyze(prompt: string): Promise<AIResponse> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLAUDE_API_KEY}`,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    return await response.json();
  }
}
```

## 競合優位性
- **静的コース** → **動的パーソナライズ**
- **一律カリキュラム** → **AI生成個別プラン** 
- **事後分析** → **予測的支援**

## 開発のポイント
1. **段階的アプローチ** - リスク最小化
2. **既存構造活用** - 最大限の効率化
3. **機能フラグ制御** - 段階的展開
4. **AI統合準備** - 将来拡張への備え

## 環境変数設定
```env
# Phase 1
VITE_AI_FEATURES_ENABLED=false

# Phase 2で有効化
VITE_AI_ANALYSIS_ENABLED=false
VITE_CLAUDE_API_KEY=sk-your-key
VITE_GEMINI_API_KEY=your-key
VITE_AI_PROVIDER=claude
```

## 開発優先度
1. **診断テストシステム** - 最優先
2. **基本プロファイル生成** - 高
3. **テンプレートカリキュラム** - 高
4. **パーソナライズUI** - 中
5. **AI統合準備** - 低（Phase 2で対応）

## 推奨30問診断テスト構造

### 質問カテゴリー分布
- **学習スタイル** (8問): visual, auditory, kinesthetic, reading
- **スキルレベル** (6問): プログラミング、デザイン、クリエイティブツール経験
- **興味分野** (6問): Web開発、ゲーム開発、AI/ML、3DCG、音楽制作
- **性格特性** (6問): 計画的 vs 実験的、協調的 vs 独立的
- **学習動機** (4問): 達成感、創造性、社会貢献、キャリア

### 質問タイプの例
```typescript
// シナリオベース質問例
{
  id: "per_001",
  category: "personality", 
  question: "大きなプロジェクトが与えられました。あなたの行動は？",
  type: "scenario",
  scenario: {
    description: "複雑なアプリ開発プロジェクト（3ヶ月間）",
    choices: [
      { option: "まず全体を把握してから詳細計画を立てる", traits: ["analytical", "planning"] },
      { option: "とりあえず始めながら進める", traits: ["action_oriented", "experimental"] },
      { option: "類似事例を調べてから取り組む", traits: ["research_driven", "cautious"] },
      { option: "チームメンバーと相談して進める", traits: ["collaborative", "social"] }
    ]
  }
}

// スケール評価例
{
  id: "sk_001",
  category: "skill_level",
  question: "プログラミング経験はどの程度ですか？",
  type: "scale",
  scale_range: {
    min: 1, max: 5,
    labels: ["全くなし", "少しある", "基本はできる", "結構できる", "上級者"]
  }
}
```

## データベース設計詳細

### 必須テーブル（Phase 1）
```sql
-- 30問診断テスト
CREATE TABLE diagnostic_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    questions JSONB NOT NULL, -- 30問のJSON配列
    version INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 診断結果
CREATE TABLE user_diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    user_id UUID REFERENCES auth.users(id),
    test_id UUID REFERENCES diagnostic_tests(id),
    answers JSONB NOT NULL, -- 回答データ
    raw_scores JSONB, -- {"learning_style": {"visual": 4, "auditory": 2}}
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, test_id)
);

-- 学習者プロファイル
CREATE TABLE user_learning_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    learning_style VARCHAR(50), -- dominant style
    difficulty_preference VARCHAR(50),
    pace_preference VARCHAR(50), 
    interest_areas TEXT[], -- ["programming", "game_dev", "3dcg"]
    skill_levels JSONB, -- {"programming": 3, "design": 1}
    personality_traits JSONB, -- {"analytical": 0.8, "collaborative": 0.6}
    motivation_factors TEXT[], -- ["achievement", "creativity"]
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 個別カリキュラム  
CREATE TABLE personalized_curricula (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    profile_id UUID REFERENCES user_learning_profiles(id),
    curriculum_data JSONB NOT NULL, -- 推奨学習パス
    generation_method VARCHAR(50) DEFAULT 'template',
    estimated_duration_weeks INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## パーソナライゼーションロジック（Phase 1）

### 基本スコア計算
```typescript
class BasicProfileAnalyzer {
  analyzeLearningStyle(answers: DiagnosticAnswer[]): string {
    const styleScores = { visual: 0, auditory: 0, kinesthetic: 0, reading: 0 };
    
    answers
      .filter(a => a.category === 'learning_style')
      .forEach(answer => {
        // 回答パターンに基づいてスコア計算
        this.updateStyleScores(styleScores, answer);
      });
    
    return this.getDominantStyle(styleScores);
  }

  generateTemplateBasedCurriculum(profile: UserLearningProfile): PersonalizedCurriculum {
    const templates = this.loadCurriculumTemplates();
    const bestMatch = this.findBestTemplate(templates, profile);
    return this.customizeTemplate(bestMatch, profile);
  }
}
```

## AI統合準備（Phase 2対応）

### 環境変数設定
```env
# Phase 1: AI機能無効
VITE_AI_FEATURES_ENABLED=false

# Phase 2で有効化予定
VITE_AI_ANALYSIS_ENABLED=false
VITE_AI_CURRICULUM_ENABLED=false  
VITE_CLAUDE_API_KEY=sk-your-claude-key
VITE_GEMINI_API_KEY=your-gemini-key
VITE_AI_PROVIDER=claude
```

### LLM統合アーキテクチャ
```typescript
interface LLMProvider {
  name: string;
  analyze(prompt: string, context?: any): Promise<AIResponse>;
  generateCurriculum(profile: UserProfile, diagnostics: DiagnosticResult): Promise<Curriculum>;
}

class LLMManager {
  private providers: Map<string, LLMProvider>;
  
  async generatePersonalizedCurriculum(
    profile: UserLearningProfile,
    diagnostics: DiagnosticResult
  ): Promise<Curriculum> {
    if (FeatureFlags.aiCurriculumEnabled) {
      return await this.aiGenerate(profile, diagnostics);
    } else {
      return this.templateBasedGenerate(profile, diagnostics);
    }
  }
}
```

## 開発マイルストーン

### Week 1-2: 診断システム基盤
- [ ] Supabase認証統合
- [ ] 診断テストテーブル作成
- [ ] 30問質問データ準備
- [ ] 基本UI (`DiagnosticTest.tsx`)

### Week 3-4: プロファイル・カリキュラム生成
- [ ] プロファイル分析ロジック
- [ ] テンプレートカリキュラム設計
- [ ] パーソナライズダッシュボード (`PersonalizedDashboard.tsx`)
- [ ] 推薦表示機能

### Phase 2準備: AI統合インフラ
- [ ] LLMプロバイダー抽象化
- [ ] 機能フラグシステム
- [ ] コスト管理・監視
- [ ] キャッシュ戦略

## 📋 Homeページ設計仕様

### 設計思想
**「AI支援型パーソナライゼーション学習」の価値提案を明確に伝える**
- 30問診断システムを中心とした差別化要素を強調
- 学習者の個別性に焦点を当てたユーザー体験
- 段階的AI導入による信頼性の訴求

### ページ構成（上から順番）

#### 1. ヒーローセクション
**目的**: 第一印象で価値提案を伝える
- **キャッチコピー**: 「あなただけの学習プランをAIが作成」
- **サブタイトル**: 30問診断システムによるパーソナライゼーション説明
- **ビジュアル**: 診断→分析→カリキュラム生成の流れを表現
- **CTA**: 「無料診断を始める」「コースを見る」

#### 2. 30問診断システム紹介セクション
**目的**: プラットフォームの核心機能を説明
- **見出し**: 「30問で分かる、あなたの学習スタイル」
- **3ステップ表示**:
  1. 診断テスト（30問・約10分）
  2. AI分析（学習タイプ・強み・課題を特定）
  3. 個別カリキュラム生成（最適な学習順序・方法）
- **ビジュアル**: インタラクティブな診断プロセス表示
- **CTA**: 「診断テストを始める」

#### 3. AI支援学習の特徴セクション
**目的**: 他のプラットフォームとの差別化
- **4つの特徴カード**:
  1. **多言語対応AI**: 20+言語での学習サポート
  2. **個別進捗追跡**: リアルタイム学習状況分析
  3. **適応的カリキュラム**: 理解度に応じた自動調整
  4. **24/7 AIサポート**: いつでも質問・ヒント提供
- **ビジュアル**: アニメーション付きアイコン

#### 4. 学習プロセス可視化セクション
**目的**: ユーザーの学習体験を具体的にイメージさせる
- **タイムライン形式**:
  - Day 1: 診断テスト完了 → 個別プラン生成
  - Week 1: 基礎スキル習得 → AI進捗分析
  - Month 1: 実践プロジェクト → スキル証明書取得
- **進捗バーやグラフでの視覚化**

#### 5. 利用可能コースセクション
**目的**: 豊富なコンテンツラインナップを紹介
- **カテゴリ別表示**:
  - プログラミング・AI（Python、機械学習）
  - 3Dデザイン（Blender、モデリング）
  - ゲーム開発（Unity、ゲーム制作）
- **各コース**: 学習時間、難易度、受講者数、評価
- **フィルター機能**: カテゴリ、難易度、言語

#### 6. 実績・統計セクション
**目的**: プラットフォームの信頼性と実績を示す
- **数値で見る実績**:
  - 診断テスト完了者数: X,XXX人
  - 平均学習満足度: 4.8/5
  - スキル習得率: XX%
  - 対応言語数: 20+
- **視覚的なカウンターアニメーション**

#### 7. ユーザーの声セクション
**目的**: 社会的証明による信頼性向上
- **3つのテスティモニアル**:
  - 初心者からAIエンジニア転職成功
  - 3Dデザイナーとしてフリーランス独立
  - ゲーム開発で収益化達成
- **写真・名前・職業・学習期間・成果**

#### 8. 最終CTAセクション
**目的**: 行動喚起と登録促進
- **見出し**: 「今すぐ始めて、3ヶ月後の自分を変えよう」
- **ベネフィット再強調**: 
  - 無料診断テスト
  - 個別学習プラン
  - AI学習サポート
- **CTA**: 「無料で診断を始める」

### デザイン原則

#### カラーパレット
- **プライマリ**: 青系（#3B82F6）- 信頼性・知性
- **セカンダリ**: 紫系（#8B5CF6）- 創造性・AI
- **アクセント**: 緑系（#10B981）- 成長・成功
- **ニュートラル**: グレー系 - 読みやすさ

#### タイポグラフィ
- **見出し**: 太字・大きめ - インパクトと階層
- **本文**: 読みやすい行間・文字サイズ
- **CTA**: 目立つ配色・適度なサイズ

#### アニメーション・インタラクション
- **スクロールアニメーション**: セクション表示時のフェードイン
- **ホバーエフェクト**: ボタン・カードの微細な動き
- **プログレスバー**: 数値の動的表示
- **診断プロセス**: ステップ間の滑らかな遷移

### レスポンシブ対応
- **デスクトップ**: 3カラムレイアウト中心
- **タブレット**: 2カラムレイアウト
- **モバイル**: 1カラムレイアウト・大きめタップエリア

### パフォーマンス最適化
- **画像最適化**: WebP形式・遅延読み込み
- **コード分割**: セクション別の非同期読み込み
- **SEO対策**: 構造化データ・メタタグ最適化

## 🎨 魅力的なレッスンコンテンツデザイン設計

### 現在の問題点

#### 1. 単調なテキスト表示
- Markdownの基本パースのみ
- 視覚的階層が不明確
- 読み飛ばしやすい長文

#### 2. エンゲージメントの低さ
- インタラクティブ要素の欠如
- 能動的学習機会の不足
- 単方向的な情報提供

#### 3. 学習体験の改善余地
- 進捗の可視化不足
- 理解度チェック機能なし
- 実践的な学習支援が限定的

### 🎯 新しいレッスンデザインコンセプト

#### **「段階的発見型学習体験」**

**核心思想**: 学習者が能動的に発見し、体験しながら知識を構築する

### 📋 レッスンコンテンツ構成要素

#### 1. **プログレッシブ・コンテンツ表示**
```typescript
interface LessonSection {
  id: string;
  type: 'introduction' | 'concept' | 'demonstration' | 'practice' | 'challenge';
  title: string;
  content: InteractiveContent;
  completionCriteria: CompletionCriteria;
  estimatedTime: number;
}

interface InteractiveContent {
  text?: RichTextBlock[];
  media?: MediaElement[];
  interactive?: InteractiveElement[];
  quiz?: QuizElement[];
}
```

#### 2. **インタラクティブ要素タイプ**

##### **コンセプト理解支援**
- **クリック展開式説明**: 複雑な概念を段階的に開示
- **ホバーツールチップ**: 専門用語の即時説明
- **アニメーション図解**: 3Dモデリングプロセスの視覚化
- **before/after比較**: 操作結果の明確な表示

##### **実践的学習支援**
- **ステップバイステップチェックリスト**: 進行状況の可視化
- **インタラクティブ演習**: ブラウザ内での疑似操作体験
- **リアルタイム検証**: 学習者の理解度即時チェック
- **パーソナライズヒント**: 間違いに応じた個別アドバイス

##### **エンゲージメント向上**
- **達成バッジシステム**: 小さな成功の積み重ね
- **プログレスバー**: 全体および各セクションの進捗
- **学習時間追跡**: 実際の所要時間と予想時間の比較
- **コメント・ノート機能**: 個人的な学習メモ

### 🎨 視覚デザイン原則

#### **カラーコーディング戦略**
```css
/* セクションタイプ別カラーシステム */
.intro-section    { --accent: #3B82F6; } /* 青: 導入・概要 */
.concept-section  { --accent: #8B5CF6; } /* 紫: 理論・概念 */
.demo-section     { --accent: #F59E0B; } /* オレンジ: デモ・説明 */
.practice-section { --accent: #10B981; } /* 緑: 実習・練習 */
.challenge-section{ --accent: #EF4444; } /* 赤: 挑戦・応用 */
```

#### **アニメーション設計**
- **マイクロインタラクション**: ボタン、カード、プログレスバー
- **コンテンツ遷移**: フェードイン、スライド、スケール
- **フィードバック表示**: 成功、エラー、進捗の視覚的表現
- **3Dプレビュー**: Blender操作結果のプレビュー表示

#### **レスポンシブ学習体験**
- **デスクトップ**: マルチペイン（コンテンツ + プレビュー + ツール）
- **タブレット**: タブ切り替え式コンテンツ
- **モバイル**: カード型スワイプ学習

### 🔧 コンポーネント設計

#### 1. **LessonContentContainer**
```tsx
interface LessonContentProps {
  lesson: EnhancedLesson;
  userProgress: UserLessonProgress;
  onProgressUpdate: (progress: ProgressUpdate) => void;
}

// メインレイアウト管理
// セクション切り替え
// 進捗追跡
// パーソナライゼーション
```

#### 2. **InteractiveSectionCard**
```tsx
interface SectionCardProps {
  section: LessonSection;
  isActive: boolean;
  isCompleted: boolean;
  onComplete: () => void;
}

// 段階的コンテンツ表示
// 完了条件チェック
// インタラクティブ要素統合
// アニメーション管理
```

#### 3. **ProgressTracker**
```tsx
interface ProgressTrackerProps {
  totalSections: number;
  completedSections: number;
  currentSection: number;
  estimatedTimeRemaining: number;
}

// 進捗可視化
// 時間管理
// マイルストーン表示
// 達成感演出
```

#### 4. **InteractiveMedia**
```tsx
interface InteractiveMediaProps {
  type: '3d-preview' | 'step-animation' | 'comparison' | 'quiz';
  content: MediaContent;
  onInteraction: (event: InteractionEvent) => void;
}

// 3Dプレビュー（Three.js統合）
// ステップアニメーション
// インタラクティブ比較
// 埋め込みクイズ
```

### 📊 学習データ収集・分析

#### **学習行動トラッキング**
```typescript
interface LearningAnalytics {
  timeSpent: number;
  sectionsCompleted: number;
  interactionCount: number;
  difficultyEncountered: string[];
  helpRequested: string[];
  completionAccuracy: number;
}
```

#### **パーソナライゼーション要素**
- **学習ペース調整**: 理解度に応じたコンテンツ表示速度
- **コンテンツレベル**: 経験レベルに応じた詳細度調整
- **ヒント表示**: つまずきパターンに基づく個別アドバイス
- **復習推奨**: 忘却曲線に基づく復習タイミング提案

### 🎯 学習効果最大化戦略

#### **認知負荷管理**
1. **情報の段階的開示**: 一度に表示する情報量の制御
2. **視覚的階層**: 重要度に応じた情報配置
3. **集中支援**: 現在の学習ポイントのハイライト

#### **アクティブラーニング促進**
1. **即座のフィードバック**: 理解度の即時確認
2. **実践機会**: 理論の直後に実習配置
3. **挑戦レベル**: 適度な難易度設定

#### **記憶定着支援**
1. **反復学習**: 重要概念の複数回登場
2. **関連付け**: 既存知識との連結
3. **実用例**: 実際の制作事例との対応

### 🚀 実装フェーズ

#### **Phase 1: 基本インタラクティブ要素（2週間）**
- [ ] 段階的コンテンツ表示
- [ ] プログレストラッキング
- [ ] セクション完了チェック
- [ ] 基本アニメーション

#### **Phase 2: 高度なインタラクション（3週間）**
- [ ] 3Dプレビュー統合
- [ ] インタラクティブクイズ
- [ ] パーソナライズヒント
- [ ] 学習分析ダッシュボード

#### **Phase 3: AI支援学習（4週間以降）**
- [ ] 自動難易度調整
- [ ] 個別学習パス生成
- [ ] 予測的つまずき防止
- [ ] リアルタイム学習コーチング

### 💡 差別化要素

#### **他プラットフォームとの差別化**
1. **AI駆動パーソナライゼーション**: 個人の学習パターン分析
2. **リアルタイム3Dプレビュー**: ブラウザ内でのBlender結果確認
3. **段階的発見学習**: 認知科学に基づく学習体験設計
4. **多言語AI支援**: 言語・文化に応じた学習支援

#### **技術的優位性**
- **WebGL/Three.js**: ブラウザ内3D表示
- **Progressive Web App**: オフライン学習対応
- **リアルタイム同期**: 複数デバイス間での学習状況共有
- **マイクロラーニング**: 細分化された学習単位

### 📈 成功指標（KPI）

#### **学習効果指標**
- **完了率**: 85%以上（現在推定60%）
- **理解度**: 事後テストスコア90%以上
- **定着率**: 1ヶ月後復習テスト80%以上
- **満足度**: 学習体験評価4.8/5以上

#### **エンゲージメント指標**
- **セッション時間**: 平均45分以上
- **復習頻度**: 月3回以上
- **コース完了**: 開始から3ヶ月以内80%
- **推奨意向**: NPS 70以上

## 開発・運用コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# 型チェック
npm run type-check

# リント
npm run lint
```