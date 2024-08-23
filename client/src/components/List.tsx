import Container from "./Container";
import ListItem from "./ListItem";

import "../styles/list.css";

interface ListProps {
    items?: any[];
}

// Note Each ListItem will take an array of 4 elements which will contain each data for each section

function List({items}: ListProps) {
    return (
        <>
        <Container classes="justify-center items-center flex-col">
            <div className="flex listItem" style={{height: "5vh", border: "none", borderBottom: "1px blue solid"}}>
                <span className="flex justify-center items-center" style={{flexGrow: 6}}>Title</span>
                <span className="flex justify-center items-center" style={{flexGrow: 1}}>Solution</span>
                <span className="flex justify-center items-center" style={{flexGrow: 2}}>Difficulty</span>
                <span className="flex justify-center items-center" style={{flexGrow: 1}}>Completion</span>
            </div>

            {items && items.map((item) => <ListItem classes="listItem">{item}</ListItem>)}
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
        </Container>
        </>
    )
}

export default List;