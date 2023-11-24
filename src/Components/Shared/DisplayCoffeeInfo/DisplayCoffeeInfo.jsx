import { faArrowLeftLong, faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCoffee from '../../../Hooks/useCoffee';
import useCarts from '../../../Hooks/useCarts';
import { AuthContext } from '../../../providers/AuthProvider';
import { useContext } from 'react';
const DisplayCoffeeInfo = () => {
    const [oneCoffee, loading] = useCoffee()
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [, refetch] = useCarts()
    const { user } = useContext(AuthContext);
    const handelCart = (id) => {

        const cartdata = {
            productID: id,
            coffeeName: oneCoffee.coffeeName,
            price: oneCoffee.price,
            taste: oneCoffee.taste,
            photo: oneCoffee.photo,
            quantity: quantity,
            email:user?.email
        };
        if (user) {
            axios.post('http://localhost:5000/carts', cartdata)
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

    // console.log(carts);





    const handleIncress = () => {
        setQuantity(quantity + 1);
    }

    const handleDecress = () => {
        if (quantity === 1) {
            Swal.fire({
                icon: 'error',
                title: 'You have must order minimum 1 coffee',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            setQuantity(quantity - 1);
        }
    }




    return (
        <div>
            {
                loading ? <>
                    <div className="h-screen w-full flex justify-center items-center">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                </> : <div className="container my-10 md:p-0 p-4">
                    <button onClick={() => navigate(-1)} className="btn btn-primary mb-3"> <FontAwesomeIcon icon={faArrowLeftLong} />Back</button>
                    <div className="card lg:card-side probg shadow-xl static">
                        <figure><img src={oneCoffee.photo} alt="Album" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Name: {oneCoffee.coffeeName}</h2>
                            <span className=''>Chef: {oneCoffee.chef}</span>
                            <span className=''>Supplier: {oneCoffee.supplier}</span>
                            <span className=''>Taste: {oneCoffee.taste}</span>
                            <span className=''>Category: {oneCoffee.category}</span>
                            <span className=''>Details: {oneCoffee.details}</span>
                            <span className=''>Price: {oneCoffee.price}</span>
                            <div className="card-actions md:justify-end justify-between">
                                <div className="flex items-center ">
                                    <button onClick={handleIncress} className="btn btn-sm "><FontAwesomeIcon className='text-black' icon={faPlus} />
                                    </button>
                                    <button className="btn btn-sm btn-accent text-white ">{quantity}
                                    </button>
                                    <button onClick={handleDecress} className="btn btn-sm "><FontAwesomeIcon className='text-black' icon={faMinus} />
                                    </button>
                                </div>
                                <button onClick={() => { handelCart(oneCoffee._id) }} className="btn btn-primary btn-sm text-accent">
                                    <FontAwesomeIcon icon={faCartShopping} /> Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default DisplayCoffeeInfo;