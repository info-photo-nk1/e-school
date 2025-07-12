import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  MessageSquare, 
  Globe2, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Users, 
  Award, 
  Play,
  BarChart3,
  Target,
  Zap,
  Calendar,
  Quote,
  Code2,
  Palette,
  Gamepad2,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({
    diagnostics: 0,
    satisfaction: 0,
    completion: 0,
    languages: 0
  });

  // 統計の数値アニメーション
  useEffect(() => {
    const targets = {
      diagnostics: 12547,
      satisfaction: 4.8,
      completion: 89,
      languages: 24
    };

    const duration = 2000; // 2秒
    const steps = 60; // フレーム数
    const increment = {
      diagnostics: targets.diagnostics / steps,
      satisfaction: targets.satisfaction / steps,
      completion: targets.completion / steps,
      languages: targets.languages / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedStats({
          diagnostics: Math.floor(increment.diagnostics * currentStep),
          satisfaction: Math.min(targets.satisfaction, (increment.satisfaction * currentStep)),
          completion: Math.floor(increment.completion * currentStep),
          languages: Math.floor(increment.languages * currentStep)
        });
        currentStep++;
      } else {
        setAnimatedStats(targets);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const handleStartDiagnostic = () => {
    navigate('/get-started');
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="bg-white">
      {/* 1. ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleStartDiagnostic}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <Brain className="mr-3 w-6 h-6" />
                {t('hero.startDiagnostic')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleViewCourses}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center"
              >
                {t('hero.viewCourses')}
              </button>
              <button className="px-8 py-4 bg-transparent text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center">
                <Play className="mr-2 w-5 h-5" />
                {t('hero.watchDemo')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 30問診断システム紹介セクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('diagnostic.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('diagnostic.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ステップ1 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {t('diagnostic.step1.title')}
              </h3>
              <p className="text-blue-600 font-medium text-center mb-3">
                {t('diagnostic.step1.description')}
              </p>
              <p className="text-gray-600 text-center">
                {t('diagnostic.step1.detail')}
              </p>
            </div>

            {/* ステップ2 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {t('diagnostic.step2.title')}
              </h3>
              <p className="text-purple-600 font-medium text-center mb-3">
                {t('diagnostic.step2.description')}
              </p>
              <p className="text-gray-600 text-center">
                {t('diagnostic.step2.detail')}
              </p>
            </div>

            {/* ステップ3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {t('diagnostic.step3.title')}
              </h3>
              <p className="text-green-600 font-medium text-center mb-3">
                {t('diagnostic.step3.description')}
              </p>
              <p className="text-gray-600 text-center">
                {t('diagnostic.step3.detail')}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleStartDiagnostic}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('diagnostic.cta')}
            </button>
          </div>
        </div>
      </section>

      {/* 3. AI支援学習の特徴セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('aiFeatures.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('aiFeatures.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 特徴1 */}
            <div className="text-center p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Globe2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('aiFeatures.feature1.title')}
              </h3>
              <p className="text-gray-600">
                {t('aiFeatures.feature1.description')}
              </p>
            </div>

            {/* 特徴2 */}
            <div className="text-center p-6 rounded-2xl hover:bg-purple-50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('aiFeatures.feature2.title')}
              </h3>
              <p className="text-gray-600">
                {t('aiFeatures.feature2.description')}
              </p>
            </div>

            {/* 特徴3 */}
            <div className="text-center p-6 rounded-2xl hover:bg-green-50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('aiFeatures.feature3.title')}
              </h3>
              <p className="text-gray-600">
                {t('aiFeatures.feature3.description')}
              </p>
            </div>

            {/* 特徴4 */}
            <div className="text-center p-6 rounded-2xl hover:bg-orange-50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('aiFeatures.feature4.title')}
              </h3>
              <p className="text-gray-600">
                {t('aiFeatures.feature4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 学習プロセス可視化セクション */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('learningProcess.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('learningProcess.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* タイムライン線 */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-orange-200 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Day 1 */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full hidden lg:block"></div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {t('learningProcess.day1.title')}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {t('learningProcess.day1.description')}
                </p>
              </div>

              {/* Week 1 */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full hidden lg:block"></div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {t('learningProcess.week1.title')}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {t('learningProcess.week1.description')}
                </p>
              </div>

              {/* Month 1 */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-green-500">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full hidden lg:block"></div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {t('learningProcess.month1.title')}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {t('learningProcess.month1.description')}
                </p>
              </div>

              {/* Month 3 */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full hidden lg:block"></div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {t('learningProcess.month3.title')}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {t('learningProcess.month3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 注目コースセクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('featuredCourses.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('featuredCourses.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Python AI コース */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                 onClick={() => navigate('/courses/python-ai')}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=500" 
                  alt={t('featuredCourses.course1.title')}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {t('featuredCourses.course1.category')}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {t('featuredCourses.course1.level')}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {t('featuredCourses.course1.rating')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {t('featuredCourses.course1.title')}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {t('featuredCourses.course1.description')}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {t('featuredCourses.course1.highlights').map((highlight: string, index: number) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{t('featuredCourses.course1.duration')}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{t('featuredCourses.course1.students')} {t('coursesOverview.students')}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group">
                  <span>{t('coursesOverview.viewCourse')}</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Blender コース */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                 onClick={() => navigate('/courses/3d-modeling')}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=500" 
                  alt={t('featuredCourses.course2.title')}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {t('featuredCourses.course2.category')}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {t('featuredCourses.course2.level')}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {t('featuredCourses.course2.rating')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {t('featuredCourses.course2.title')}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {t('featuredCourses.course2.description')}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {t('featuredCourses.course2.highlights').map((highlight: string, index: number) => (
                    <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{t('featuredCourses.course2.duration')}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{t('featuredCourses.course2.students')} {t('coursesOverview.students')}</span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center group">
                  <span>{t('coursesOverview.viewCourse')}</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Unity コース */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                 onClick={() => navigate('/courses/unity-dev')}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=500" 
                  alt={t('featuredCourses.course3.title')}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {t('featuredCourses.course3.category')}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {t('featuredCourses.course3.level')}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {t('featuredCourses.course3.rating')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {t('featuredCourses.course3.title')}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {t('featuredCourses.course3.description')}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {t('featuredCourses.course3.highlights').map((highlight: string, index: number) => (
                    <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{t('featuredCourses.course3.duration')}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{t('featuredCourses.course3.students')} {t('coursesOverview.students')}</span>
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center group">
                  <span>{t('coursesOverview.viewCourse')}</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/courses')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
            >
              {t('featuredCourses.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. 実績・統計セクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('stats.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {animatedStats.diagnostics.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">
                {t('stats.diagnostics')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                {animatedStats.satisfaction.toFixed(1)}
              </div>
              <div className="text-gray-600 font-medium">
                {t('stats.satisfaction')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {animatedStats.completion}%
              </div>
              <div className="text-gray-600 font-medium">
                {t('stats.completion')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {animatedStats.languages}+
              </div>
              <div className="text-gray-600 font-medium">
                {t('stats.languages')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ユーザーの声セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* テスティモニアル1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {t('testimonials.testimonial1.name').charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {t('testimonials.testimonial1.name')}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {t('testimonials.testimonial1.role')}
                  </div>
                  <div className="text-blue-600 text-sm font-medium">
                    {t('testimonials.testimonial1.duration')}
                  </div>
                </div>
              </div>
              <Quote className="w-8 h-8 text-gray-300 mb-4" />
              <p className="text-gray-700 mb-4 italic">
                "{t('testimonials.testimonial1.quote')}"
              </p>
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {t('testimonials.testimonial1.achievement')}
              </div>
            </div>

            {/* テスティモニアル2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {t('testimonials.testimonial2.name').charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {t('testimonials.testimonial2.name')}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {t('testimonials.testimonial2.role')}
                  </div>
                  <div className="text-green-600 text-sm font-medium">
                    {t('testimonials.testimonial2.duration')}
                  </div>
                </div>
              </div>
              <Quote className="w-8 h-8 text-gray-300 mb-4" />
              <p className="text-gray-700 mb-4 italic">
                "{t('testimonials.testimonial2.quote')}"
              </p>
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {t('testimonials.testimonial2.achievement')}
              </div>
            </div>

            {/* テスティモニアル3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {t('testimonials.testimonial3.name').charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {t('testimonials.testimonial3.name')}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {t('testimonials.testimonial3.role')}
                  </div>
                  <div className="text-purple-600 text-sm font-medium">
                    {t('testimonials.testimonial3.duration')}
                  </div>
                </div>
              </div>
              <Quote className="w-8 h-8 text-gray-300 mb-4" />
              <p className="text-gray-700 mb-4 italic">
                "{t('testimonials.testimonial3.quote')}"
              </p>
              <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {t('testimonials.testimonial3.achievement')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 最終CTAセクション */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('finalCta.title')}
          </h2>
          <p className="text-xl mb-12 opacity-90">
            {t('finalCta.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
              <span>{t('finalCta.benefit1')}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
              <span>{t('finalCta.benefit2')}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
              <span>{t('finalCta.benefit3')}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
              <span>{t('finalCta.benefit4')}</span>
            </div>
          </div>

          <button
            onClick={handleStartDiagnostic}
            className="group px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center mx-auto"
          >
            <Brain className="mr-3 w-7 h-7" />
            {t('finalCta.cta')}
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-sm mt-6 opacity-75">
            {t('finalCta.guarantee')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;