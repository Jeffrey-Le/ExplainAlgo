import Cont from "./Container";
import ListItem from "./ListItem";

import "../styles/list.css";

// Note Each ListItem will take an array of 4 elements which will contain each data for each section

function List() {
    return (
        <>
        <Cont classes="justify-center items-center flex-col">
            <div className="flex listItem" style={{height: "5vh", border: "none", borderBottom: "1px blue solid"}}>
                <span className="flex justify-center items-center" style={{flexGrow: 6}}>Title</span>
                <span className="flex justify-center items-center" style={{flexGrow: 1}}>Solution</span>
                <span className="flex justify-center items-center" style={{flexGrow: 2}}>Difficulty</span>
                <span className="flex justify-center items-center" style={{flexGrow: 1}}>Completion</span>
            </div>
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
            <ListItem classes="listItem"></ListItem>
        </Cont>
        </>
    )
}

export default List;