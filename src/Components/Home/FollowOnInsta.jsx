import React from 'react';

const FollowOnInsta = () => {
    return (
        <div className='container my-3'>
            <p className='text-neutral text-center'>Follow Us Now</p>
            <div className="relative z-0 flex justify-center ">
                <h1 className="text-3xl font-bold text-acent drop-shadow-sm">Follow on Instagram</h1>
                <div className="absolute top-0 ">
                    <h1 className="text-3xl font-bold text-acent blur-[0.14rem] ">Follow on Instagram</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-10 justify-items-center">
                <div><img className='w-100' src="https://i.ibb.co/7bNtkBX/Rectangle-11.png" alt="" /></div>
                <div><img className='w-100' src="https://i.ibb.co/n8bqQy4/Rectangle-12.png" alt="" /></div>
                <div><img className='w-100' src="https://i.ibb.co/XFNDrGN/Rectangle-13.png" alt="" /></div>
                <div><img className='w-100' src="https://i.ibb.co/KGFqMs4/Rectangle-14.png" alt="" /></div>
                <div><img className='w-[19rem]' src="https://i.ibb.co/0XT5tSG/Rectangle-15.png" alt="" /></div>
                <div><img className='w-100' src="https://i.ibb.co/Zx59qGK/Rectangle-16.png" alt="" /></div>
                <div><img className='w-100' src="https://i.ibb.co/ypRf2ZL/Rectangle-9.png" alt="" /></div>
                <div><img className='w-100' src="https://i.ibb.co/RSWyRHW/Rectangle-10.png" alt="" /></div>
            </div>


        </div>
    );
};

export default FollowOnInsta;