import { FrontLeg } from './FrontLeg'
import { ONE_DEGREE as DEGREE, SECONDARY_COLOR } from '../constants'

const LEG_TILT_Z = DEGREE * 10

const FrontLegs = () => {
    return (
        <>
            {/* Left Leg - Slight tilt inward */}
            <FrontLeg
                color={SECONDARY_COLOR}
                position={[1, 0, 0]}
                rotation={[0, 0, LEG_TILT_Z]}
            />

            {/* Right Leg - Tilt in the opposite direction */}
            <FrontLeg
                color={SECONDARY_COLOR}
                position={[-1, 0, 0]}
                rotation={[0, 0, -LEG_TILT_Z]}
            />
        </>
    )
}

export default FrontLegs
