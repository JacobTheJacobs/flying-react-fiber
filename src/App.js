import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, useProgress } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  ToneMapping,
  Bloom,
  Noise,
} from "@react-three/postprocessing";
import { Overlay } from "./layout/overlay";
import { Helmet } from "react-helmet";
import { useTransition } from "./useTransition"; // Correctly importing your custom hook

const Loadera = ({ setClicked }) => {
  const { active, progress } = useProgress();
  const style = useTransition(active, {
    from: { opacity: 1, transform: "translateY(0)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    duration: 1000,
    onRest: () => setClicked(true),
  });

  useEffect(() => {
    if (progress === 100) {
      setClicked(true);
    }
  }, [progress, setClicked]);

  return (
    <div
      className="loading"
      style={{ ...style, transition: "all 1000ms ease" }}
    >
      <div className="loading-text">
        Loading
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
      <div>Work`s better on BIG screens</div>
      <br />
      <div className="loading-bar-container">
        <div
          className="loading-bar"
          style={{ width: `${progress.toFixed(2)}%` }}
        >
          <span className="loading-data">{`${progress.toFixed(2)}%`}</span>
        </div>
      </div>
    </div>
  );
};

const Intro = () => {
  const [vec] = useState(() => new THREE.Vector3())
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.mouse.x * 0.1, 3 + state.mouse.y * 0.5, 14), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}

const FallbackBanana = React.memo(() => {
  const { scene } = useGLTF("/model.glb"); // Path to your fallback model

  return <primitive object={scene} scale={[100, 100, 100]} />;
});

const Banana = React.memo(({ index, z, speed }) => {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

  const { scene, materials } = useGLTF("/model.glb");

  const [data] = useState(() => ({
    y: height * 2, // Start above the viewport
    x: 0.1,
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  }));

  useFrame((state, dt) => {
    if (ref.current) {
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y -= dt * speed ), // Move downwards
        -z
      );
      ref.current.rotation.set(
        (data.rX += dt / data.spin),
        Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
        (data.rZ += dt / data.spin)
      );
      if (data.y < -height * 2) // Adjust the lower limit for resetting position
        data.y = height * 2; // Reset to the top
    }
  });

  const applyMaterials = useCallback(
    (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          const materialName = child.material.name;
          const material =
            materials[materialName] ||
            new THREE.MeshStandardMaterial({
              color: "#2e8b57",
              emissive: "#2e8b57",
            });
          child.material = material;
        }
      });
    },
    [materials]
  );

  const clonedScene = useMemo(() => {
    const sceneClone = scene.clone();
    applyMaterials(sceneClone);
    return sceneClone;
  }, [scene, applyMaterials]);

  const scaleFactor = 0.1;

  return (
    <group ref={ref} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      <primitive object={clonedScene} />
    </group>
  );
});


function Bananas({
  speed = 1,
  count = 20,
  depth = 80,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Banana
          key={i}
          index={i}
          z={Math.round(easing(i / count) * depth)}
          speed={speed}
        />
      ))}
    </>
  );
}
function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const [speed, setSpeed] = useState(20);
  const [count, setCount] = useState(20);

  useEffect(() => {
    if (clicked) {
      setReady(true);
      let intervalId;
      let currentSpeed = speed;
      intervalId = setInterval(() => {
        currentSpeed -= 0.5;
        setSpeed(currentSpeed);
        if (currentSpeed <= 7) {
          clearInterval(intervalId);
          setSpeed(1);
        }
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [clicked]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setCount(isMobile ? 20 : 100); // Reduce the number of objects on mobile devices
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  const store = useMemo(
    () => ({ clicked, setClicked, ready, setReady }),
    [clicked, ready]
  );

  return (
    <>
      <Helmet>
        <title>Thank u App - Share Your Inspiration and Ideas</title>
        <meta
          name="description"
          content="Thank u App - A platform for sharing inspiration and ideas."
        />
        <meta
          name="keywords"
          content="Inspiration, Ideas, Thank u App, Creative Platform"
        />
        <meta
          property="og:title"
          content="Thank u App - Share Your Inspiration and Ideas"
        />
        <meta
          property="og:description"
          content="Thank u App - A platform for sharing inspiration and ideas."
        />
        <meta property="og:image" content="%PUBLIC_URL%/og-image.png" />
        <meta property="og:url" content="https://preview-65df4.web.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Thank u App - Share Your Inspiration and Ideas"
        />
        <meta
          name="twitter:description"
          content="Thank u App - A platform for sharing inspiration and ideas."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/twitter-image.png" />
      </Helmet>

      {!ready && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "black",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loadera {...store} />
        </div>
      )}

      {
        <div style={{ width: "100%", height: "100vh" }}>
          <Canvas
            flat
            gl={{ antialias: false }}
            dpr={[1, 1.5]}
            camera={{
              position: [0, 0, 10],
              fov: 20,
              near: 0.01,
              far: 105,
            }}
          >
            <color attach="background" args={["#f0f4c3"]} />
            {/* Light green background */}
            <spotLight
              position={[10, 20, 10]}
              penumbra={1}
              decay={0}
              intensity={3}
              color="#90ee90"
            />
            <spotLight position={[0, 10, 0]} intensity={0.8} color="#90ee90" />
            <directionalLight
              position={[1, 0, 2]}
              intensity={0.7}
              color="#90ee90"
            />
            <Suspense fallback={<FallbackBanana />}>
              <Bananas speed={speed} count={count} />
              <Environment preset="sunset" />
            </Suspense>
            <EffectComposer disableNormalPass multisampling={0}>
              <DepthOfField
                target={[0, 0, 0]} // Focus on the center of the scene
                focusDistance={0.1} // Focus on objects closer to the camera
                focalLength={0.02} // Narrow depth of field
                bokehScale={2} // Enhance bokeh effect
                height={700} // Height of the depth texture
              />
              <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                height={300}
              />
              <Noise opacity={0.02} />
              <ToneMapping />
            </EffectComposer>
            <Intro start={ready && clicked} set={setReady} />
          </Canvas>
          {ready && <Overlay speed={speed} set={setSpeed} />}
        </div>
      }
    </>
  );
}

export default App;
