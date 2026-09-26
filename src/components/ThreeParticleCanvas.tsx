import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeParticleCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed, fallback active', e);
      return;
    }

    // Texture Loader with local assets
    const textureLoader = new THREE.TextureLoader();
    
    // Load local ender pearl & eye of ender png textures
    const pearlTexture = textureLoader.load('./assets/ender_pearl.png');
    const eyeTexture = textureLoader.load('./assets/eye_of_ender.png');

    // Create Minecraft Sprite particles
    const sprites: {
      sprite: THREE.Sprite;
      vx: number;
      vy: number;
      vz: number;
      rotSpeed: number;
      floatPhase: number;
      baseY: number;
    }[] = [];

    const numSprites = 26; // balanced for aesthetic & high FPS

    for (let i = 0; i < numSprites; i++) {
      const isEye = i % 2 === 0;
      const texture = isEye ? eyeTexture : pearlTexture;
      
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.65 + Math.random() * 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      
      // Spread across 3D view
      const x = (Math.random() - 0.5) * 850;
      const y = (Math.random() - 0.5) * 650;
      const z = (Math.random() - 0.5) * 400 - 50;

      sprite.position.set(x, y, z);
      
      // Random scale (Minecraft pixel item style)
      const scale = 22 + Math.random() * 24;
      sprite.scale.set(scale, scale, 1);

      scene.add(sprite);

      sprites.push({
        sprite,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.15,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        floatPhase: Math.random() * Math.PI * 2,
        baseY: y
      });
    }

    // Glowing Motes (Pink #EF007E and Gold #FFDF00 ambient stardust)
    const moteCount = 120;
    const moteGeometry = new THREE.BufferGeometry();
    const motePositions = new Float32Array(moteCount * 3);
    const moteColors = new Float32Array(moteCount * 3);

    const pinkColor = new THREE.Color(0xEF007E);
    const goldColor = new THREE.Color(0xFFDF00);

    for (let i = 0; i < moteCount; i++) {
      motePositions[i * 3] = (Math.random() - 0.5) * 1100;
      motePositions[i * 3 + 1] = (Math.random() - 0.5) * 900;
      motePositions[i * 3 + 2] = (Math.random() - 0.5) * 500;

      const c = Math.random() > 0.4 ? pinkColor : goldColor;
      moteColors[i * 3] = c.r;
      moteColors[i * 3 + 1] = c.g;
      moteColors[i * 3 + 2] = c.b;
    }

    moteGeometry.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
    moteGeometry.setAttribute('color', new THREE.BufferAttribute(moteColors, 3));

    // Canvas particle texture for smooth round motes
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const glowTex = new THREE.CanvasTexture(canvas);

    const moteMaterial = new THREE.PointsMaterial({
      size: 9,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const motePoints = new THREE.Points(moteGeometry, moteMaterial);
    scene.add(motePoints);

    // Mouse tracking for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.12;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.12;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize handler
    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetCameraX += (mouseX - targetCameraX) * 0.04;
      targetCameraY += (-mouseY - targetCameraY) * 0.04;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // Animate sprite particles
      for (let i = 0; i < sprites.length; i++) {
        const item = sprites[i];
        
        // Gentle bobbing and drift
        item.floatPhase += 0.02;
        item.sprite.position.x += item.vx;
        item.sprite.position.y = item.baseY + Math.sin(item.floatPhase + i) * 16;
        item.sprite.position.z += item.vz;
        
        // Subtle material rotation
        item.sprite.material.rotation += item.rotSpeed;

        // Boundary wrapping
        if (item.sprite.position.x > 450) item.sprite.position.x = -450;
        if (item.sprite.position.x < -450) item.sprite.position.x = 450;
        if (item.sprite.position.y > 350) {
          item.sprite.position.y = -350;
          item.baseY = -350;
        }
        if (item.sprite.position.y < -350) {
          item.sprite.position.y = 350;
          item.baseY = 350;
        }
      }

      // Slowly rotate ambient motes
      motePoints.rotation.y = elapsedTime * 0.02;
      motePoints.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};
