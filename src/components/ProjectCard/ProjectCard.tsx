
import React from 'react';
import './ProjectCard.css';

export interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  link: string;
  liveLink?: string; // New optional Live Demo link
  titleAr?: string;
  descriptionAr?: string;
  technologies?: string[]; // Array of technologies used
}

interface ProjectCardProps {
  project: Project;
  buttonText: string;
  liveDemoText?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, buttonText, liveDemoText }) => {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} className="project-img" />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-technologies">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-actions">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-link"
          >
            {buttonText} &rarr;
          </a>
          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link live-demo-btn"
            >
              {liveDemoText || 'Live Demo'} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
