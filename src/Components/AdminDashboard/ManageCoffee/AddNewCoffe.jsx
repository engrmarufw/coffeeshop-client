import React, { useState } from 'react';
import InputCoffee from './InputCoffee';

const AddNewCoffe = () => {
    const [newCoffee, setNewCoffee] = useState({});

    return (
        <div className=' md:m-5 md:p-0 p-4'>


            <div className="card w-100 bg-secondary shadow-xl mb-10">
                <div className="card-body">


                    <div className="relative flex justify-center">
                        <h1 className="text-2xl font-bold text-acent drop-shadow-sm">Add New Coffee</h1>
                        <div className="absolute top-0 ">
                            <h1 className="text-2xl font-bold text-acent blur-[0.09rem] ">Add New Coffee</h1>
                        </div>
                    </div>
                    <p className='md:px-[15rem] text-center'>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                    <div className="card-actions">
                        <InputCoffee
                            setNewCoffee={setNewCoffee}
                            newCoffee={newCoffee}
                        ></InputCoffee>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewCoffe;