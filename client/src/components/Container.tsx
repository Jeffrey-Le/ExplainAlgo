import {CSSProperties, ReactNode} from 'react';
import '../styles/container.css';

interface ContainerProps {
    children?: ReactNode;
    classes?: string;
    style?: CSSProperties;
}

function Container({children, classes = "cont bg-blue-300", style}: ContainerProps) {
    return (
        <>
            <div style={style} className={`cont flex ${classes}`}>
                {children}
            </div>
        </>
    )
}

export default Container;