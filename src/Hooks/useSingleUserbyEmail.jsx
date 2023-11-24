import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
const useSingleUserbyEmail = () => {
    const { user } = useContext(AuthContext);
    const { refetch, isLoading: loading, isError, data: singleUser = [], error } = useQuery({
        queryKey: ['singleUser', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/emailfind/${user?.email}`)
            return res.json()
        },
    })

    return [singleUser, refetch, loading]
};

export default useSingleUserbyEmail;