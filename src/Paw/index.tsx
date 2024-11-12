import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const Paw = () => {
    const pawRef = useRef<THREE.Group>(null)

    // Simple animation for slight rotation
    useFrame((state) => {
        if (!pawRef.current) return
        pawRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    })

    return (
        <group ref={pawRef}>
            {/* Main leg - cylinder and half-spheres */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>

            <mesh position={[0, 0.75, 0]}>
                <sphereGeometry
                    args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
                />
                <meshStandardMaterial color="white" />
            </mesh>

            <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]}>
                <sphereGeometry
                    args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
                />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Small paw shape at the bottom of the leg */}
            <group position={[0, -1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
                {/* Small cylinder for the paw */}
                <mesh>
                    <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Half-sphere for the front end of the paw */}
                <mesh position={[0.4, 0, 0]}>
                    <sphereGeometry
                        args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
                    />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Half-sphere for the back end of the paw */}
                <mesh position={[-0.4, 0, 0]} rotation={[Math.PI, 0, 0]}>
                    <sphereGeometry
                        args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
                    />
                    <meshStandardMaterial color="white" />
                </mesh>
            </group>
        </group>
    )
}

function PawScene() {
    return (
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {/* Add the Paw model */}
            <Paw />

            {/* Controls for rotating the scene */}
            <OrbitControls />
        </Canvas>
    )
}

export default PawScene
