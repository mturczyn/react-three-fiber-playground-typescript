import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function ToyDog() {
    return <Head />
}

function Head() {
    // Custom Shader Material for Gradient Effect
    const gradientMaterial = useMemo(
        () =>
            new THREE.ShaderMaterial({
                uniforms: {
                    color1: { value: new THREE.Color('#ADD8E6') }, // Light blue color
                    color2: { value: new THREE.Color('#FFFFFF') }, // White color
                },
                vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
                fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            void main() {
                gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
            }
        `,
            }),
        []
    )

    // Define the points for the mouth curve
    const mouthCurve = useMemo(() => {
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.3, 0.2, 0.95), // left side of the mouth
            new THREE.Vector3(0, 0.15, 1), // middle point (slightly down for smile shape)
            new THREE.Vector3(0.3, 0.2, 0.95), // right side of the mouth
        ])
        return path
    }, [])

    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {/* Head with Gradient Material */}
            <mesh material={gradientMaterial} position={[0, 0.5, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
            </mesh>

            {/* Eyes */}
            <Eye position={new THREE.Vector3(-0.3, 0.6, 0.9)} out={true} />
            <mesh position={[-0.3, 0.6, 0.9]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <Eye position={new THREE.Vector3(0.3, 0.6, 0.9)} out={false} />
            <mesh position={[0.3, 0.6, 0.9]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Nose */}
            <mesh position={[0, 0.4, 0.95]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Mouth Line */}
            <mesh>
                <tubeGeometry args={[mouthCurve, 20, 0.03, 8, false]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </Canvas>
    )
}

const Eye = ({ out, position }: { out: boolean; position: THREE.Vector3 }) => {
    const eyeRef = useRef<THREE.Mesh>(null)

    useFrame(() => {
        if (!eyeRef.current) return
        if (out) eyeRef.current.position.x -= 0.05
        else eyeRef.current.position.x += 0.05
    })
    return (
        <mesh ref={eyeRef} position={position}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="black" />
        </mesh>
    )
}
