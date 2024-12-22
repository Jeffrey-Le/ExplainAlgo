import Container from './Container';

import { ProblemType } from '../types/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ListItemProps {
    children?: ProblemType;
    classes?: string;
}

/*
{Clone each child to add an onClick event }
{React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
    return React.cloneElement(child, {
        onClick: () => handleClick(child.props.children as string),
    });
    }
    return child;
})}
*/

function ListItem({children, classes}: ListItemProps) {
    console.log(children);
    
    const [id, setID] = useState(children?.id);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
    }, [id]);

    const handleProblemClick = () => {
        // navigate to problem screen with problem ID = id
        console.log('In Problem Click:', id);
        navigate(`/problems/${children?.questionTitle}`);
    };

    const handleSolutionClick = () => {
        // navigate to solution screen with problem ID = id
        console.log('In Solution Click:', id);
    };

    return (
        <>
            <Container classes={`flex-row justify-center items-center ${classes}`}>
                {children &&
                <>
                    <span className="flex items-center" style={{flexGrow: 6, paddingLeft: '5vh'}}> <div onClick={handleProblemClick}>{children?.questionTitle} </div></span>
                    <span className="flex justify-center items-center" style={{flexGrow: 1}}> <div onClick={handleSolutionClick}> Solution </div> </span>
                    <span className="flex justify-center items-center" style={{flexGrow: 2}}>{children?.difficulty?.level}</span>
                    <span className="flex justify-center items-center" style={{flexGrow: 1}}>Completion</span>
                </>
                }
            </Container>
        </>
    )
}

export default ListItem;