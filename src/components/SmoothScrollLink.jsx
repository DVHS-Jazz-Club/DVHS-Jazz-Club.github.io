import React, { useCallback } from 'react';

const SmoothScrollLink = ({ to, children, className, onClick, ...props }) => {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    
    // Find the target element
    const targetId = to.substring(1); // Remove '#' from href
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`Target element with id "${targetId}" not found`);
    }

    // If there's an additional onClick function passed (like closing a menu), call it
    if (onClick) {
      onClick(e);
    }
  }, [to, onClick]);

  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default SmoothScrollLink; 