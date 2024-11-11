import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/Addons.js'

const Box = (props: JSX.IntrinsicElements['mesh']) => {
    const ref = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    useFrame(() => ref.current?.rotation && (ref.current.rotation.x += 0.01))
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const Hearth = () => {
    const ref = useRef<THREE.Mesh>(null)

    const shape = useMemo(() => {
        const s = new THREE.Shape()
        const x = -2.5
        const y = -5
        s.moveTo(x + 2.5, y + 2.5)
        s.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
        s.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
        s.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
        s.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
        s.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
        s.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)
        return s
    }, [])

    const extrudeSettings = useMemo(
        () => ({
            steps: 2,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 2,
        }),
        []
    )

    useFrame(() => {
        if (!ref.current) return
        ref.current.rotation.z += 0.1
    })

    return (
        <mesh ref={ref} rotation={[Math.PI, 0, 0]} position={[0, 0, -10]}>
            <meshLambertMaterial color="red" opacity={0.5} wireframe />
            <extrudeGeometry args={[shape, extrudeSettings]} />
        </mesh>
    )
}

const ImportedObject = () => {
    const obj = useLoader(OBJLoader, '/model.obj')
    return <primitive object={obj} />
}

export default function SceneWithBox() {
    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <Hearth />
            <ImportedObject />
        </Canvas>
    )
}
