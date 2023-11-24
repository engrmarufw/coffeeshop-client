import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCarts from '../../Hooks/useCarts';
import { AuthContext } from '../../providers/AuthProvider';

const DisplyCoffee = ({ singleCoffee, loading }) => {
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(AuthContext);
    const [, refetch] = useCarts()
    const navigate = useNavigate()
    const handelCart = (id) => {
        const cartdata = {
            productID: id,
            coffeeName: singleCoffee.coffeeName,
            price: singleCoffee.price,
            taste: singleCoffee.taste,
            photo: singleCoffee.photo,
            quantity: quantity,
            email: user?.email
        };
        if (user) {
            axios.post('https://coffeeshop-server-sandy.vercel.app/carts', cartdata)
                .then(response => {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Add to cart successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'You have to login befor add to cart?',
                showCancelButton: true,
                confirmButtonText: 'Login',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })
        }
    }




    return (
        <div>
            {
                loading ? <div className="w-full h-screen flex items-center justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
                    : <div className="card lg:card-side probg shadow-xl static md:h-[13rem]">
                        <figure className=''><img className='w-100' src={singleCoffee.photo} alt="Album" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Name: {singleCoffee.coffeeName}</h2>
                            <span className=''>Chef: {singleCoffee.chef}</span>
                            <span className=''>Price: {singleCoffee.price}</span>
                            <div className="card-actions md:justify-end justify-between">

                                <Link to={`/allcoffees/${singleCoffee._id}`} className="btn btn-primary btn-sm text-accent">
                                    <FontAwesomeIcon icon={faEye} /> View
                                </Link>
                                <button onClick={() => { handelCart(singleCoffee._id) }} className="btn btn-primary btn-sm text-accent">
                                    <FontAwesomeIcon icon={faCartShopping} /> Add To Cart
                                </button>

                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default DisplyCoffee;