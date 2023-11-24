

import React from 'react';
import useCoffees from '../../Hooks/useCoffees';
import DisplyCoffee from '../Shared/DisplyCoffee';
const AllCoffees = () => {
    const [coffees, loading] = useCoffees();
    return (
        <div>
            <div className="container my-6">



                <div className="relative static flex justify-center ">
                    <h1 className="text-3xl static font-bold text-acent drop-shadow-sm">Our All Products</h1>
                    <div className="absolute static top-0 ">
                        <h1 className="text-3xl font-bold text-acent blur-[0.14rem] ">Our All Products</h1>
                    </div>
                </div>
                <p className="text-center">
                    --- Sip & Savor ---
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-10 md:p-0 p-4'>
                    {
                        coffees?.map((singleCoffee) => <DisplyCoffee
                            key={singleCoffee.id}
                            singleCoffee={singleCoffee}
                            loading={loading}
                        ></DisplyCoffee>)
                    }
                </div>

            </div>
        </div>
    );
};

export default AllCoffees;