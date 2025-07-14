// レッスン内容の翻訳データ
export const lessonTranslations = {
  en: {
    "1-1": {
      title: "Introduction to 3D Modeling",
      description: "Understanding the world of 3D graphics and what makes Blender special",
      content: `# Welcome to 3D Modeling with Blender

## What is 3D Modeling?

3D modeling is the process of creating a mathematical coordinate-based representation of any surface of an object in three dimensions via specialized software.

## Why Blender?

Blender is a free and open-source 3D creation suite that supports:
- Modeling, rigging, animation, simulation, rendering
- Compositing and motion tracking
- Video editing and game creation

## Course Overview

In this course, you'll learn:
1. **Basic Navigation** - How to move around in 3D space
2. **Essential Tools** - The tools you'll use most often
3. **Modeling Techniques** - Creating 3D objects from scratch
4. **Materials & Texturing** - Making your models look realistic
5. **Lighting & Rendering** - Bringing your creations to life

Let's begin your journey into the exciting world of 3D modeling!`,
      resources: [
        {
          title: "Blender Download",
          description: "Download the latest version of Blender (free)"
        },
        {
          title: "Blender Shortcuts Cheatsheet",
          description: "Essential keyboard shortcuts for Blender"
        }
      ]
    },
    "1-2": {
      title: "Navigating the Blender Interface",
      description: "Master the Blender interface and learn to navigate in 3D space",
      content: `# Navigating the Blender Interface

## Blender's Default Layout

When you first open Blender, you'll see several areas:

### 1. 3D Viewport (Center)
- This is where you'll do most of your work
- Shows your 3D scene from different angles
- Contains the default cube, camera, and light

### 2. Outliner (Top Right)
- Shows all objects in your scene
- Allows you to select, hide, and organize objects

### 3. Properties Panel (Bottom Right)
- Contains all object and scene settings
- Different tabs for different types of properties

### 4. Timeline (Bottom)
- Used for animation (we'll cover this later)

## Essential Navigation

### Mouse Navigation
- **Middle Mouse Button + Drag**: Rotate view
- **Shift + Middle Mouse + Drag**: Pan view
- **Scroll Wheel**: Zoom in/out

### Keyboard Shortcuts
- **Numpad 1, 3, 7**: Front, Right, Top views
- **Numpad 5**: Toggle Orthographic/Perspective
- **Home**: Frame all objects
- **Numpad Period**: Frame selected object

## Selection Methods
- **Left Click**: Select object
- **Shift + Left Click**: Add to selection
- **A**: Select all
- **Alt + A**: Deselect all
- **B**: Box select
- **C**: Circle select

Practice these navigation techniques - they'll become second nature!`
    },
    "1-3": {
      title: "Essential Tools and Interface Elements",
      description: "Learn the most important tools and interface elements you'll use daily",
      content: `# Essential Tools and Interface Elements

## The Tool Shelf (Left Side)

### Selection Tools
- **Select Box (B)**: Drag to select multiple objects
- **Select Circle (C)**: Click and drag to select
- **Select Lasso**: Draw a selection area

### Basic Tools
- **Move (G)**: Grab and move objects
- **Rotate (R)**: Rotate objects
- **Scale (S)**: Make objects bigger or smaller

## Working with Objects

### Adding Objects
- **Shift + A**: Add menu
- Choose from Mesh, Light, Camera, etc.

### Deleting Objects
- **X or Delete**: Delete selected object
- Choose "Delete" from the menu

### Transforming Objects

#### Moving Objects
1. Select object
2. Press **G** (Grab)
3. Move mouse to position
4. Click to confirm or press Enter
5. Press Escape to cancel

#### Constraining Movement
- **G + X**: Move only on X-axis
- **G + Y**: Move only on Y-axis  
- **G + Z**: Move only on Z-axis
- **G + Shift + Z**: Move on X and Y axes (not Z)

#### Rotating Objects
1. Select object
2. Press **R** (Rotate)
3. Move mouse to rotate
4. **R + X/Y/Z**: Rotate around specific axis

#### Scaling Objects
1. Select object
2. Press **S** (Scale)
3. Move mouse to scale
4. **S + X/Y/Z**: Scale on specific axis
5. **S + Shift + Z**: Scale on X and Y (not Z)

## Edit Mode vs Object Mode

### Object Mode
- Default mode
- Work with entire objects
- Move, rotate, scale whole objects

### Edit Mode
- **Tab**: Enter/exit Edit Mode
- Edit individual vertices, edges, and faces
- This is where detailed modeling happens

Practice these tools with the default cube!`
    },
    "1-4": {
      title: "Basic Mesh Modeling",
      description: "Create your first 3D model by learning basic mesh editing techniques",
      content: `# Basic Mesh Modeling

## Understanding Meshes

A mesh is made up of three basic components:
- **Vertices**: Points in 3D space
- **Edges**: Lines connecting vertices
- **Faces**: Flat surfaces bounded by edges

## Edit Mode Basics

### Entering Edit Mode
- Select an object
- Press **Tab** to enter Edit Mode
- The object will show its mesh structure

### Selection Modes
- **1**: Vertex select mode
- **2**: Edge select mode  
- **3**: Face select mode
- **Shift + 1/2/3**: Multiple selection modes

## Basic Mesh Operations

### Extrude (E)
Creates new geometry by extending selected elements
1. Select faces/edges/vertices
2. Press **E** (Extrude)
3. Move mouse to extend
4. Click to confirm

### Inset (I)
Creates faces inside selected faces
1. Select face(s)
2. Press **I** (Inset)
3. Move mouse to adjust size
4. Click to confirm

### Loop Cut (Ctrl + R)
Adds edge loops across an object
1. Press **Ctrl + R**
2. Hover over object to preview
3. Click to confirm position
4. Move mouse to adjust position
5. Click again to confirm

### Bevel (Ctrl + B)
Rounds off sharp edges
1. Select edges or vertices
2. Press **Ctrl + B**
3. Move mouse to adjust bevel size
4. Scroll wheel to add more segments

## Creating a Simple House

Let's practice by creating a basic house:

### Step 1: Start with a Cube
- Delete default cube (X)
- Add new cube (Shift + A > Mesh > Cube)
- Scale it up slightly (S, then 1.5)

### Step 2: Create the Base
- Enter Edit Mode (Tab)
- Select top face (3 for face mode, click top)
- Extrude up (E, then move up)

### Step 3: Create the Roof
- Keep top face selected
- Inset slightly (I, move mouse in a bit)
- Extrude up again for roof peak

### Step 4: Add Details
- Add loop cuts for windows (Ctrl + R)
- Select face where window should be
- Inset to create window frame
- Extrude inward slightly for depth

This is your first 3D model!`
    },
    "2-1": {
      title: "Introduction to Modifiers",
      description: "Learn how modifiers can enhance your modeling workflow",
      content: `# Introduction to Modifiers

## What are Modifiers?

Modifiers are automatic operations that affect an object's geometry in a non-destructive way. They can:
- Add complexity without manually editing every vertex
- Create effects that would be difficult to achieve manually
- Maintain editability of the base mesh

## Common Modifiers

### Mirror Modifier
Creates symmetrical objects
- Perfect for characters, vehicles, buildings
- Edit one side, the other updates automatically

### Subdivision Surface
Smooths and adds detail to your mesh
- Makes low-poly models appear smooth
- Essential for organic modeling

### Array Modifier
Duplicates objects in patterns
- Create fences, stairs, repeated elements
- Can follow curves for complex arrangements

### Solidify Modifier
Gives thickness to flat surfaces
- Turn a plane into a wall
- Add thickness to clothing or thin objects

## Applying Modifiers

1. Select object
2. Go to Properties Panel > Modifier Properties (wrench icon)
3. Click "Add Modifier"
4. Choose modifier type
5. Adjust settings
6. Apply when satisfied (or keep non-destructive)

Let's practice with some examples!`
    }
  },
  ja: {
    "1-1": {
      title: "3Dモデリング入門",
      description: "3Dグラフィックスの世界とBlenderの特徴について理解します",
      content: `# Blenderで3Dモデリングへようこそ

## 3Dモデリングとは？

3Dモデリングとは、専用ソフトウェアを使用して、オブジェクトの表面を3次元の数学的座標ベースで表現するプロセスです。

## なぜBlenderなのか？

Blenderは無料でオープンソースの3D制作スイートで、以下をサポートしています：
- モデリング、リギング、アニメーション、シミュレーション、レンダリング
- コンポジットとモーショントラッキング
- 動画編集とゲーム制作

## コース概要

このコースでは以下を学習します：
1. **基本ナビゲーション** - 3D空間での移動方法
2. **必須ツール** - 最も頻繁に使用するツール
3. **モデリング技術** - ゼロから3Dオブジェクトを作成
4. **マテリアルとテクスチャ** - モデルをリアルに見せる方法
5. **ライティングとレンダリング** - 作品に命を吹き込む

エキサイティングな3Dモデリングの世界への旅を始めましょう！`,
      resources: [
        {
          title: "Blenderダウンロード",
          description: "Blenderの最新版をダウンロード（無料）"
        },
        {
          title: "Blenderショートカット一覧",
          description: "Blenderの必須キーボードショートカット"
        }
      ]
    },
    "1-2": {
      title: "Blenderインターフェースのナビゲーション",
      description: "Blenderインターフェースをマスターし、3D空間でのナビゲーションを学習します",
      content: `# Blenderインターフェースのナビゲーション完全マスター

## 学習目標と期待成果
このレッスンを完了することで、以下のスキルを身につけることができます：
- Blenderのメインインターフェース要素の完全理解
- 3D空間での効率的なナビゲーション技術の習得
- プロフェッショナルなワークフロー構築のための基礎知識
- 高度なキーボードショートカットとマウス操作の組み合わせ
- トラブルシューティングとカスタマイゼーション能力

## Blenderワークスペースの深層理解

### インターフェース哲学
Blenderは「非破壊ワークフロー」の思想に基づいて設計されています。各パネルは特定の役割を持ち、相互連携することで効率的な3D制作環境を提供します。

### 1. 3Dビューポート（メインワークエリア）
**機能概要**
- リアルタイム3Dレンダリングエンジン
- マルチビューポート対応
- インタラクティブライティング
- リアルタイムマテリアルプレビュー

**表示モード詳細**
- **ワイヤーフレーム**: 構造の確認、重なりの把握
- **ソリッド**: 形状の確認、基本的なモデリング
- **マテリアルプレビュー**: テクスチャとマテリアルの確認
- **レンダー**: 最終出力に近い表示

**ビューポートオーバーレイ**
- グリッド表示とスナップ機能
- オブジェクト名表示
- 統計情報（ポリゴン数、頂点数）
- 注釈とメジャーツール

### 2. アウトライナー（階層管理システム）
**高度な組織化機能**
- シーン階層の視覚的管理
- コレクションによるグループ化
- レイヤーとビジビリティ制御
- オブジェクトプロパティのクイックアクセス

**プロフェッショナルな命名規則**
- 意味のあるオブジェクト名の付け方
- プレフィックスとサフィックスの活用
- バージョン管理の考え方
- チームワークのための標準化

### 3. プロパティパネル（詳細制御センター）
**タブシステムの理解**
- レンダープロパティ: 出力設定とエンジン設定
- シーンプロパティ: グローバル設定
- ワールドプロパティ: 環境設定
- オブジェクトプロパティ: 変形と階層
- モディファイアープロパティ: 非破壊編集
- マテリアルプロパティ: 外観と質感

**リアルタイム調整テクニック**
- 数値入力の効率的な方法
- スライダーとドラッグ操作
- 数式計算の活用
- キーフレーム設定の基本

### 4. タイムライン＆ドープシート
**アニメーション管理**
- キーフレームの基本概念
- タイムスクラブ操作
- フレームレート設定
- 再生範囲の制御

## 3D空間ナビゲーション：プロフェッショナル技術

### 基本マウス操作の極意

**視点回転のマスタリング**
- **中マウス + ドラッグ**: 球面的回転
- **Ctrl + 中マウス**: 段階的回転（15度単位）
- **Shift + 中マウス**: 細かい調整
- 回転中心の理解と制御

**パン操作の精密制御**
- **Shift + 中マウス**: 自由な平行移動
- **Shift + Ctrl + 中マウス**: 制約付き移動
- 画面端での連続パン
- 大きなシーンでの効率的移動

**ズーム操作の多様性**
- **スクロールホイール**: 段階的ズーム
- **Ctrl + 中マウス**: 連続ズーム
- **Shift + スクロール**: 横スクロール
- **ズーム限界の理解と対処**

### キーボードショートカット：上級者への道

**視点切り替えの極意**
- **テンキー 1, 3, 7**: 基本正投影ビュー
- **Ctrl + テンキー**: 裏面ビュー
- **テンキー 2, 4, 6, 8**: 段階的視点移動
- **テンキー 9**: 反対側ビュー
- **テンキー 0**: カメラビュー（レンダリング視点）

**フレーミングとフォーカスの応用**
- **Home**: 全オブジェクトフレーミング
- **テンキー .**: 選択オブジェクトフォーカス
- **Alt + Home**: 選択オブジェクトとその他を分離表示
- **Shift + C**: 3Dカーソルを中心にリセット

**高速選択テクニック**
- **A**: 全選択 / 全選択解除（トグル）
- **Alt + A**: 強制的全選択解除
- **Ctrl + I**: 選択反転
- **L**: リンク選択（接続されたジオメトリ）
- **Shift + L**: 類似選択

### 高度な選択システム

**ボックス選択の応用**
- **B**: 基本ボックス選択
- **中クリック**: 選択解除モード
- **Shift + B**: ズームボックス
- **Alt + B**: クリップボックス（表示範囲制限）

**サークル選択の活用**
- **C**: サークル選択開始
- **スクロール**: ブラシサイズ調整
- **中クリック**: 選択解除
- **Tab**: 選択追加/除外切り替え

**投げ縄選択の技法**
- **Ctrl + 左クリックドラッグ**: 自由形状選択
- **複雑な形状の効率的選択**
- **他の選択ツールとの組み合わせ**

## インターフェースカスタマイゼーション

### ワークスペースの最適化
- **タブによるワークスペース切り替え**
- **モデリング**: 基本的な形状作成
- **スカルプティング**: 有機的形状制作
- **アニメーション**: 動きの作成
- **シェーディング**: マテリアル作成

### パネル配置の個人最適化
- **エリア分割とサイズ調整**
- **パネルの表示/非表示**
- **よく使う機能の配置設計**
- **画面解像度に応じた調整**

### キーマップカスタマイゼーション
- **個人の作業スタイルに合わせた設定**
- **他のソフトウェアとの整合性**
- **作業効率を上げるショートカット追加**

## トラブルシューティングと応用技術

### よくある問題と解決法

**マウス環境の対応**
- **中ボタンのないマウス**: マウスエミュレート設定
- **タッチパッド**: ジェスチャー設定
- **左利き**: ボタン配置の調整
- **ゲーミングマウス**: 追加ボタンの活用

**テンキーなしキーボード対応**
- **テンキーエミュレート設定**
- **代替キー割り当て**
- **ノートPC最適化設定**

**表示問題の対処**
- **グラフィックドライバー更新**
- **OpenGL設定の調整**
- **表示エラーの回避方法**

### 作業効率向上の秘訣

**筋肉記憶の構築**
- **毎日15分の基本操作練習**
- **意識的なショートカット使用**
- **段階的な技術習得計画**

**エルゴノミクス（人間工学）**
- **正しい姿勢と手の位置**
- **疲労軽減のための設定**
- **長時間作業のための工夫**

**ワークフロー分析**
- **自分の作業パターンの把握**
- **ボトルネックの特定と改善**
- **効率的なファイル管理**

## 実践プロジェクト準備

### 次のステップへの準備
このレッスンで習得した技術は、以下の実践プロジェクトで活用されます：
- **簡単な小物のモデリング**
- **建築物の基本形状作成**
- **キャラクターの基本フォーム**

### 継続学習のためのリソース
- **公式Blenderマニュアル**
- **コミュニティフォーラム**
- **YouTube チュートリアル**
- **プラグインとアドオン**

## 成果確認とスキル評価

### 習得すべき技術レベル
- **30秒以内での基本ビュー切り替え**
- **複雑なオブジェクト選択の正確性**
- **疲労なく1時間の連続作業**
- **他の人への基本操作指導能力**

この包括的なナビゲーション技術により、Blenderでの3D制作における強固な基盤が構築されます。`
    },
    "1-3": {
      title: "必須ツールとインターフェース要素",
      description: "日常的に使用する最も重要なツールとインターフェース要素を学習します",
      content: `# 必須ツールとインターフェース要素

## ツールシェルフ（左側）

### 選択ツール
- **ボックス選択 (B)**: ドラッグして複数のオブジェクトを選択
- **サークル選択 (C)**: クリックとドラッグで選択
- **投げ縄選択**: 選択範囲を描画

### 基本ツール
- **移動 (G)**: オブジェクトを掴んで移動
- **回転 (R)**: オブジェクトを回転
- **スケール (S)**: オブジェクトを大きくまたは小さくする

## オブジェクトの操作

### オブジェクトの追加
- **Shift + A**: 追加メニュー
- メッシュ、ライト、カメラなどから選択

### オブジェクトの削除
- **X または Delete**: 選択したオブジェクトを削除
- メニューから「削除」を選択

### オブジェクトの変形

#### オブジェクトの移動
1. オブジェクトを選択
2. **G**（グラブ）を押す
3. マウスを動かして位置を決める
4. クリックまたはEnterで確定
5. Escapeでキャンセル

#### 移動の制約
- **G + X**: X軸のみで移動
- **G + Y**: Y軸のみで移動
- **G + Z**: Z軸のみで移動
- **G + Shift + Z**: XとY軸で移動（Zは除く）

#### オブジェクトの回転
1. オブジェクトを選択
2. **R**（回転）を押す
3. マウスを動かして回転
4. **R + X/Y/Z**: 特定の軸で回転

#### オブジェクトのスケール
1. オブジェクトを選択
2. **S**（スケール）を押す
3. マウスを動かしてスケール
4. **S + X/Y/Z**: 特定の軸でスケール
5. **S + Shift + Z**: XとYでスケール（Zは除く）

## エディットモード vs オブジェクトモード

### オブジェクトモード
- デフォルトモード
- オブジェクト全体を操作
- オブジェクト全体の移動、回転、スケール

### エディットモード
- **Tab**: エディットモードの入り/出
- 個々の頂点、エッジ、面を編集
- 詳細なモデリングを行う場所

デフォルトのキューブでこれらのツールを練習してください！`
    },
    "1-4": {
      title: "基本メッシュモデリング",
      description: "基本的なメッシュ編集技術を学習して、初めての3Dモデルを作成します",
      content: `# 基本メッシュモデリング

## メッシュの理解

メッシュは3つの基本要素で構成されています：
- **頂点**: 3D空間の点
- **エッジ**: 頂点を結ぶ線
- **面**: エッジで囲まれた平面

## エディットモードの基本

### エディットモードに入る
- オブジェクトを選択
- **Tab**を押してエディットモードに入る
- オブジェクトのメッシュ構造が表示されます

### 選択モード
- **1**: 頂点選択モード
- **2**: エッジ選択モード
- **3**: 面選択モード
- **Shift + 1/2/3**: 複数選択モード

## 基本メッシュ操作

### 押し出し (E)
選択した要素を延長して新しいジオメトリを作成
1. 面/エッジ/頂点を選択
2. **E**（押し出し）を押す
3. マウスを動かして延長
4. クリックで確定

### インセット (I)
選択した面の内側に面を作成
1. 面を選択
2. **I**（インセット）を押す
3. マウスを動かしてサイズを調整
4. クリックで確定

### ループカット (Ctrl + R)
オブジェクト全体にエッジループを追加
1. **Ctrl + R**を押す
2. オブジェクトの上でホバーしてプレビュー
3. クリックで位置を確定
4. マウスを動かして位置を調整
5. 再度クリックで確定

### ベベル (Ctrl + B)
鋭いエッジを丸くする
1. エッジまたは頂点を選択
2. **Ctrl + B**を押す
3. マウスを動かしてベベルサイズを調整
4. スクロールホイールでセグメントを追加

## シンプルな家の作成

基本的な家を作成して練習しましょう：

### ステップ1: キューブから開始
- デフォルトキューブを削除 (X)
- 新しいキューブを追加 (Shift + A > メッシュ > キューブ)
- 少しスケールアップ (S、次に1.5)

### ステップ2: ベースを作成
- エディットモードに入る (Tab)
- 上面を選択 (3で面モード、上面をクリック)
- 上方向に押し出し (E、次に上に移動)

### ステップ3: 屋根を作成
- 上面を選択したまま
- 少しインセット (I、マウスを少し内側に)
- 屋根の頂点用に再度上に押し出し

### ステップ4: 詳細を追加
- 窓用のループカットを追加 (Ctrl + R)
- 窓が必要な面を選択
- インセットで窓枠を作成
- 深度をつけるため少し内側に押し出し

これがあなたの最初の3Dモデルです！`
    },
    "2-1": {
      title: "モディファイアー入門",
      description: "モディファイアーがモデリングワークフローをどう向上させるかを学習します",
      content: `# モディファイアー入門

## モディファイアーとは？

モディファイアーは、オブジェクトのジオメトリに非破壊的に影響を与える自動操作です。以下が可能です：
- すべての頂点を手動で編集することなく複雑さを追加
- 手動では困難な効果を作成
- ベースメッシュの編集可能性を維持

## 一般的なモディファイアー

### ミラーモディファイアー
対称オブジェクトを作成
- キャラクター、車両、建物に最適
- 片側を編集すると、もう片側が自動的に更新

### サブディビジョンサーフェス
メッシュを滑らかにし、詳細を追加
- ローポリモデルを滑らかに見せる
- オーガニックモデリングに必須

### アレイモディファイアー
パターンでオブジェクトを複製
- フェンス、階段、繰り返し要素を作成
- 複雑な配置のためにカーブに従うことも可能

### ソリッドファイモディファイアー
平面に厚みを与える
- 平面を壁に変換
- 衣服や薄いオブジェクトに厚みを追加

## モディファイアーの適用

1. オブジェクトを選択
2. プロパティパネル > モディファイアープロパティ（レンチアイコン）に移動
3. 「モディファイアーを追加」をクリック
4. モディファイアータイプを選択
5. 設定を調整
6. 満足したら適用（または非破壊的に保持）

いくつかの例で練習してみましょう！`
    }
  }
} as const;

// 翻訳されたレッスンデータを取得するヘルパー関数
export const getTranslatedLesson = (lessonId: string, language: string = 'en') => {
  const translations = lessonTranslations[language as keyof typeof lessonTranslations];
  return translations?.[lessonId as keyof typeof translations] || lessonTranslations.en[lessonId as keyof typeof lessonTranslations.en];
};