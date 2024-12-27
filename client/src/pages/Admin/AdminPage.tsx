import Container from "../../components/Container";
import { useUserContext } from "../../contexts/userContext";
import { UserType } from "../../types/types";
import AdminBoard from "./AdminBoard";

import "../../styles/admin.css"
import Unauthorized from "../../components/Unauthorized";

function AdminPage() {
    const userObj = useUserContext();

    const user: UserType = userObj?.user as UserType;

    console.log(user?.role);

    return (
        <>
            <Container classes="items-center flex-col" style={{backgroundColor: "#4b4767"}}>
                {
                    user?.role === 'admin' ? <AdminBoard/> : <Unauthorized/>
                }
            </Container>
        </>
    )
}

export default AdminPage;