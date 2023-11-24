import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import useCoffees from '../../Hooks/useCoffees';
import DisplyCoffee from '../Shared/DisplyCoffee';

const DisplayCoffee = () => {
    const [coffees, loading] = useCoffees()
    const coffee = coffees?.slice(0, 6)

    return (
        <div className="bg-[url('https://i.ibb.co/JCq11pR/1.png')] bg-cover bg-no-repeat bg-center md:h-[50rem] my-10 static mb-20">
            <div className="container">
                <p className="text-center">
                    --- Sip & Savor ---
                </p>
                <div className="relative static flex justify-center ">
                    <h1 className="text-3xl static font-bold text-acent drop-shadow-sm">Our Popular Products</h1>
                    <div className="absolute static top-0 ">
                        <h1 className="text-3xl font-bold text-acent blur-[0.14rem] ">Our Popular Products</h1>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-10 md:p-0 p-4'>


                    {
                        coffee?.map((singleCoffee) => <DisplyCoffee
                            key={singleCoffee._id}
                            singleCoffee={singleCoffee}
                            loading={loading}
                        ></DisplyCoffee>)
                    }
                </div>


                <div className="flex justify-center">

                    <Link to="/allcoffees" className="btn btn-primary text-accent">
                        <FontAwesomeIcon icon={faCartShopping} /> All Coffees
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default DisplayCoffee;