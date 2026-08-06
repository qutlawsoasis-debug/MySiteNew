import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function RectangularMeshPlane({ theme = 'dark' }) {
  const lineRef = useRef();

  const cols = 44;
  const rows = 26;
  const gridWidth = 28;
  const gridHeight = 18;

  const numVertices = (cols + 1) * (rows + 1);

  const { positions, basePositions, currentZ, targetZ, lineIndices } = useMemo(() => {
    const pos = new Float32Array(numVertices * 3);
    const base = new Float32Array(numVertices * 3);
    const curZ = new Float32Array(numVertices);
    const tarZ = new Float32Array(numVertices);

    let idx = 0;
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols - 0.5) * gridWidth;
        const y = (j / rows - 0.5) * gridHeight;
        const z = 0;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        base[idx * 3] = x;
        base[idx * 3 + 1] = y;
        base[idx * 3 + 2] = z;

        curZ[idx] = 0;
        tarZ[idx] = 0;
        idx++;
      }
    }

    const indices = [];
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const current = j * (cols + 1) + i;
        if (i < cols) {
          const right = current + 1;
          indices.push(current, right);
        }
        if (j < rows) {
          const top = current + (cols + 1);
          indices.push(current, top);
        }
      }
    }

    return {
      positions: pos,
      basePositions: base,
      currentZ: curZ,
      targetZ: tarZ,
      lineIndices: new Uint32Array(indices),
    };
  }, [cols, rows, gridWidth, gridHeight, numVertices]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex(new THREE.BufferAttribute(lineIndices, 1));
    return geo;
  }, [positions, lineIndices]);

  const { raycaster, camera } = useThree();
  const mousePlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mousePoint = useRef(new THREE.Vector3(1000, 1000, 0));
  const mouseActive = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(mousePlane, hit)) {
        mousePoint.current.copy(hit);
        mouseActive.current = true;
      }
    };

    const handleMouseLeave = () => {
      mouseActive.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [raycaster, camera, mousePlane]);

  useFrame((state) => {
    if (!lineRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttr = lineRef.current.geometry.attributes.position;
    const array = positionAttr.array;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    for (let i = 0; i < numVertices; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];

      let zTarget = prefersReducedMotion ? 0 : Math.sin(bx * 0.35 + time * 0.6) * Math.cos(by * 0.35 + time * 0.6) * 0.12;

      if (mouseActive.current && !prefersReducedMotion) {
        const dx = bx - mousePoint.current.x;
        const dy = by - mousePoint.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 4.0;

        if (dist < radius) {
          const factor = Math.cos((dist / radius) * (Math.PI / 2));
          zTarget -= factor * 1.6;
        }
      }

      targetZ[i] = zTarget;
      currentZ[i] += (targetZ[i] - currentZ[i]) * 0.08;

      array[i * 3 + 2] = currentZ[i];
    }

    positionAttr.needsUpdate = true;
  });

  const lineColor = theme === 'light' ? '#5B43EC' : '#6D58F0';
  const lineOpacity = theme === 'light' ? 0.35 : 0.22;

  return (
    <group rotation={[-0.4, 0, 0]} position={[0, -0.2, -1.5]}>
      <lineSegments ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={lineOpacity}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function DeformableMeshBackground({ theme = 'dark' }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full block"
      >
        <RectangularMeshPlane theme={theme} />
      </Canvas>
    </div>
  );
}
