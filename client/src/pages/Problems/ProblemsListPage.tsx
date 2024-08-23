import { useProblemsListPage } from "./ProblemsListPage.hooks";

import List from "../../components/List";
import Container from "../../components/Container";

import { useListItemContext } from "../../contexts";
import ListItem from "../../components/ListItem";

function ProblemsListPage() {
    const {newProblems, isLoading, isError, error} = useProblemsListPage();
    //const {problems} = useListItemContext();

    console.log("pROBLEMS:", newProblems);

    if (isLoading)
        return <div> Loading... </div>;

    if (isError)
        return <div> {error?.message} </div>;

    // {newProblems && newProblems.length > 0 ? (<ListItem>{newProblems[0]}</ListItem>) : (<p>No problems</p>)}

    return (
        <>
            
            <div>
                <List items={newProblems}/>
            </div>
        </>
    )
}

export default ProblemsListPage;