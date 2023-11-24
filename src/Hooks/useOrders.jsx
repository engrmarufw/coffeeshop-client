import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
const useOrders = () => {
    const { user } = useContext(AuthContext);
    const { refetch, isLoading: loading, isError, data: orders = [], error } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://coffeeshop-server-sandy.vercel.app/orders?email=${user?.email}`)
            return res.json()
        },
    })

    return [orders, refetch, loading]

}

export default useOrders;