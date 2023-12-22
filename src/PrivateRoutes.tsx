import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/auth/useAuth"
import NavBar from "./components/NavBar";




const PrivateRoutes = () => {
    const {user} = useAuth(); 
    
    if (!user?.is_admin) return <Navigate to="/" />;

    if (!user) return <Navigate to="/login" />;

    

    return (
        <>
            <NavBar />
            <Outlet />
        </>
      );
}

export default PrivateRoutes