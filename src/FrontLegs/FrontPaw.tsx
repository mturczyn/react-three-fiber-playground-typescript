import { LEG_RADIUS } from './LegMainPart'

const PAW_LENGTH = 0.5

export const FrontPaw = (
    props: JSX.IntrinsicElements['meshStandardMaterial']
) => {
    return (
        <>
            {/* Small paw shape at the bottom of the leg */}
            {/* Small cylinder for the paw */}
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0, PAW_LENGTH / 2]}
            >
                <cylinderGeometry
                    args={[LEG_RADIUS, LEG_RADIUS, PAW_LENGTH, 32]}
                />
                <meshStandardMaterial {...props} />
            </mesh>

            {/* Half-sphere for the front end of the paw */}
            <mesh position={[0, 0, PAW_LENGTH]}>
                <sphereGeometry
                    args={[LEG_RADIUS, 32, 16, 0, Math.PI, 0, Math.PI]}
                />
                <meshStandardMaterial {...props} />
            </mesh>
        </>
    )
}
