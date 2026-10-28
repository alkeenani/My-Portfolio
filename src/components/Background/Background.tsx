import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';
import './Background.css';

const Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particles (Stars/Snow)
    const particleCount = theme === 'winter' ? 900 : 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    // Initial Positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.4,
        y: theme === 'winter' ? -Math.random() * 0.8 - 0.2 : (Math.random() - 0.5) * 0.4, 
        z: (Math.random() - 0.5) * 0.4
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Sage & Copper themed particle color
    const getMaterial = () => {
      // Winter: Muted Cyan (0x4D9298), Dark: Soft Sage (0x83B8AB), Light: Sage Teal (0x36766F)
      const color = theme === 'winter' ? 0x4D9298 : (theme === 'dark' ? 0x83B8AB : 0x36766F);
      return new THREE.PointsMaterial({
        color: color,
        size: theme === 'winter' ? 3 : 2,
        transparent: true,
        opacity: theme === 'light' ? 0.35 : (theme === 'winter' ? 0.65 : 0.55),
        sizeAttenuation: true
      });
    };

    const material = getMaterial();
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 500;

    // Animation Loop
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particle system slowly
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0003;

      if (theme === 'winter') {
        const pos = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] -= 0.6; // Snow falling
          if (pos[i * 3 + 1] < -1000) {
            pos[i * 3 + 1] = 1000;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      }

      // Parallax via mouse
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Event Listeners
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.4;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.4;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    const currentContainer = containerRef.current;
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (currentContainer && currentContainer.contains(renderer.domElement)) {
        currentContainer.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return <div ref={containerRef} className="three-background" />;
};

export default Background;
