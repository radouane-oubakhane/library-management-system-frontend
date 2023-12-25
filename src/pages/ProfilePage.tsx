import useAuth from "../hooks/auth/useAuth"
import AdminProfilePage from "./AdminProfilePage";
import ProfileUserPage from "./UserProfilePage";

const ProfilePage=()=>{
    const {user}=useAuth()


    return (
        <>
        {
            user?.is_admin&&
            (<AdminProfilePage/>)
        }
        {
            !user?.is_admin&&
            (<ProfileUserPage/>)
        }
        </>
    )

}

export default ProfilePage;