import { useEffect, useState } from "react";

const useUsers = () => {
    const [users, setUsers] = useState([])
    const [loadings, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
    }, [users])

    return [users, loadings]
}

export default useUsers;