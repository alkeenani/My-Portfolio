import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import SocialLinks from '../SocialLinks/SocialLinks';
import heroImg from '../../assets/img/IMG.png';
import './Hero.css';

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
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            '.hero-role-tag',
            '.hero-greeting',
            '.hero-name',
            '.hero-description',
            '.hero-actions .btn',
            '.hero-socials',
            '.portrait-backdrop',
            '.portrait-frame',
            '.portrait-accent-pill',
          ],
          { opacity: 1, visibility: 'visible', clearProps: 'all' }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-role-tag',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-greeting',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.4'
        )
        .fromTo(
          '.hero-name',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(
          '.hero-description',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-actions .btn',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          '.hero-socials',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          backdropRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          0.2
        )
        .fromTo(
          frameRef.current,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0,
            y: 20,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
          },
          0.35
        )
        .fromTo(
          '.portrait-accent-pill',
          { scale: 0.8, opacity: 0, y: 10 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  // Restrained pointer-depth parallax (no spin, no exaggerated rotation)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!visualRef.current) return;

    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    if (frameRef.current) {
      gsap.to(frameRef.current, {
        x: x * 10,
        y: y * 10,
        duration: 0.5,
        ease: 'power1.out',
      });
    }

    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        x: -x * 8,
        y: -y * 8,
        duration: 0.6,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, { x: 0, y: 0, duration: 0.7, ease: 'power2.out' });
    }
    if (backdropRef.current) {
      gsap.to(backdropRef.current, { x: 0, y: 0, duration: 0.7, ease: 'power2.out' });
    }
  };

  return (
    <section id="home" className="hero-section" ref={containerRef}>
      <div className="hero-inner container">
        {/* Text Content Column */}
        <div className="hero-content">
          <div className="hero-role-tag">
            <span className="role-dot" aria-hidden="true" />
            <span className="role-text">{t.title}</span>
          </div>

          <span className="hero-greeting">{t.greeting}</span>

          <h1 className="hero-name">
            {t.name}
            <span className="hero-period">.</span>
          </h1>

          <p className="hero-description">{t.description}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>{t.cta}</span>
              <ArrowUpRight size={18} strokeWidth={2.2} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>{t.hireMe}</span>
              <Mail size={17} strokeWidth={2.2} />
            </a>
          </div>

          <div className="hero-socials">
            <SocialLinks />
          </div>
        </div>

        {/* Visual Column: Art-Directed Portrait with Solid Layered Framing */}
        <div
          className="hero-visual"
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Solid Backdrop Frame in Copper / Sage */}
          <div className="portrait-backdrop" ref={backdropRef} aria-hidden="true" />

          {/* Main Portrait Frame with Solid Background & Border */}
          <div className="portrait-frame" ref={frameRef}>
            <img
              src={heroImg}
              alt={t.name}
              className="portrait-img"
              draggable="false"
              loading="eager"
            />
          </div>

          {/* Subtle Accent Detail Pill */}
          <div className="portrait-accent-pill">
            <span className="pill-badge">MERN</span>
            <span className="pill-text">React & TypeScript</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
