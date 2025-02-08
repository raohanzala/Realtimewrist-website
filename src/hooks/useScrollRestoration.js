import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem(location.key);
    
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    } else {
      window.scrollTo(0, 0);  
    }
    
    const handleBeforeUnload = () => {
      sessionStorage.setItem(location.key, window.scrollY);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);  
};

export default useScrollRestoration;
