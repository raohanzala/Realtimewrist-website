import React from 'react';
import { Link } from 'react-router-dom'; // If you are using React Router
import { AiOutlineRight } from 'react-icons/ai'; // Separator Icon
import { FaHome } from 'react-icons/fa'; // Home Icon

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <nav 
      className="flex items-center space-x-1 mb-8 text-sm text-gray-600 uppercase" 
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center gap-1">
          
         
          
          {index !== 0 && (
            <AiOutlineRight className="w-4 h-4 text-gray-400" /> // Custom Separator Icon
          )}

          {breadcrumb.href ? (
            <Link 
              to={breadcrumb.href} 
              className="text-[#999999] transition-colors"
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className="text-primary font-medium">{breadcrumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
