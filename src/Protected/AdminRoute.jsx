import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import { AuthContext } from "../providers/AuthProvider";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [users, loadings] = useUsers()
    let filteredArray = users.filter(obj => obj.role === "Admin" && obj.email === user?.email);
    const location = useLocation();

    if (loadings || loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    if (filteredArray.length != 0) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;