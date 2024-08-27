import {ReactNode} from 'react';
import Container from './Container';

import { ProblemType } from '../types/types';

interface ListItemProps {
    children?: ProblemType;
    classes?: string;
}

function ListItem({children, classes}: ListItemProps) {
    console.log(children);
    return (
        <>
            <Container classes={`flex-row justify-center items-center ${classes}`}>
                {children &&
                <>
                    <span className="flex justify-center items-center" style={{flexGrow: 6}}>{children?.question_title}</span>
                    <span className="flex justify-center items-center" style={{flexGrow: 1}}>Solution</span>
                    <span className="flex justify-center items-center" style={{flexGrow: 2}}>{children?.difficulty?.level}</span>
                    <span className="flex justify-center items-center" style={{flexGrow: 1}}>Completion</span>
                </>
                }
            </Container>
        </>
    )
}

export default ListItem;