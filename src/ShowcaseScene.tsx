import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { PropsWithChildren } from 'react'

export function ShowcaseScene({ children }: PropsWithChildren) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 0, 10]} intensity={0.5} />
            {children}
            <axesHelper args={[20]} />
            <OrbitControls />
        </Canvas>
    )
}
