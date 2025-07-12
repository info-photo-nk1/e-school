import React from 'react';
import { Star, Users } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface CourseProps {
  course: {
    title: string;
    category: string;
    level: string;
    image: string;
    rating: number;
    students: number;
  };
}

const CourseCard: React.FC<CourseProps> = ({ course }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
      <img 
        src={course.image} 
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {course.category}
            </span>
            <span className="ml-2 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              {t(`courses.level.${course.level}`)}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-600">{course.rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-600">
              {course.students.toLocaleString()} {t('courses.students')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;