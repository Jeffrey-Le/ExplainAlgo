import {ReactNode} from 'react';
import '../styles/container.css';

interface ContainerProps {
    children?: ReactNode;
    classes?: string;
}

function Cont({children, classes = "cont bg-blue-300"}: ContainerProps) {
    return (
        <>
            <div className={`cont flex ${classes}`}>
                {children}
            </div>
        </>
    )
}

export default Cont;