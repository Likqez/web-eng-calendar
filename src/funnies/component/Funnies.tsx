// i got this new funny idea. basically there's this duck except it's got huge agresso. i mean some serious hatered. a real set of vicious.
// packin some furiouso. massive abhorrence. big ol' detest. what happens next?! more ducks shows up with even bigger despise. humongous hungolomghononoloughongous.

import PERFECTION from "../../../public/perfection.gif";
import { getMousePos } from "../../main";

const MOVEMENT_SPEED = 0.02;
let INITIALIZED = false;

interface FunnyProp {
    x: number;
    y: number;
}

export const initAnimation = (getDucks, setDucks) => {
    if (INITIALIZED) return;
    INITIALIZED = true;
    animate(getDucks, setDucks);
}


// https://codepen.io/nanonansen/pen/oRWmaY
function animate(getDucks, setDucks) {
    const mPos = getMousePos();
    const newFunnies = [];
    for (const duck of getDucks()) {
        const distX = mPos.x - duck.x;
        const distY = mPos.y - duck.y;

        const nX = duck.x + (distX * MOVEMENT_SPEED);
        const nY = duck.y + (distY * MOVEMENT_SPEED);
        newFunnies.push({x: nX, y: nY});
    }
    setDucks(newFunnies);
    
    requestAnimationFrame(() => animate(getDucks, setDucks));
}

export const Funny = (props: FunnyProp) => {
    return (
        <>
            <div className="object-cover w-10 aspect-square absolute top-0 left-0 z-20"
                 style={{
                    left: `${props.x}px`,
                    top: `${props.y}px`
                 }}>
                <img src={PERFECTION} title="DEATH" />
            </div>
        </>
    )
}

export default Funny;