import {ReactNode} from 'react';
import Cont from './Container';

interface ListItemProps {
    children?: ReactNode;
    classes?: string;
}

function ListItem({children, classes}: ListItemProps) {
    return (
        <>
            <Cont classes={`flex-row justify-center items-center ${classes}`}>
                {children}
                <span className="flex justify-center items-center" style={{flexGrow: 6}}>Title</span>
                <span className="flex justify-center items-center" style={{flexGrow: 1}}>Solution</span>
                <span className="flex justify-center items-center" style={{flexGrow: 2}}>Difficulty</span>
                <span className="flex justify-center items-center" style={{flexGrow: 1}}>Completion</span>
            </Cont>
        </>
    )
}

export default ListItem;