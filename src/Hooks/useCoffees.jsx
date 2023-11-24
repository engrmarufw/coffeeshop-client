import { useEffect, useState } from "react"

const useCoffees = () => {
    const [coffee, setCoffee] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://coffeeshop-server-sandy.vercel.app/coffees")
            .then(response => response.json())
            .then(data => {
                setCoffee(data);
                setLoading(false);
            })
    }, [coffee])

    return [coffee, loading]
}

export default useCoffees;