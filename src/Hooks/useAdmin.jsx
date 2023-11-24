import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useUsers from "./useUsers";

const useAdmin = () => {
    const [isadmin, setIsadmin] = useState(false)
    const { user, loading } = useContext(AuthContext);
    const [users, loadings] = useUsers()
    let filteredArray = users.filter(obj => obj.role === "Admin" && obj.email === user?.email);
    if (loadings || loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    if (filteredArray.length != 0) {
        setIsadmin(true);
    }
    return [isadmin]
};

export default useAdmin;