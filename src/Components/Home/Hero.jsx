import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[url('https://i.ibb.co/kcrjjC4/3.png')] h-[32rem] bg-cover bg-no-repeat bg-center  w-full ">
      <div className="w-100  h-[32rem] flex items-center justify-end container">
        <div className="text-white w-[31rem] p-4">
          <h1 className='text-4xl'>
            Would you like a Cup of Delicious Coffee?
          </h1>
          <p className='my-3'>It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your companion of every moment!!! Enjoy the beautiful moments and make them memorable.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;