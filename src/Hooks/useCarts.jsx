import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCarts = () => {
    const { user } = useContext(AuthContext);
    const { refetch, isLoading: loading, isError, data: carts = [], error } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
            return res.json()
        },
    })

    return [carts, refetch, loading]
}

export default useCarts;

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// const useCarts = () => {
//     const [carts, setCarts] = useState([])
//     const [loading, setLoading] = useState(true)
//     const { user } = useContext(AuthContext);
//     useEffect(() => {
//         fetch(`http://localhost:5000/carts?email=${user?.email}`)
//             .then(response => response.json())
//             .then(data => {
//                 setCarts(data);
//                 setLoading(false);
//             })
//     }, [carts])

//     return [carts, loading]
// }

// export default useCarts;
