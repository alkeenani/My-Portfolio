
import React from 'react';
import './About.css';

interface AboutProps {
  t: {
    title: string;
    description: string | string[];
  };
}

const About: React.FC<AboutProps> = ({ t }) => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">{t.title}</h2>
        <div className="about-content">
          <div className="about-text">
            {Array.isArray(t.description) ? (
              t.description.map((paragraph, index) => (
                <p key={index} className="about-paragraph">{paragraph}</p>
              ))
            ) : (
              <p>{t.description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
