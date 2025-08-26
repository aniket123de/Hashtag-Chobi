import React from 'react';
import './loader.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'scale-75',
    md: 'scale-100',
    lg: 'scale-125'
  };

  return (
    <div className={`loader-container ${sizeClasses[size]} ${className}`}>
      <div className="hourglassBackground">
        <div className="hourglassContainer">
          <div className="hourglassCurves" />
          <div className="hourglassCapTop" />
          <div className="hourglassGlassTop" />
          <div className="hourglassSand" />
          <div className="hourglassSandStream" />
          <div className="hourglassCapBottom" />
          <div className="hourglassGlass" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
