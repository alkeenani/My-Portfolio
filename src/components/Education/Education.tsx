import React from 'react';
import './Education.css';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface EducationItem {
  institution: string;
  degree: string;
  university: string;
  description: string;
}

interface EducationProps {
  t: {
    title: string;
    items: EducationItem[];
  };
}

const Education: React.FC<EducationProps> = ({ t }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px' });

  return (
    <section id="education" className="education-section" ref={ref}>
      <div className={`container ${isIntersecting ? 'animate-in' : 'opacity-0'}`}>
        <h2 className="section-title">{t.title}</h2>
        <div className="education-list">
          {t.items.map((item, index) => (
            <div 
              key={index} 
              className="education-card glass-card"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="edu-icon-wrapper">
                <span className="edu-icon">🎓</span>
              </div>
              <div className="edu-content">
                <div className="education-header">
                  <h3>{item.degree}</h3>
                  <span className="institution">{item.institution}</span>
                </div>
                <h4 className="university">{item.university}</h4>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
