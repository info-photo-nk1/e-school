import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = (href?: string) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}
              
              {isLast ? (
                <span 
                  className="flex items-center space-x-1 text-gray-900 font-medium"
                  aria-current="page"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              ) : (
                <button
                  onClick={() => handleClick(item.href)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;