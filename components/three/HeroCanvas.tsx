"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  ContactShadows,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * "Genius AI engineer at the desk" scene.
 *
 * A stylised workstation: three curved monitors streaming animated code /
 * token ticks, a floating holographic "brain" above the desk, a low-poly
 * figure leaning at a keyboard, ambient neon rim lighting.
 *
 * Built to look premium while staying light: MeshStandardMaterial everywhere,
 * no Environment map, Bloom-only postprocessing, adaptive DPR, and a
 * PerformanceMonitor that scales DPR down if the machine struggles.
 */

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const h = () => setR(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return r;
}

// --------- Animated code texture on monitor screens ---------

function createCodeTexture(hue: number) {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;

  const draw = (t: number) => {
    ctx.fillStyle = "#05060a";
    ctx.fillRect(0, 0, size, size);

    // top bar
    ctx.fillStyle = "#0b0d13";
    ctx.fillRect(0, 0, size, 22);
    const dots = ["#ff6068", "#ffbd44", "#00ca4e"];
    dots.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(14 + i * 14, 11, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.font = "12px ui-monospace, Menlo, monospace";
    const lineH = 15;
    const start = 34;
    const rows = Math.floor((size - start) / lineH);
    for (let i = 0; i < rows; i++) {
      const y = start + i * lineH;
      const phase = Math.sin(t * 0.0007 + i * 0.4);
      const alpha = 0.35 + Math.abs(phase) * 0.55;
      // line number
      ctx.fillStyle = `rgba(120,130,160,${alpha * 0.5})`;
      ctx.fillText(String(i + 1).padStart(2, " "), 10, y);
      // tokens
      let x = 40;
      const tokens = TOKEN_PATTERN[(i + Math.floor(t * 0.0005)) % TOKEN_PATTERN.length];
      for (const tok of tokens) {
        const w = ctx.measureText(tok.text).width;
        ctx.fillStyle = tok.color.replace("$a", String(alpha));
        ctx.fillText(tok.text, x, y);
        x += w + 6;
        if (x > size - 30) break;
      }
      // caret on a random row
      if (i === Math.floor((t * 0.003) % rows)) {
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${0.8 + Math.sin(t * 0.01) * 0.2})`;
        ctx.fillRect(x, y - 10, 6, 12);
      }
    }

    // side gradient
    const g = ctx.createLinearGradient(0, 0, 0, size);
    g.addColorStop(0, "rgba(124,92,255,0.08)");
    g.addColorStop(1, "rgba(34,211,238,0.04)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    tex.needsUpdate = true;
  };

  return { texture: tex, draw };
}

const TOKEN_PATTERN: Array<Array<{ text: string; color: string }>> = [
  [
    { text: "const", color: "rgba(124,92,255,$a)" },
    { text: "agent", color: "rgba(231,233,238,$a)" },
    { text: "=", color: "rgba(164,170,184,$a)" },
    { text: "new", color: "rgba(124,92,255,$a)" },
    { text: "Supervisor()", color: "rgba(34,211,238,$a)" },
  ],
  [
    { text: "await", color: "rgba(124,92,255,$a)" },
    { text: "agent.plan({", color: "rgba(231,233,238,$a)" },
  ],
  [
    { text: "  goal:", color: "rgba(164,170,184,$a)" },
    { text: "'compound ROI'", color: "rgba(52,211,153,$a)" },
    { text: ",", color: "rgba(164,170,184,$a)" },
  ],
  [
    { text: "  budget:", color: "rgba(164,170,184,$a)" },
    { text: "{ tokens:", color: "rgba(231,233,238,$a)" },
    { text: "4096", color: "rgba(245,158,11,$a)" },
    { text: "},", color: "rgba(164,170,184,$a)" },
  ],
  [
    { text: "});", color: "rgba(231,233,238,$a)" },
  ],
  [
    { text: "if", color: "rgba(124,92,255,$a)" },
    { text: "(eval.pass)", color: "rgba(231,233,238,$a)" },
    { text: "ship();", color: "rgba(52,211,153,$a)" },
  ],
  [
    { text: "// p95", color: "rgba(100,108,130,$a)" },
    { text: "< 800ms", color: "rgba(245,158,11,$a)" },
  ],
  [
    { text: "export", color: "rgba(124,92,255,$a)" },
    { text: "default", color: "rgba(124,92,255,$a)" },
    { text: "pipeline;", color: "rgba(231,233,238,$a)" },
  ],
];

function Monitor({
  position,
  rotation,
  hue,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  hue: number;
  index: number;
}) {
  const { texture, draw } = useMemo(() => createCodeTexture(hue), [hue]);
  useFrame(({ clock }) => {
    draw(clock.getElapsedTime() * 1000 + index * 250);
  });
  return (
    <group position={position} rotation={rotation}>
      {/* bezel */}
      <mesh>
        <boxGeometry args={[2.6, 1.6, 0.08]} />
        <meshStandardMaterial color="#0a0b10" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.4, 1.4]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive={"#ffffff"}
          emissiveIntensity={0.65}
          toneMapped={false}
        />
      </mesh>
      {/* stand */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 10]} />
        <meshStandardMaterial color="#111218" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.05, 24]} />
        <meshStandardMaterial color="#0f1117" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

// --------- Keyboard + desk ---------

function Desk() {
  return (
    <group position={[0, -1.6, 0]}>
      {/* top */}
      <mesh>
        <boxGeometry args={[8, 0.12, 3]} />
        <meshStandardMaterial color="#15161d" metalness={0.2} roughness={0.55} />
      </mesh>
      {/* edge glow */}
      <mesh position={[0, 0.07, 1.48]}>
        <boxGeometry args={[8.02, 0.02, 0.04]} />
        <meshStandardMaterial
          color="#7c5cff"
          emissive="#7c5cff"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>
      {/* legs */}
      {[-3.5, 3.5].map((x) => (
        <mesh key={x} position={[x, -0.9, 0]}>
          <boxGeometry args={[0.1, 1.8, 2.8]} />
          <meshStandardMaterial color="#0b0c12" metalness={0.4} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Keyboard() {
  const keysRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 48; // 4 rows x 12

  useEffect(() => {
    if (!keysRef.current) return;
    let i = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        dummy.position.set(
          -2.1 + c * 0.38 + (r % 2 ? 0.05 : 0),
          0,
          -0.45 + r * 0.3
        );
        dummy.updateMatrix();
        keysRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    keysRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  const glowsRef = useRef<THREE.Group>(null);
  const [lit, setLit] = useState<number[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // choose 3 pseudo-random keys lit at any time
    const k = [
      Math.floor(((Math.sin(t * 4.3) + 1) / 2) * count),
      Math.floor(((Math.sin(t * 5.1 + 1.7) + 1) / 2) * count),
      Math.floor(((Math.sin(t * 3.2 + 3.1) + 1) / 2) * count),
    ];
    setLit(k);
  });

  return (
    <group position={[0, -1.48, 0.9]} rotation={[-0.05, 0, 0]}>
      {/* base */}
      <mesh>
        <boxGeometry args={[5, 0.1, 1.6]} />
        <meshStandardMaterial color="#0b0c12" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* keycaps */}
      <instancedMesh ref={keysRef} args={[undefined, undefined, count]} position={[0, 0.08, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.22]} />
        <meshStandardMaterial color="#1a1c24" metalness={0.25} roughness={0.7} />
      </instancedMesh>
      {/* glow highlights */}
      <group ref={glowsRef}>
        {lit.map((idx, i) => {
          const r = Math.floor(idx / 12);
          const c = idx % 12;
          return (
            <mesh
              key={i}
              position={[
                -2.1 + c * 0.38 + (r % 2 ? 0.05 : 0),
                0.13,
                -0.45 + r * 0.3,
              ]}
            >
              <boxGeometry args={[0.3, 0.02, 0.22]} />
              <meshStandardMaterial
                color="#22d3ee"
                emissive="#22d3ee"
                emissiveIntensity={2.5}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// --------- The engineer ---------

function Engineer() {
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const reduce = useReducedMotion();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (!reduce) {
      if (leftArm.current) leftArm.current.rotation.x = -0.9 + Math.sin(t * 6) * 0.05;
      if (rightArm.current) rightArm.current.rotation.x = -0.9 + Math.sin(t * 6 + 1.1) * 0.05;
      if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          pointer.x * 0.25,
          0.05
        );
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          -0.25 + pointer.y * -0.08,
          0.05
        );
      }
      if (bodyRef.current) {
        bodyRef.current.position.y = THREE.MathUtils.lerp(
          bodyRef.current.position.y,
          Math.sin(t * 1.3) * 0.015,
          0.1
        );
      }
    }
  });

  return (
    <group position={[0, -2.15, 2.2]} ref={bodyRef}>
      {/* chair back — hinted only */}
      <mesh position={[0, 0.8, -0.3]}>
        <boxGeometry args={[1.4, 2.2, 0.12]} />
        <meshStandardMaterial color="#0a0b10" metalness={0.2} roughness={0.75} />
      </mesh>

      {/* torso */}
      <mesh position={[0, 1.15, 0.1]}>
        <boxGeometry args={[1.25, 1.4, 0.65]} />
        <meshStandardMaterial color="#17141f" metalness={0.15} roughness={0.75} />
      </mesh>
      {/* hoodie hood ridge */}
      <mesh position={[0, 1.8, 0.05]}>
        <torusGeometry args={[0.45, 0.1, 8, 22]} />
        <meshStandardMaterial color="#0e0c14" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* left arm */}
      <group position={[-0.65, 1.5, 0.35]} ref={leftArm} rotation={[-0.9, 0.1, 0.3]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 1.1, 12]} />
          <meshStandardMaterial color="#17141f" metalness={0.15} roughness={0.8} />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color="#e8c3a5" metalness={0.05} roughness={0.9} />
        </mesh>
      </group>
      {/* right arm */}
      <group position={[0.65, 1.5, 0.35]} ref={rightArm} rotation={[-0.9, -0.1, -0.3]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 1.1, 12]} />
          <meshStandardMaterial color="#17141f" metalness={0.15} roughness={0.8} />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color="#e8c3a5" metalness={0.05} roughness={0.9} />
        </mesh>
      </group>

      {/* head group */}
      <group position={[0, 2.1, 0.1]} ref={headRef}>
        {/* neck */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.25, 12]} />
          <meshStandardMaterial color="#e8c3a5" roughness={0.9} />
        </mesh>
        {/* head */}
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color="#eac7a8" roughness={0.85} metalness={0.02} />
        </mesh>
        {/* hair */}
        <mesh position={[0, 0.12, -0.03]} rotation={[0.1, 0, 0]}>
          <sphereGeometry args={[0.44, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#110e17" roughness={0.9} />
        </mesh>
        {/* glasses — two rings + bridge */}
        <group position={[0, 0, 0.4]}>
          <mesh position={[-0.13, 0, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.1, 0.015, 10, 26]} />
            <meshStandardMaterial
              color="#e7e9ee"
              emissive="#7c5cff"
              emissiveIntensity={0.3}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.13, 0, 0]}>
            <torusGeometry args={[0.1, 0.015, 10, 26]} />
            <meshStandardMaterial
              color="#e7e9ee"
              emissive="#22d3ee"
              emissiveIntensity={0.3}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.06, 0.01, 0.01]} />
            <meshStandardMaterial color="#e7e9ee" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* lens tint */}
          <mesh position={[-0.13, 0, 0.002]}>
            <circleGeometry args={[0.09, 24]} />
            <meshBasicMaterial color="#0b0d13" transparent opacity={0.55} />
          </mesh>
          <mesh position={[0.13, 0, 0.002]}>
            <circleGeometry args={[0.09, 24]} />
            <meshBasicMaterial color="#0b0d13" transparent opacity={0.55} />
          </mesh>
          {/* screen reflection in glasses */}
          <mesh position={[-0.13, 0, 0.003]}>
            <planeGeometry args={[0.17, 0.06]} />
            <meshBasicMaterial color="#7c5cff" transparent opacity={0.45} toneMapped={false} />
          </mesh>
          <mesh position={[0.13, 0, 0.003]}>
            <planeGeometry args={[0.17, 0.06]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.45} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// --------- Floating AI "brain" ---------

function Brain() {
  const g = useRef<THREE.Group>(null);
  const m = useRef<THREE.Mesh>(null);
  const reduce = useReducedMotion();

  useFrame(({ clock }) => {
    if (reduce) return;
    const t = clock.getElapsedTime();
    if (g.current) {
      g.current.rotation.y += 0.004;
      g.current.position.y = 2.5 + Math.sin(t * 0.9) * 0.12;
    }
    if (m.current) {
      const s = 1 + Math.sin(t * 2) * 0.03;
      m.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, 2.5, -0.5]} ref={g}>
      <mesh ref={m}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#7c5cff"
          emissive="#7c5cff"
          emissiveIntensity={0.9}
          metalness={0.2}
          roughness={0.25}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          transparent
          opacity={0.25}
        />
      </mesh>
      {/* data bits floating around */}
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r = 0.95;
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(a * 0.7) * 0.3, Math.sin(a) * r]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// --------- Lights & floor ---------

function Lights() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 5, 3]} intensity={0.45} color="#ffffff" />
      <pointLight position={[-3, 1.5, -2]} intensity={2.2} color="#7c5cff" distance={12} />
      <pointLight position={[3, 1.5, -2]} intensity={1.9} color="#22d3ee" distance={12} />
      <pointLight position={[0, 0.5, 3.5]} intensity={1.2} color="#ff6ad5" distance={6} />
      <spotLight
        position={[0, 4, 4]}
        angle={0.55}
        penumbra={0.6}
        intensity={0.8}
        color="#ffffff"
        target-position={[0, -1, 1]}
      />
    </>
  );
}

function Floor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.52, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#06070b" roughness={0.7} metalness={0.15} />
      </mesh>
      {/* grid glow lines */}
      <gridHelper
        args={[30, 30, "#7c5cff", "#141724"]}
        position={[0, -2.51, 0]}
      />
      <ContactShadows
        position={[0, -2.5, 0.5]}
        opacity={0.4}
        scale={12}
        blur={2.4}
        far={5}
      />
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.2, 0));
  const reduce = useReducedMotion();

  useFrame(({ pointer }) => {
    if (reduce) return;
    const tx = pointer.x * 0.4;
    const ty = 0.4 + pointer.y * 0.2;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.03);
    camera.lookAt(target.current);
  });

  return null;
}

// --------- Composition ---------

function Scene() {
  return (
    <>
      <Lights />
      <Floor />
      <Desk />
      <Keyboard />
      <Monitor position={[-2.6, -0.1, -0.6]} rotation={[0, 0.42, 0]} hue={265} index={0} />
      <Monitor position={[0, -0.05, -0.9]} rotation={[0, 0, 0]} hue={190} index={1} />
      <Monitor position={[2.6, -0.1, -0.6]} rotation={[0, -0.42, 0]} hue={320} index={2} />
      <Engineer />
      <Brain />
      <Rig />
    </>
  );
}

export default function HeroCanvas() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.6]);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0.6, 6.5], fov: 38 }}
      className="!absolute inset-0 h-full w-full"
    >
      <PerformanceMonitor
        onDecline={() => setDpr([0.8, 1.2])}
        onIncline={() => setDpr([1, 1.6])}
      >
        <Suspense fallback={null}>
          <Scene />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.35}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.22} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
