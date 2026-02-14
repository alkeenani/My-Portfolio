
import React from 'react';
import './Skills.css';
import SkillBar from '../SkillBar/SkillBar';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SkillsProps {
  t: {
    title: string;
  };
}

const Skills: React.FC<SkillsProps> = ({ t }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const categories = [
    {
      title: 'Frontend Development',
      skills: [
        { skill: 'HTML5 Essentials', level: 95 },
        { skill: 'CSS Essentials', level: 90 },
        { skill: 'JavaScript', level: 85 },
        { skill: 'TypeScript', level: 80 },
        { skill: 'React', level: 85 },
        { skill: 'Bootstrap', level: 90 },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { skill: 'NodeJS + Express', level: 75 },
        { skill: 'MongoDB', level: 70 },
      ]
    },
    {
      title: 'Tools & Workflow',
      skills: [
        { skill: 'Git & GitHub', level: 85 },
        { skill: 'Docker Basics', level: 60 },
      ]
    },
    {
      title: 'Professional Skills',
      skills: [
        { skill: 'Prompt Engineering', level: 90 },
        { skill: 'UX/UI Principles', level: 80 },
        { skill: 'Code Style & Best Practices', level: 85 },
        { skill: 'Functional Documentation', level: 70 },
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className={`container ${isIntersecting ? 'animate-in' : 'opacity-0'}`}>
        <h2 className="section-title">{t.title}</h2>
        <div className="skills-grid-bars">
          {categories.map((category, catIndex) => (
            <div 
              key={category.title} 
              className="skill-category glass-card"
              style={{ transitionDelay: `${catIndex * 150}ms` }}
            >
              <h3>{category.title}</h3>
              <div className="category-skills-list">
                {category.skills.map((s, index) => (
                  <SkillBar 
                    key={s.skill} 
                    skill={s.skill} 
                    level={s.level} 
                    isVisible={isIntersecting}
                    delay={(catIndex * 150) + (index * 100)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
