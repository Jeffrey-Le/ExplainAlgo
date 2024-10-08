import {} from 'react';

import Container from "../../components/Container";

import NavBar from '../../components/NavBar';

import IntroSec from './IntroSec';

import PurposeSec from './PurposeSec';

import "../../styles/home.css";

function HomePage() {
    return (
        <>
            <Container classes="home flex-col">
                <div className="section1">
                    <IntroSec/>
                </div>
                <div className="section2">
                    <PurposeSec/>
                </div>
            </Container>
        </>
    )

    /*
            <div className="parallax">
                <div className="parallax__group">
                    <div className="parallax__layer parallax__layer--back">
                        Hello
                    </div>
                    <div className="parallax__layer parallax__layer--base">
                        <IntroSec/>
                    </div>
                </div>
                <div className="parallax__group">
                        <PurposeSec/>
                </div>
            </div>
    */
}

export default HomePage;