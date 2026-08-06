import React, { useEffect, useRef, useState } from 'react';

export default function NetworkBackground({ scrollProgress = 0, currentSection = 0 }) {
  const canvasRef = useRef(null);
  const [activePing, setActivePing] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node count (25-35 nodes - clean & heavy, not crowded)
    const nodeCount = Math.min(Math.floor(width / 45), 35);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: `node_${String(i + 1).padStart(2, '0')}`,
        x: Math.random() * width,
        y: Math.random() * height,
        // Heavier, slow ambient movement
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.2,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2 + 1.2,
        pinging: false,
        pingTimer: 0,
        pingText: '',
      });
    }

    const sectionCount = 7;
    const sectionNodes = [];
    for (let i = 0; i < sectionCount; i++) {
      sectionNodes.push({
        x: (i + 0.5) * width,
        y: height * 0.5 + Math.sin(i * 1.5) * (height * 0.2),
      });
    }

    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Rust & Server Infrastructure ping vocabulary
    const serverVocabulary = [
      'wipe_scheduled',
      'rcon::connected',
      'oxide::loaded',
      'latency 12ms',
      'map::procedural',
      'port 28015 :: active',
      'gemini::inference_ok',
      'supabase::synced',
      'discord_bot::listening',
    ];

    let lastPingTime = Date.now();
    const pingInterval = 5500;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastPingTime > pingInterval) {
        lastPingTime = now;
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.pinging = true;
        randomNode.pingTimer = 1.0;
        const eventTag = serverVocabulary[Math.floor(Math.random() * serverVocabulary.length)];
        randomNode.pingText = `${randomNode.id} :: ${eventTag}`;
        setActivePing(randomNode.pingText);
        setTimeout(() => setActivePing(null), 2500);
      }

      // Main horizontal connecting topology path
      const scrollX = scrollProgress * (width * (sectionCount - 1));
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(109, 88, 240, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      for (let i = 0; i < sectionNodes.length; i++) {
        const sx = sectionNodes[i].x - scrollX;
        const sy = sectionNodes[i].y;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.restore();

      // Node movement & render
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Reduced cursor interaction radius (110px instead of 160px) + heavier inertia
        let distMouse = 9999;
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          distMouse = Math.sqrt(dx * dx + dy * dy);

          if (distMouse < 110 && !prefersReducedMotion) {
            const force = (110 - distMouse) / 110;
            // Heavy inertia shift (0.6 multiplier instead of 1.5)
            node.x -= (dx / distMouse) * force * 0.6;
            node.y -= (dy / distMouse) * force * 0.6;
          }
        }

        // Connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.2;
            const isNearMouse = distMouse < 110;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);

            if (isNearMouse) {
              ctx.strokeStyle = `rgba(57, 255, 136, ${alpha * 2.2})`;
              ctx.lineWidth = 1;
            } else {
              ctx.strokeStyle = `rgba(109, 88, 240, ${alpha})`;
              ctx.lineWidth = 0.6;
            }
            ctx.stroke();
          }
        }

        // Draw Node Point
        ctx.beginPath();
        ctx.arc(node.x, node.y, distMouse < 110 ? node.radius * 1.5 : node.radius, 0, Math.PI * 2);
        
        if (distMouse < 110) {
          ctx.fillStyle = '#39FF88';
        } else {
          ctx.fillStyle = '#6D58F0';
        }
        ctx.fill();

        // Ping Event animation
        if (node.pinging) {
          node.pingTimer -= 0.015;
          if (node.pingTimer <= 0) {
            node.pinging = false;
          } else {
            const ringRadius = (1 - node.pingTimer) * 35;
            ctx.beginPath();
            ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(57, 255, 136, ${node.pingTimer * 0.7})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillStyle = '#39FF88';
            ctx.fillText(node.pingText, node.x + 10, node.y - 10);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {activePing && (
        <div className="fixed bottom-6 right-6 font-mono text-[11px] text-[#39FF88] bg-[#0A0A0F]/90 px-3 py-1.5 border border-[#39FF88]/30 backdrop-blur-md transition-all">
          <span className="inline-block w-1.5 h-1.5 bg-[#39FF88] animate-ping mr-2"></span>
          EVENT :: {activePing}
        </div>
      )}
    </div>
  );
}
