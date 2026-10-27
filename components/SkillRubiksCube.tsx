"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, RoundedBox } from "@react-three/drei";
import type { Group } from "three";
import { skills } from "@/lib/data";

const CUBELET_SIZE = 0.96;
const CUBELET_STEP = 1.04;
const FACE_OFFSET = CUBELET_STEP + CUBELET_SIZE / 2 + 0.018;

type Skill = (typeof skills)[number];

type Props = {
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

type Face = "front" | "right" | "top";

type FaceAssignment = {
  skill: Skill;
  index: number;
  face: Face;
  row: number;
  column: number;
};

const assignments: FaceAssignment[] = [
  ...skills.slice(0, 9).map((skill, index) => ({
    skill,
    index,
    face: "front" as const,
    row: Math.floor(index / 3),
    column: index % 3,
  })),
  ...skills.slice(9, 12).map((skill, index) => ({
    skill,
    index: index + 9,
    face: "right" as const,
    row: index,
    column: 1,
  })),
];

const faceColors = ["#08b8d3", "#1f65e8", "#13a85d", "#f0bf18", "#ef332b"];

function getTileTransform(face: Face, row: number, column: number) {
  const coordinate = (value: number) => (value - 1) * CUBELET_STEP;

  if (face === "front") {
    return {
      position: [coordinate(column), -coordinate(row), FACE_OFFSET] as [
        number,
        number,
        number,
      ],
      rotation: [0, 0, 0] as [number, number, number],
    };
  }

  if (face === "right") {
    return {
      position: [FACE_OFFSET, -coordinate(row), -coordinate(column)] as [
        number,
        number,
        number,
      ],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
    };
  }

  return {
    position: [coordinate(column), FACE_OFFSET, coordinate(row)] as [
      number,
      number,
      number,
    ],
    rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
  };
}

function SkillTile({
  assignment,
  selected,
  onSelect,
}: {
  assignment: FaceAssignment;
  selected: boolean;
  onSelect: (index: number) => void;
}) {
  const Icon = assignment.skill.icon;
  const { position, rotation } = getTileTransform(
    assignment.face,
    assignment.row,
    assignment.column,
  );
  const pointerDown = useRef<{ x: number; y: number } | null>(null);
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const accent = assignment.skill.accent || faceColors[assignment.index % faceColors.length];

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerDown={(event) => {
        event.stopPropagation();
        pointerDown.current = { x: event.clientX, y: event.clientY };
      }}
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
        const start = pointerDown.current;
        const moved = start
          ? Math.hypot(event.clientX - start.x, event.clientY - start.y)
          : 0;
        pointerDown.current = null;
        if (moved < 8) onSelect(assignment.index);
      }}
    >
      <RoundedBox
        args={[CUBELET_SIZE, CUBELET_SIZE, 0.11]}
        radius={0.1}
        smoothness={5}
        position={[0, 0, 0.03]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={accent}
          roughness={0.2}
          metalness={0.02}
          clearcoat={0.85}
          clearcoatRoughness={0.16}
          emissive={accent}
          emissiveIntensity={selected ? 0.1 : hovered ? 0.025 : 0}
        />
      </RoundedBox>

      <Html
        position={[0, 0, 0.085]}
        center
        transform
        distanceFactor={4.5}
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
          size={27}
          color="#fff"
          strokeWidth={1.8}
          style={{ display: "block", filter: "drop-shadow(0 1px 2px rgba(0,0,0,.4))" }}
        />
      </Html>
    </group>
  );
}

function CubeModel({ selectedIndex, onSelect }: Props) {
  const cubelets = useMemo(() => {
    const values: [number, number, number][] = [];
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          values.push([x * CUBELET_STEP, y * CUBELET_STEP, z * CUBELET_STEP]);
        }
      }
    }
    return values;
  }, []);

  return (
    <group rotation={[0.08, -0.22, -0.04]}>
      {cubelets.map(([x, y, z], index) => (
        <RoundedBox
          key={`cubelet-${index}`}
          args={[CUBELET_SIZE, CUBELET_SIZE, CUBELET_SIZE]}
          radius={0.09}
          smoothness={4}
          position={[x, y, z]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#080a0e"
            roughness={0.3}
            metalness={0.12}
            clearcoat={0.35}
            clearcoatRoughness={0.22}
          />
        </RoundedBox>
      ))}

      {assignments.map((assignment) => (
        <SkillTile
          key={`${assignment.face}-${assignment.index}`}
          assignment={assignment}
          selected={selectedIndex === assignment.index}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function Scene({ selectedIndex, onSelect }: Props) {
  return (
    <>
      <ambientLight intensity={0.48} />
      <hemisphereLight color="#dcecff" groundColor="#05060a" intensity={0.7} />
      <directionalLight
        position={[-4, 6, 5]}
        intensity={2.2}
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
      <pointLight position={[-4, 2, 3]} intensity={8} distance={9} color="#258bff" />
      <pointLight position={[4, 2, -2]} intensity={7} distance={8} color="#ff6d38" />

      <CubeModel selectedIndex={selectedIndex} onSelect={onSelect} />

      <ContactShadows
        position={[0, -1.7, 0]}
        scale={5.5}
        opacity={0.52}
        blur={2.4}
        far={3.5}
        resolution={256}
        color="#000000"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minDistance={5}
        maxDistance={8}
        dampingFactor={0.08}
        enableDamping
        rotateSpeed={0.7}
      />
    </>
  );
}

export function SkillRubiksCube(props: Props) {
  return (
    <div
      className="skill-rubiks-cube"
      role="group"
      aria-label="Interactive 3D Rubik's cube of development skills"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [4.8, 4.2, 5.8], fov: 34, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene {...props} />
      </Canvas>
      <div className="sr-only">
        {skills.map((skill, index) => (
          <button
            key={skill.name}
            type="button"
            onClick={() => props.onSelect(index)}
          >
            Select {skill.name}
          </button>
        ))}
      </div>
    </div>
  );
}
