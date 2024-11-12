export const LEG_HEIGHT = 1.5
export const LEG_RADIUS = 0.5

export const LegMainPart = (
    props: JSX.IntrinsicElements['meshStandardMaterial']
) => {
    return (
        <>
            {/* Upper shere */}
            <mesh position={[0, LEG_HEIGHT / 2, 0]}>
                <cylinderGeometry
                    args={[LEG_RADIUS, LEG_RADIUS, LEG_HEIGHT, 32]}
                />
                <meshStandardMaterial {...props} />
            </mesh>
            {/* Main cylinder */}
            <mesh position={[0, LEG_HEIGHT, 0]}>
                <sphereGeometry
                    args={[LEG_RADIUS, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
                />
                <meshStandardMaterial {...props} />
            </mesh>
            {/* Bottom shere */}
            <mesh rotation={[Math.PI, 0, 0]}>
                <sphereGeometry
                    args={[LEG_RADIUS, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
                />
                <meshStandardMaterial {...props} />
            </mesh>
        </>
    )
}
