import { Link } from 'react-router-dom'; 
import { AiOutlineRight } from 'react-icons/ai'; 

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <nav 
      className="flex items-center space-x-1 mb-8 text-sm text-gray-600 uppercase" 
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center gap-1">
          
         
          
          {index !== 0 && (
            <AiOutlineRight className="w-4 h-4 text-gray-400" /> 
          )}

          {breadcrumb.href ? (
            <Link 
              to={breadcrumb.href} 
              className="text-[#999999] transition-colors"
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className="text-primary-1 font-medium">{breadcrumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
