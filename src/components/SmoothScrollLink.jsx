import React from 'react';

const SmoothScrollLink = ({ to, children, className, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Find the target element
    const targetId = to.substring(1); // Remove '#' from href
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // If there's an additional onClick function passed (like closing a menu), call it
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink; 