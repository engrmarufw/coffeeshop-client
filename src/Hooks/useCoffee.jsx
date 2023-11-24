import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useCoffee = () => {
    const [oneCoffee, setOneCoffee] = useState([])
    const [loading, setLoading] = useState(true)
    const { coffeeID } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/coffees/${coffeeID}`)
            .then(response => response.json())
            .then(data => {
                setOneCoffee(data);
                setLoading(false);
            })
    }, [oneCoffee])

    return [oneCoffee, loading]
}

export default useCoffee;