import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import PythonAICourse from './pages/PythonAICourse';
import BlenderCourse from './pages/BlenderCourse';
import UnityGameCourse from './pages/UnityGameCourse';
import LessonViewer from './pages/LessonViewer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/courses/python-ai" element={<PythonAICourse />} />
            <Route path="/courses/3d-modeling" element={<BlenderCourse />} />
            <Route path="/courses/unity-dev" element={<UnityGameCourse />} />
            <Route path="/learn/:courseId/:lessonId" element={<LessonViewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;