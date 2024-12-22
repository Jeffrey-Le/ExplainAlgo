import Container from "../../components/Container";
import { useUserContext } from "../../contexts/userContext";
import { UserType } from "../../types/types";
import AdminBoard from "./AdminBoard";

import "../../styles/admin.css"

function AdminPage() {
    const userObj = useUserContext();

    const user: UserType = userObj?.user as UserType;

    console.log(user?.role);

    return (
        <>
            <Container classes="items-center flex-col">
                {
                    user?.role === 'admin' ? <AdminBoard/> : <div>  Access Denied </div>
                }
            </Container>
        </>
    )
}

export default AdminPage;