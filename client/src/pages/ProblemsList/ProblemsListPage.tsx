import { useProblemsListPage } from "./ProblemsListPage.hooks";

import List from "../../components/List";

import "../../styles/problemList.css"


function ProblemsListPage() {
    const {newProblems, isLoading, isError, error, isFetching} = useProblemsListPage();
    //const {problems} = useListItemContext();

    console.log("pROBLEMS:", newProblems);

    if (isLoading || isFetching)
        return <div> Loading... </div>;

    if (isError)
        return <div> {error?.message} </div>;

    // {newProblems && newProblems.length > 0 ? (<ListItem>{newProblems[0]}</ListItem>) : (<p>No problems</p>)}

    return (
        <>
            <div className="scrollable-container">
               <List items={newProblems} classes={"listbox"}/> 
            </div>
        </>
    )
}

export default ProblemsListPage;