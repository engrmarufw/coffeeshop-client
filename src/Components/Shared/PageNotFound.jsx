import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='my-3'>
            <div className="flex justify-center">
                <Link to='/' className="btn btn-secondary mb-3"> <FontAwesomeIcon icon={faArrowLeftLong} />Back To Home</Link>
            </div>
            <div className='flex justify-center'>
                <img src="https://i.ibb.co/fqbwbG5/404.gif" alt="" />
            </div>
        </div>
    );
};

export default PageNotFound;