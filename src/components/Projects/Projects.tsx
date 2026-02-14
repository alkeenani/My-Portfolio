import React, { useEffect, useState } from 'react';
import './Projects.css';
import ProjectCard, { Project } from '../ProjectCard/ProjectCard';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface ProjectsProps {
  t: {
    title: string;
    viewProject: string;
    sourceCode: string;
    liveDemo: string;
  };
  language?: 'en' | 'ar';
}

const Projects: React.FC<ProjectsProps> = ({ t, language = 'en' }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="projects-section">
                <div className="container">
                    <h2 className="section-title">{t.title}</h2>
                    <div className="loading-projects">Loading projects...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <div className="projects-grid">
                    {projects.map((project) => {
                        // Determine content based on language
                        const displayTitle = language === 'ar' && project.titleAr ? project.titleAr : project.title;
                        const displayDescription = language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description;

                        return (
                            <ProjectCard 
                              key={project.id} 
                              project={{
                                ...project,
                                title: displayTitle,
                                description: displayDescription
                              }} 
                              buttonText={t.sourceCode}
                              liveDemoText={t.liveDemo}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
