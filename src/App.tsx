import SceneWithBox from './FirstBasicScene'
import FrontLegs from './FrontLegs'
import { FrontLeg } from './FrontLegs/FrontLeg'
import { FrontPaw } from './FrontLegs/FrontPaw'
import { ShowcaseScene } from './ShowcaseScene'
import ToyDog, { Head } from './ToyDog/ToyDog'

function App() {
    return (
        <ShowcaseScene>
            <FrontLegs />
            <Head />
        </ShowcaseScene>
    )
}

export default App
