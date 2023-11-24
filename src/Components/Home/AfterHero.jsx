import React from 'react';

const AfterHero = () => {
    return (
        <div className='bg-secondary w-100 py-6'>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center ">
                    <div className="w-[12.813rem] md:text-start text-center">
                        <div className="w-100 flex md:justify-start justify-center">
                            <img className='w-[4rem]' src="https://i.ibb.co/Qr9sNmz/1.png" alt="" />
                        </div>
                        <h3 className="text-2xl text-accent">Awesome Aroma</h3>
                        <p className=' text-neutral'>You will definitely be a fan of the design & aroma of your coffee</p>
                    </div>
                    <div className="w-[12.813rem] md:text-start text-center">
                        <div className="w-100 flex md:justify-start justify-center">
                            <img className='w-[4rem]' src="https://i.ibb.co/qkKWBL7/2.png" alt="" />
                        </div>
                        <h3 className="text-2xl text-accent">High Quality</h3>
                        <p className=' text-neutral'>We served the coffee to you maintaining the best quality</p>
                    </div>
                    <div className="w-[12.813rem] md:text-start text-center">
                        <div className="w-100 flex md:justify-start justify-center">
                            <img className='w-[4rem]' src="https://i.ibb.co/DRcjhQv/3.png" alt="" />
                        </div>
                        <h3 className="text-2xl text-accent">Pure Grades</h3>
                        <p className=' text-neutral'>The coffee is made of the green coffee beans which you will love</p>
                    </div>
                    <div className="w-[12.813rem] md:text-start text-center">
                        <div className="w-100 flex md:justify-start justify-center">
                            <img className='w-[4rem]' src="https://i.ibb.co/wLPmj4g/4.png" alt="" />
                        </div>
                        <h3 className="text-2xl text-accent">Proper Roasting</h3>
                        <p className=' text-neutral'>Your coffee is brewed by first roasting the green coffee beans</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AfterHero;