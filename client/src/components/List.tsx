import Container from "./Container";
import ListItem from "./ListItem";

import "../styles/list.css";
import { ProblemType } from "../types/types";

interface ListProps {
    items?: ProblemType[];
    classes?: string;
}

// Note Each ListItem will take an array of 4 elements which will contain each data for each section

function List({items, classes}: ListProps) {
    return (
        <>
        <Container classes={`justify-center items-center flex-col ${classes}`}>
            <div className="flex listItem" style={{height: "5vh", border: "none", borderBottom: "1px blue solid"}}>
                <span className="flex justify-center items-center" style={{flexBasis: "60%"}}>Title</span>
                <span className="flex justify-center items-center" style={{flexBasis: "10%"}}>Solution</span>
                <span className="flex justify-center items-center" style={{flexBasis: "20%"}}>Difficulty</span>
                <span className="flex justify-center items-center" style={{flexBasis: "10%"}}>Completion</span>
            </div>

            {items && items.map((item) => <ListItem classes="listItem">{item}</ListItem>)}
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
        </Container>
        </>
    )
}

export default List;