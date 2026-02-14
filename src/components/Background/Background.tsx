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
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Particles (Stars/Snow)
    const particleCount = theme === 'winter' ? 1500 : 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // Initial Positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // z
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5, 
        z: (Math.random() - 0.5) * 0.5
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material logic based on theme
    const getMaterial = () => {
      const color = theme === 'winter' ? 0x00bcd4 : (theme === 'dark' ? 0xffffff : 0x000000);
      return new THREE.PointsMaterial({
        color: color,
        size: theme === 'winter' ? 4 : 2,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true // sizes particles based on depth
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

      // Rotate entire system slowly
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;

      // Parallax via mouse
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
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
      mouseX = (event.clientX - window.innerWidth / 2) * 0.5; // Scale factor
      mouseY = (event.clientY - window.innerHeight / 2) * 0.5;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    const currentContainer = containerRef.current; // capture ref value
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      // Three.js cleanup
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (currentContainer && currentContainer.contains(renderer.domElement)) {
        currentContainer.removeChild(renderer.domElement);
      }
    };
  }, [theme]); // Re-run when theme changes

  return <div ref={containerRef} className="three-background" />;
};

export default Background;
