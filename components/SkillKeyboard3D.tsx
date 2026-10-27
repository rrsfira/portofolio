"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, RoundedBox } from "@react-three/drei";
import {
  BufferAttribute,
  BufferGeometry,
  type Group,
  MathUtils,
  PerspectiveCamera,
} from "three";
import { skills } from "@/lib/data";

const KEY_SIZE = 0.9;
const KEY_GAP = 0.075;
const KEY_STEP = KEY_SIZE + KEY_GAP;
const KEY_HEIGHT = 0.5;

const skillRows = [
  skills.slice(0, 2),
  skills.slice(2, 5),
  skills.slice(5, 9),
  skills.slice(9, 12),
];

type Skill = (typeof skills)[number];

type Props = {
  selectedIndex: number | null;
  typingIndex: number | null;
  onSelect: (index: number) => void;
};

function createKeycapGeometry(): BufferGeometry {
  const radius = 0.13;
  const cornerSegments = 5;
  const rings = [
    { y: 0.1, scale: 0.91 },
    { y: 0.16, scale: 1 },
    { y: 0.42, scale: 0.96 },
    { y: KEY_HEIGHT, scale: 0.84 },
  ];
  const half = KEY_SIZE / 2 - radius;
  const perimeter: [number, number][] = [];
  const corners: [number, number, number][] = [
    [half, half, 0],
    [-half, half, 90],
    [-half, -half, 180],
    [half, -half, 270],
  ];

  corners.forEach(([centerX, centerZ, startAngle]) => {
    for (let point = 0; point <= cornerSegments; point += 1) {
      const angle =
        ((startAngle + (point * 90) / cornerSegments) * Math.PI) / 180;
      perimeter.push([
        centerX + radius * Math.cos(angle),
        centerZ + radius * Math.sin(angle),
      ]);
    }
  });

  const ringSize = perimeter.length;
  const topCenter = ringSize * rings.length;
  const bottomCenter = topCenter + 1;
  const positions = new Float32Array((bottomCenter + 1) * 3);

  rings.forEach(({ y, scale }, ringIndex) => {
    perimeter.forEach(([x, z], pointIndex) => {
      const offset = (ringIndex * ringSize + pointIndex) * 3;
      positions[offset] = x * scale;
      positions[offset + 1] = y;
      positions[offset + 2] = z * scale;
    });
  });

  positions[topCenter * 3 + 1] = KEY_HEIGHT - 0.035;
  positions[bottomCenter * 3 + 1] = 0.1;

  const indices: number[] = [];
  for (let ring = 0; ring < rings.length - 1; ring += 1) {
    for (let point = 0; point < ringSize; point += 1) {
      const next = (point + 1) % ringSize;
      const currentRing = ring * ringSize;
      const nextRing = (ring + 1) * ringSize;
      indices.push(
        currentRing + point,
        nextRing + point,
        currentRing + next,
        currentRing + next,
        nextRing + point,
        nextRing + next,
      );
    }
  }

  const upperRing = (rings.length - 1) * ringSize;
  for (let point = 0; point < ringSize; point += 1) {
    const next = (point + 1) % ringSize;
    indices.push(upperRing + point, topCenter, upperRing + next);
    indices.push(bottomCenter, point, next);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function CameraFit({ width, depth }: { width: number; depth: number }) {
  const { camera, size } = useThree();

  useFrame(() => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const aspect = size.width / Math.max(size.height, 1);
    const horizontalFit = width / Math.max(aspect, 0.7);
    const distance = Math.max(
      5.2,
      Math.min(7.5, (horizontalFit + depth * 0.28) / 0.43),
    );

    perspectiveCamera.position.set(
      distance * 0.58,
      distance * 0.55,
      distance * 0.78,
    );
    perspectiveCamera.lookAt(0, 0.18, 0);
  });

  return null;
}

function Keycap({
  skill,
  index,
  selected,
  typing,
  onSelect,
}: {
  skill: Skill;
  index: number;
  selected: boolean;
  typing: boolean;
  onSelect: (index: number) => void;
}) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  const geometry = useMemo(() => createKeycapGeometry(), []);
  const color = skill.accent || "#159bd7";

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetY = typing ? -0.11 : hovered ? 0.045 : 0;
    const targetScale = hovered ? 1.025 : 1;
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      16,
      delta,
    );
    groupRef.current.scale.x = MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      16,
      delta,
    );
    groupRef.current.scale.y = MathUtils.damp(
      groupRef.current.scale.y,
      targetScale,
      16,
      delta,
    );
    groupRef.current.scale.z = MathUtils.damp(
      groupRef.current.scale.z,
      targetScale,
      16,
      delta,
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(index);
      }}
    >
      <RoundedBox
        args={[KEY_SIZE + 0.08, 0.16, KEY_SIZE + 0.08]}
        radius={0.1}
        smoothness={5}
        position={[0, 0.08, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#05070a"
          roughness={0.32}
          metalness={0.2}
        />
      </RoundedBox>

      <mesh
        geometry={geometry}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.02}
          clearcoat={0.85}
          clearcoatRoughness={0.16}
          emissive={color}
          emissiveIntensity={selected ? 0.09 : hovered ? 0.025 : 0}
        />
      </mesh>

      <Html
        position={[0, KEY_HEIGHT + 0.012, 0]}
        center
        transform
        distanceFactor={4.25}
        style={{
          width: "38px",
          height: "38px",
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <Icon
          aria-hidden="true"
          size={28}
          strokeWidth={1.8}
          color="#ffffff"
          style={{
            display: "block",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,.42))",
          }}
        />
      </Html>

      {selected && (
        <mesh position={[0, KEY_HEIGHT + 0.005, 0]}>
          <boxGeometry args={[KEY_SIZE * 0.72, 0.008, KEY_SIZE * 0.72]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
          />
        </mesh>
      )}
    </group>
  );
}

function KeyboardScene({ selectedIndex, typingIndex, onSelect }: Props) {
  const { allKeys, width, depth } = useMemo(() => {
    let index = 0;
    const rowOffsets = [0.52, 0.25, 0, -0.22];
    const rows = skillRows.map((row, rowIndex) =>
      row.map((skill, columnIndex) => ({
        skill,
        index: index++,
        x:
          (columnIndex - (row.length - 1) / 2) * KEY_STEP +
          rowOffsets[rowIndex],
        z: (rowIndex - (skillRows.length - 1) / 2) * KEY_STEP,
      })),
    );
    const allKeys = rows.flat();
    const width = Math.max(...skillRows.map((row) => row.length)) * KEY_STEP + 0.42;
    const depth = skillRows.length * KEY_STEP + 0.4;
    return { allKeys, width, depth };
  }, []);

  return (
    <>
      <CameraFit width={width} depth={depth} />

      <ambientLight intensity={0.48} />
      <hemisphereLight
        color="#e7f2ff"
        groundColor="#030407"
        intensity={0.72}
      />
      <directionalLight
        position={[-4, 7, 5]}
        intensity={2.25}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0002}
      />
      <pointLight
        position={[-4, 2.5, 3]}
        intensity={8}
        distance={9}
        color="#3a8cff"
      />
      <pointLight
        position={[4, 2.5, -2]}
        intensity={7}
        distance={8}
        color="#ff6a3d"
      />

      <RoundedBox
        args={[width, 0.34, depth]}
        radius={0.26}
        smoothness={10}
        position={[0, -0.12, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#050608"
          roughness={0.27}
          metalness={0.3}
          clearcoat={0.7}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      <RoundedBox
        args={[width - 0.12, 0.055, depth - 0.12]}
        radius={0.22}
        smoothness={8}
        position={[0, 0.055, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#151a20"
          roughness={0.3}
          metalness={0.24}
        />
      </RoundedBox>

      {allKeys.map(({ skill, index, x, z }) => (
        <group key={`${skill.name}-${index}`} position={[x, 0, z]}>
          <Keycap
            skill={skill}
            index={index}
            selected={selectedIndex === index}
            typing={typingIndex === index}
            onSelect={onSelect}
          />
        </group>
      ))}

      <ContactShadows
        position={[0, -0.31, 0]}
        opacity={0.52}
        scale={Math.max(width, depth) + 0.8}
        blur={2.1}
        far={2.1}
        resolution={256}
        color="#000000"
      />
    </>
  );
}

export function SkillKeyboard3D(props: Props) {
  return (
    <div
      className="skill-keyboard-3d"
      role="group"
      aria-label="Interactive 3D keyboard of development skills"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [4, 3.8, 5.5], fov: 29, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <KeyboardScene {...props} />
      </Canvas>
    </div>
  );
}
