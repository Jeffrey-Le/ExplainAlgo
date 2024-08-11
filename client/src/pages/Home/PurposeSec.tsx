import Cont from "../../components/Container";

import "../../styles/home.css";

function PurposeSec() {
    return (
        <>
            <Cont classes="purpose justify-center items-center flex-col gap-5 text-center">
                <span className="title">A New Way to Learn</span>
                <span className="content">
                    LeetExplain is a great platform to practice for technical interviews in a way different than programming.
                </span>
                <span className="content">
                    It is a way to enhance your interviewing skills and problem-solving abilities. It differs from Leetcode in the
                    sense that you will solely be tested on wheather or not you can solve a problem through an explanation rather than through
                    your programming abilities.
                </span>
            </Cont>
        </>
    )
}

export default PurposeSec;