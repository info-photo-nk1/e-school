import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, Users, Star, ArrowRight, BookOpen, Code2, Gamepad2, Palette } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  path: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const CoursesOverview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const courses: Course[] = [
    {
      id: 'python-ai',
      title: t('coursesOverview.courseData.pythonAi.title'),
      description: t('coursesOverview.courseData.pythonAi.description'),
      category: t('coursesOverview.categories.programming'),
      difficulty: t('coursesOverview.difficulty.beginner'),
      duration: `28 ${t('time.hours')}`,
      students: 1247,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400',
      path: '/courses/python-ai',
      icon: Code2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '3d-modeling',
      title: t('coursesOverview.courseData.blender3d.title'),
      description: t('coursesOverview.courseData.blender3d.description'),
      category: t('coursesOverview.categories.design'),
      difficulty: t('coursesOverview.difficulty.beginner'),
      duration: `12 ${t('time.hours')}`,
      students: 892,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=400',
      path: '/courses/3d-modeling',
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'unity-dev',
      title: t('coursesOverview.courseData.unityDev.title'),
      description: t('coursesOverview.courseData.unityDev.description'),
      category: t('coursesOverview.categories.gameDev'),
      difficulty: t('coursesOverview.difficulty.beginner'),
      duration: `16 ${t('time.hours')}`,
      students: 634,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400',
      path: '/courses/unity-dev',
      icon: Gamepad2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const categories = [
    { key: 'All', label: t('coursesOverview.categories.all') },
    { key: 'Programming', label: t('coursesOverview.categories.programming') },
    { key: 'Design', label: t('coursesOverview.categories.design') },
    { key: 'Game Dev', label: t('coursesOverview.categories.gameDev') }
  ];
  const difficulties = [
    { key: 'All', label: t('coursesOverview.difficulty.all') },
    { key: 'Beginner', label: t('coursesOverview.difficulty.beginner') },
    { key: 'Intermediate', label: t('coursesOverview.difficulty.intermediate') },
    { key: 'Advanced', label: t('coursesOverview.difficulty.advanced') }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Programming' && course.category === t('coursesOverview.categories.programming')) ||
      (selectedCategory === 'Design' && course.category === t('coursesOverview.categories.design')) ||
      (selectedCategory === 'Game Dev' && course.category === t('coursesOverview.categories.gameDev'));
    const matchesDifficulty = selectedDifficulty === 'All' || 
      (selectedDifficulty === 'Beginner' && course.difficulty === t('coursesOverview.difficulty.beginner')) ||
      (selectedDifficulty === 'Intermediate' && course.difficulty === t('coursesOverview.difficulty.intermediate')) ||
      (selectedDifficulty === 'Advanced' && course.difficulty === t('coursesOverview.difficulty.advanced'));
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
    averageRating: courses.reduce((sum, course) => sum + course.rating, 0) / courses.length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('coursesOverview.title')}
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              {t('coursesOverview.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('coursesOverview.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-4 focus:ring-white/25 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stats.totalCourses}</div>
              <div className="text-gray-600">{t('coursesOverview.stats.coursesAvailable')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</div>
              <div className="text-gray-600">{t('coursesOverview.stats.studentsEnrolled')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</div>
              <div className="text-gray-600">{t('coursesOverview.stats.averageRating')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-700">{t('coursesOverview.filters.filterBy')}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">{t('coursesOverview.filters.category')}</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category.key} value={category.key}>{category.label}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">{t('coursesOverview.filters.difficulty')}</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.key} value={difficulty.key}>{difficulty.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('coursesOverview.coursesFound').replace('{count}', filteredCourses.length.toString())}
          </h2>
          <p className="text-gray-600">
            {t('coursesOverview.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => navigate(course.path)}
              >
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${course.bgColor} ${course.color} px-3 py-1 rounded-full text-sm font-medium`}>
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`w-10 h-10 ${course.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${course.color}`} />
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.difficulty}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.students.toLocaleString()} {t('coursesOverview.students')}</span>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center group">
                    <span>{t('coursesOverview.viewCourse')}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('coursesOverview.noResults.title')}</h3>
            <p className="text-gray-600 mb-6">
              {t('coursesOverview.noResults.description')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t('coursesOverview.noResults.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesOverview;