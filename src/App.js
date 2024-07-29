import React, { Suspense, useRef, useState, lazy } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField, ToneMapping, GodRays, Bloom, Noise } from '@react-three/postprocessing';
import { Overlay } from './layout/overlay';
import { LeftMiddle } from './layout/styles';


const FallbackBanana = () => {
  const { scene } = useGLTF('/weed_bud.glb'); // Path to your fallback model

  return (
    <primitive object={scene} scale={[0.1, 0.1, 0.1]} />
  );
};

const Banana = (({ index, z, speed }) => {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

  const { scene, materials } = useGLTF('/weed_bud.glb');

  const [data] = useState(() => ({
    y: 0.1,
    x: 0.1,
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  }));

  useFrame((state, dt) => {
    if (ref.current) {
      ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z);
      ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin));
      if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1));
    }
  });

  const applyMaterials = (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        const materialName = child.material.name;
        const material = materials[materialName] || new THREE.MeshStandardMaterial({ color: '#2e8b57', emissive: '#2e8b57' });
        child.material = material;
      }
    });
  };

  const clonedScene = React.useMemo(() => {
    const sceneClone = scene.clone();
    applyMaterials(sceneClone);
    return sceneClone;
  }, [scene, materials]);

  const scaleFactor = 0.1;

  const fallback =  <group ref={ref} scale={[scaleFactor, scaleFactor, scaleFactor]}>
  <primitive object={clonedScene} />
</group>;

  return (
    <Suspense fallback={null}>
    <group ref={ref} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      <primitive object={clonedScene} />
    </group>
    </Suspense>
  );
});


function Bananas({ speed = 1, count = 80, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
  return (
    <Canvas flat gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 8, near: 0.01, far: depth + 15 }}>
    <color attach="background" args={['#f0f4c3']} /> {/* Light green background */}
    <spotLight position={[10, 20, 10]} penumbra={1} decay={0} intensity={3} color="#90ee90" /> {/* Light green spot light */}
    <Suspense fallback={<FallbackBanana />}>
      {Array.from({ length: count }, (_, i) => (
        <Banana key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} />
      ))}
      <Environment preset="sunset" />
    </Suspense>
    <EffectComposer disableNormalPass multisampling={0}>
    <DepthOfField
          target={[0, 0, 60]} // Focus on the center of the scene
          focusDistance={10} // Adjust as needed to control depth of field
          focalLength={0.5}  // Controls the strength of the blur
          bokehScale={2}     // Controls the size of the bokeh effect
          height={700}       // The height of the depth texture
        />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.02} />
      <ToneMapping />
    </EffectComposer>
  </Canvas>
  );
}

function App() {
  const [speed, set] = useState(1)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Bananas speed={speed} />
      <Overlay />
      <LeftMiddle>
        <input type="range" min="-1" max="5" value={speed} step="1" onChange={(e) => set(e.target.value)} />
      </LeftMiddle>
    </div>
  );
}

export default App;
