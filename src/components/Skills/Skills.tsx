import React from 'react';
import './Skills.css';
import SkillBar from '../SkillBar/SkillBar';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface Skill {
  skill: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsProps {
  t: {
    title: string;
    categories: SkillCategory[];
  };
}

const Skills: React.FC<SkillsProps> = ({ t }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2, rootMargin: '0px' });

  const categories = t.categories;

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
