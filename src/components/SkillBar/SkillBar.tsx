
import React from 'react';
import './SkillBar.css';

interface SkillBarProps {
  skill: string;
  level: number; // 0 to 100
  isVisible: boolean;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level, isVisible, delay }) => {
  return (
    <div className="skill-bar-container">
      <div className="skill-info">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: isVisible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms` 
          }}
        >
          <div className="progress-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
