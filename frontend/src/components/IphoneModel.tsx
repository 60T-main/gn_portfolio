import { useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Pages } from "./enums/pages";
import HomePage from "./HomePage";
import ProjectsPage from "./ProjectsPage";

function IphoneModel() {
  const { nodes, scene } = useGLTF("/iphone.glb") as any;

  const { camera } = useThree();

  const [page, setPage] = useState(Pages.home);

  const [showHtml, setShowHtml] = useState(true);

  const rotationRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (rotationRef.current && camera) {
      setShowHtml(true);
      // Get the screen's world normal (local z-axis)
      const normal = new THREE.Vector3(0, 0, 1);
      normal.applyQuaternion(
        rotationRef.current.getWorldQuaternion(new THREE.Quaternion())
      );

      // Get direction from screen to camera
      const screenPosition = new THREE.Vector3();
      rotationRef.current.getWorldPosition(screenPosition);
      const cameraDirection = camera.position
        .clone()
        .sub(screenPosition)
        .normalize();

      // Dot product: >0 means facing camera, <0 means facing away
      const dot = normal.dot(cameraDirection);
      setShowHtml(dot > 0.02);
    }
  });

  return (
    <group>
      <primitive object={scene} scale={30} position={[0, -3, 0]} />

      {nodes.Screen && (
        <mesh
          geometry={nodes.Screen.geometry}
          position={nodes.Screen.position}
          ref={rotationRef}
        >
          <Html
            transform
            distanceFactor={1}
            center
            position={[0, 0, 0.1]}
            className={`screen ${!showHtml ? "hide" : ""}`}
          >
            {page === Pages.home && <HomePage setPage={setPage} />}
            {page === Pages.projects && <ProjectsPage setPage={setPage} />}
          </Html>
        </mesh>
      )}
    </group>
  );
}

export default function IPhoneScene() {
  return (
    <div className="canvas-div">
      <Canvas style={{ zIndex: 10000 }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[2, 2, 2]} />
        <directionalLight intensity={3} position={[-2, -2, -2]} />
        <IphoneModel />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
