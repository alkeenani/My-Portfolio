
import React from 'react';
import './Hero.css';
import SocialLinks from '../SocialLinks/SocialLinks';

interface HeroProps {
  t: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    cta: string;
    hireMe: string;
    contact: string;
  };
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  // Tilt State
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  
  // Drag State
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  // Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleDragMove(e);
      return;
    }
    
    // Calculate rotation based on mouse position relative to image center
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X inside element
    const y = e.clientY - rect.top;  // Mouse Y inside element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Reduced tilt for subtlety
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setRotation({ x: 0, y: 0 }); // Reset tilt
    }
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;
    
    // Constrain movement within +/- 50px
    const limit = 50;
    newX = Math.max(-limit, Math.min(limit, newX));
    newY = Math.max(-limit, Math.min(limit, newY));
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap back to center
    setPosition({ x: 0, y: 0 }); 
  };

  return (
    <section id="home" className="hero" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="hero-container">
        <div className="hero-text-content">
          <div className="badge-container">
            <span className="hero-badge">✨ Available for work</span>
          </div>
          <span className="hero-greeting">{t.greeting}</span>
          <h1 className="hero-name">
            {t.name}
            <span className="dot">.</span>
          </h1>
          <h2 className="hero-title">{t.title}</h2>
          <p className="hero-description">{t.description}</p>
          
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary btn-lg btn-glow">
              <span className="btn-icon">⚡</span> {t.cta}
            </a>
            <a href="#contact" className="btn btn-outline btn-lg">{t.hireMe}</a>
          </div>

          <SocialLinks />
        </div>
        
        {/* Interactive Image Container */}
        <div 
          className="hero-visual"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          <div className="glass-card hero-card-bg"></div>
          <div className="hero-image-wrapper">
            <img 
              src="../src/assets/img//IMG.png" 
              alt="Profile" 
              className="hero-image"
              draggable="false"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="floating-badge badge-react">
            <span>⚛️ React</span>
          </div>
          <div className="floating-badge badge-ts">
            <span>TS TypeScript</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
