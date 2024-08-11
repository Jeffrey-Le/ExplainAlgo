import { useProblemsListPage } from "./ProblemsListPage.hooks";

import List from "../../components/List";
import Cont from "../../components/Container";

function ProblemsListPage() {
    useProblemsListPage();

    return (
        <>
            <List/>
        </>
    )
}

export default ProblemsListPage;