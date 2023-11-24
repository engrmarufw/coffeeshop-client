import React from 'react';
import AfterHero from './AfterHero';
import DisplayCoffee from './DisplayCoffee';
import FollowOnInsta from './FollowOnInsta';
import Hero from './Hero';

const Home = () => {
    return (
        <div>

            <Hero></Hero>
            <AfterHero></AfterHero>
            <DisplayCoffee></DisplayCoffee>
            <FollowOnInsta></FollowOnInsta>

        </div>
    );
};

export default Home;