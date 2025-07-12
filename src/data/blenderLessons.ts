// Blender 3D Modeling コースの詳細レッスンデータ

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // 分単位
  videoUrl?: string;
  content: string;
  exercises?: Exercise[];
  resources?: Resource[];
  completed?: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  solution?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'download' | 'link' | 'document';
  url: string;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  totalDuration: number;
}

export const blenderCourse: Module[] = [
  {
    id: "module-1",
    title: "Getting Started with Blender",
    description: "Learn the fundamentals of Blender and 3D modeling basics",
    totalDuration: 150, // 2.5時間
    lessons: [
      {
        id: "1-1",
        title: "Introduction to 3D Modeling",
        description: "Understanding the world of 3D graphics and what makes Blender special",
        duration: 20,
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
            id: "r1-1",
            title: "Blender Download",
            type: "link",
            url: "https://www.blender.org/download/",
            description: "Download the latest version of Blender (free)"
          },
          {
            id: "r1-2",
            title: "Blender Shortcuts Cheatsheet",
            type: "document",
            url: "/resources/blender-shortcuts.pdf",
            description: "Essential keyboard shortcuts for Blender"
          }
        ]
      },
      {
        id: "1-2",
        title: "Navigating the Blender Interface",
        description: "Master the Blender interface and learn to navigate in 3D space",
        duration: 30,
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

Practice these navigation techniques - they'll become second nature!`,
        exercises: [
          {
            id: "e1-2-1",
            title: "Navigation Practice",
            description: "Practice basic navigation in Blender",
            instructions: [
              "Open Blender with the default scene",
              "Use the middle mouse button to rotate around the default cube",
              "Try zooming in and out with the scroll wheel",
              "Use Shift + Middle Mouse to pan the view",
              "Press Numpad 7 to see the top view",
              "Press Numpad 1 to see the front view",
              "Press Numpad 3 to see the right view"
            ]
          }
        ]
      },
      {
        id: "1-3",
        title: "Essential Tools and Interface Elements",
        description: "Learn the most important tools and interface elements you'll use daily",
        duration: 40,
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

Practice these tools with the default cube!`,
        exercises: [
          {
            id: "e1-3-1",
            title: "Basic Transformations",
            description: "Practice moving, rotating, and scaling objects",
            instructions: [
              "Select the default cube",
              "Press G and move it to a new position",
              "Press R and rotate it",
              "Press S and scale it up",
              "Try constraining movement: Press G, then X to move only on X-axis",
              "Practice rotating on different axes: R, then Y",
              "Scale only on Z-axis: S, then Z"
            ]
          },
          {
            id: "e1-3-2",
            title: "Adding and Deleting Objects",
            description: "Learn to add and remove objects from your scene",
            instructions: [
              "Press Shift + A to open the Add menu",
              "Add a UV Sphere from Mesh > UV Sphere",
              "Move it away from the cube using G",
              "Select the original cube",
              "Press X and delete it",
              "Add a Cylinder and position it next to the sphere"
            ]
          }
        ]
      },
      {
        id: "1-4",
        title: "Basic Mesh Modeling",
        description: "Create your first 3D model by learning basic mesh editing techniques",
        duration: 60,
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

This is your first 3D model!`,
        exercises: [
          {
            id: "e1-4-1",
            title: "Mesh Editing Practice",
            description: "Practice basic mesh editing operations",
            instructions: [
              "Start with the default cube",
              "Enter Edit Mode (Tab)",
              "Switch to face select mode (3)",
              "Select the top face",
              "Extrude it upward (E, then move up)",
              "Try inset on a face (I)",
              "Add a loop cut (Ctrl + R)",
              "Practice beveling edges (Ctrl + B)"
            ]
          },
          {
            id: "e1-4-2",
            title: "Build a Simple House",
            description: "Create your first complete 3D model",
            instructions: [
              "Follow the house creation steps in the lesson",
              "Start with a cube for the base",
              "Extrude upward for walls",
              "Create a peaked roof",
              "Add loop cuts for window placement",
              "Inset faces to create window frames",
              "Experiment with additional details"
            ],
            solution: "Your house should have a base, walls, peaked roof, and at least one window frame created with inset faces."
          }
        ],
        resources: [
          {
            id: "r1-4",
            title: "Mesh Editing Reference",
            type: "document",
            url: "/resources/mesh-editing-guide.pdf",
            description: "Complete guide to mesh editing tools and techniques"
          }
        ]
      }
    ]
  },
  // 他のモジュールも同様に定義...
  {
    id: "module-2",
    title: "Advanced Modeling",
    description: "Master advanced modeling techniques and tools",
    totalDuration: 240, // 4時間
    lessons: [
      {
        id: "2-1",
        title: "Introduction to Modifiers",
        description: "Learn how modifiers can enhance your modeling workflow",
        duration: 60,
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

Let's practice with some examples!`,
        exercises: [
          {
            id: "e2-1-1",
            title: "Mirror Modifier Practice",
            description: "Create a symmetrical object using the Mirror modifier",
            instructions: [
              "Start with a cube",
              "Enter Edit Mode and delete half of it",
              "Add a Mirror modifier",
              "Edit one side and watch the other update",
              "Try modeling a simple symmetrical vase or bottle"
            ]
          }
        ]
      }
      // 追加のレッスンは後で実装
    ]
  }
  // Module 3, 4も後で追加
];

// 特定のレッスンを取得するヘルパー関数
export const getLesson = (moduleId: string, lessonId: string): Lesson | undefined => {
  const module = blenderCourse.find(m => m.id === moduleId);
  return module?.lessons.find(l => l.id === lessonId);
};

// 次のレッスンを取得するヘルパー関数
export const getNextLesson = (currentModuleId: string, currentLessonId: string): { moduleId: string; lessonId: string } | null => {
  const moduleIndex = blenderCourse.findIndex(m => m.id === currentModuleId);
  const module = blenderCourse[moduleIndex];
  
  if (!module) return null;
  
  const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
  
  // 現在のモジュール内に次のレッスンがある場合
  if (lessonIndex < module.lessons.length - 1) {
    return {
      moduleId: currentModuleId,
      lessonId: module.lessons[lessonIndex + 1].id
    };
  }
  
  // 次のモジュールの最初のレッスン
  if (moduleIndex < blenderCourse.length - 1) {
    const nextModule = blenderCourse[moduleIndex + 1];
    return {
      moduleId: nextModule.id,
      lessonId: nextModule.lessons[0].id
    };
  }
  
  return null; // コース終了
};

// 前のレッスンを取得するヘルパー関数
export const getPreviousLesson = (currentModuleId: string, currentLessonId: string): { moduleId: string; lessonId: string } | null => {
  const moduleIndex = blenderCourse.findIndex(m => m.id === currentModuleId);
  const module = blenderCourse[moduleIndex];
  
  if (!module) return null;
  
  const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
  
  // 現在のモジュール内に前のレッスンがある場合
  if (lessonIndex > 0) {
    return {
      moduleId: currentModuleId,
      lessonId: module.lessons[lessonIndex - 1].id
    };
  }
  
  // 前のモジュールの最後のレッスン
  if (moduleIndex > 0) {
    const prevModule = blenderCourse[moduleIndex - 1];
    const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
    return {
      moduleId: prevModule.id,
      lessonId: lastLesson.id
    };
  }
  
  return null; // コース開始
};