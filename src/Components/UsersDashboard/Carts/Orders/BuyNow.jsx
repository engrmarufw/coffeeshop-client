import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCarts from '../../../../Hooks/useCarts';
import GetOrderInfo from './GetOrderInfo';

const BuyNow = () => {
    const [carts, loading] = useCarts()

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://coffeeshop-server-sandy.vercel.app/carts/${id}`);
                Swal.fire(
                    'Deleted!',
                    'Your cart item has been deleted.',
                    'success'
                )
            }
        })



    };
    const navigate = useNavigate();
    const handelview = (id) => {

        navigate(`/allcoffees/${id}`)
    }

    let totalPrice = 0;

    for (const cart of carts) {
        totalPrice += parseInt(cart.price);
    }
    return (
        <div>
            {
                loading ? <div className="w-full h-screen flex items-center justify-center p-4"><span className="loading loading-dots loading-lg"></span></div> : <>
                    <div className="container md:flex justify-between md:p-0 p-4">
                        <div className="md:w-3/4 shadow-xl card md:me-4 md:mb-0 mb-4">
                            <GetOrderInfo
                                carts={carts}
                            ></GetOrderInfo>
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>

                                        <th>Name & Price</th>
                                        <th>Taste</th>
                                        <th>Operations</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map(cart => <>

                                        {/* row 1 */}
                                        <tr>

                                            <td className='cursor-pointer' onClick={() => handelview(cart.productID)} >
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={cart.photo} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{cart.coffeeName}</div>
                                                        <div className="text-sm opacity-50">{cart.price}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {cart.taste}

                                            </td>
                                            <td>

                                                <button onClick={() => handleDelete(cart._id)} className="btn btn-error btn-sm md:mx-1 md:my-0 my-1"><FontAwesomeIcon className='text-black' icon={faTrash} /></button>
                                            </td>

                                        </tr>


                                    </>)}
                                </tbody>



                            </table>
                        </div>

                        <div className="ordersummary md:w-1/4">
                            <div className="card  bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title justify-center">Order Summary</h2>
                                    <div className="flex items-center justify-between w-full">
                                        <p>Subtotal (4 items)  </p>
                                        <p className='text-end'>{totalPrice} TK</p>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <p>Shipping Fee </p>
                                        <p className='text-end'>0 TK</p>
                                    </div>
                                    <div className=""> <hr /> </div>
                                    <div className="flex items-center justify-between w-full">
                                        <p>Total</p>
                                        <p className='text-end'>{totalPrice} TK</p>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <Link to='/placeorder' className="btn btn-primary w-full btn-sm">Proceed To Checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default BuyNow;