import React from 'react';
import './Services.css';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  t: {
    title: string;
    items: ServiceItem[];
  };
}

const Services: React.FC<ServicesProps> = ({ t }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px' });

  return (
    <section id="services" className="services-section" ref={ref}>
      <div className={`container ${isIntersecting ? 'animate-in' : 'opacity-0'}`}>
        <h2 className="section-title">{t.title}</h2>
        <div className="services-grid">
          {t.items.map((item, index) => (
            <div 
              key={index} 
              className="service-card glass-card"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
