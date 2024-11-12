import { LegMainPart } from './LegMainPart'
import { FrontPaw } from './FrontPaw'

export const FrontLeg = (
    props: JSX.IntrinsicElements['group'] &
        Pick<JSX.IntrinsicElements['meshStandardMaterial'], 'color'>
) => {
    return (
        <group {...props}>
            <LegMainPart color={props.color} />
            <FrontPaw color={props.color} />
        </group>
    )
}
