import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useState } from 'react';
import { useEffect } from 'react';
const useSingleUserbyEmail = () => {
    const { user } = useContext(AuthContext);

    const [singleUser, setUsers] = useState([])
    const [singleUserloadings, setLoading] = useState(true)
    useEffect(() => {
        fetch(`https://coffeeshop-server-sandy.vercel.app/users/emailfind/${user?.email}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
             
                setLoading(false);
            })
    }, [singleUser, user])
   
    return [singleUser, singleUserloadings]
};

export default useSingleUserbyEmail;