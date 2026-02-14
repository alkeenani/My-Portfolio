import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  liveLink?: string;
  titleAr?: string;
  descriptionAr?: string;
  technologies?: string[];
}

const Dashboard: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    liveLink: '',
    titleAr: '',
    descriptionAr: '',
    technologies: '' // Comma separated string for input
  });

  const PROJECTS_COLLECTION = 'projects';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description || !formData.image) {
        alert('Please fill in required fields');
        return;
      }

      // Convert comma-separated string to array
      const projectData = {
        ...formData,
        technologies: formData.technologies 
          ? formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0)
          : []
      };

      if (editingId) {
        // Update existing project
        const projectRef = doc(db, PROJECTS_COLLECTION, editingId);
        await updateDoc(projectRef, projectData);
        alert('Project updated successfully!');
      } else {
        // Add new project
        await addDoc(collection(db, PROJECTS_COLLECTION), projectData);
        alert('Project added successfully!');
      }

      setFormData({ 
        title: '', 
        description: '', 
        image: '', 
        link: '', 
        liveLink: '',
        titleAr: '',
        descriptionAr: '',
        technologies: ''
      });
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert('Error saving project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      liveLink: project.liveLink || '',
      titleAr: project.titleAr || '',
      descriptionAr: project.descriptionAr || '',
      technologies: project.technologies ? project.technologies.join(', ') : ''
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ 
      title: '', 
      description: '', 
      image: '', 
      link: '', 
      liveLink: '',
      titleAr: '',
      descriptionAr: '',
      technologies: ''
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>{currentUser?.email}</span>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </div>
      </header>

      <section className="add-project-section">
        <div className="section-header">
          <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          {editingId && (
            <button onClick={handleCancelEdit} className="cancel-btn">
              Cancel Edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="add-project-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="url"
              name="link"
              placeholder="Source Code Link (GitHub)"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="url"
              name="liveLink"
              placeholder="Live Demo Link (Optional)"
              value={formData.liveLink}
              onChange={handleInputChange}
            />
          </div>
            <div className="form-group">
            <input
              type="text"
              name="titleAr"
              placeholder="Arabic Project Title"
              value={formData.titleAr}
              onChange={handleInputChange}
              className="rtl-input"
            />
          </div>
          <div className="form-group-full">
            <input
              type="text"
              name="technologies"
              placeholder="Technologies (comma separated, e.g. React, Firebase, CSS)"
              value={formData.technologies}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group-full">
            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-full">
            <textarea
              name="descriptionAr"
              placeholder="Arabic Project Description"
              value={formData.descriptionAr}
              onChange={handleInputChange}
              className="rtl-input"
            />
          </div>
          <button type="submit" className="submit-btn">
            {editingId ? 'Update Project' : 'Add Project'}
          </button>
        </form>
      </section>

      <section className="projects-list-section">
        <h2>Existing Projects ({projects.length})</h2>
        <div className="dashboard-projects-grid">
          {projects.map(project => (
            <div key={project.id} className="dashboard-project-card">
              <img src={project.image} alt={project.title} className="dashboard-project-img" />
              <div className="dashboard-project-info">
                <h3>{project.title}</h3>
                <p>{project.description.substring(0, 100)}...</p>
                <div className="project-actions">
                  <button onClick={() => handleEdit(project)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
