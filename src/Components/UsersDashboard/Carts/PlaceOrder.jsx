import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCarts from '../../../Hooks/useCarts';
import { AuthContext } from '../../../providers/AuthProvider';
import GetOrderInfo from './Orders/GetOrderInfo';
import useSingleUserbyEmail from '../../../Hooks/useSingleUserbyEmail';

const PlaceOrder = () => {
    const [carts, refatch, loading] = useCarts()
    const [address, setAddress] = useState([])
    const { user } = useContext(AuthContext);
    let totalPrice = 0;
    for (let i = 0; i < carts.length; i++) {
        totalPrice += carts[i].price * carts[i].quantity;
    }
    const productinfo = carts.map(product => ({
        productID: product.productID,
        coffeeName: product.coffeeName,
        price: product.price,
        taste: product.taste,
        photo: product.photo,
        quantity: product.quantity


    }));
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are 0-based, so add 1
    const day = now.getDate();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const currentDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;

    const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    const orderDateTime = {
        orderDate: currentDate,
        orderTime: currentTime
    }

    const OrderData = {
        address,
        productinfo,
        orderStatus: 'Pending',
        totalPrice: totalPrice,
        paymathod: 'Cash on delivery',
        orderDateTime: orderDateTime,
        email: user?.email

    }

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
                axios.delete(`https://coffeeshop-server-sandy.vercel.app/carts/${id}`)
                    .then(() => {
                        refatch()
                        Swal.fire(
                            'Deleted!',
                            'Your cart item has been deleted.',
                            'success'
                        )
                    })

            }
        })



    };
    const navigate = useNavigate();
    const handelview = (id) => {

        navigate(`/allcoffees/${id}`)
    }

    const [selectedCheckbox, setSelectedCheckbox] = useState(1);
    const [cashoronline, setCashorOnline] = useState(true)
    const handleCheckboxChange = (index) => {
        setSelectedCheckbox(index);
    };
    const updateUser = {
        address
    }
    const [singeUser, singleUserloadings] = useSingleUserbyEmail()
    // console.log(singeUser?.address.phone.length);
    const handelOrder = () => {
        if (OrderData.address.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Please check the address',
                confirmButtonText: 'OK',
            })
        }
        else {
            axios.post('https://coffeeshop-server-sandy.vercel.app/orders', OrderData)
                .then(response => {
                    axios.put(`https://coffeeshop-server-sandy.vercel.app/users/email/${user.email}`, updateUser)
                    Swal.fire({
                        title: 'Thank you. Your order has been placed',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            for (const cart of carts) {
                                axios.delete(`https://coffeeshop-server-sandy.vercel.app/carts/${cart._id}`)
                            }
                            navigate(`/allcoffees`)
                        }
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }


    const btnName = 'Add New Delivery Address';


    return (
        <div>
            {
                loading ? <div className="w-full h-screen flex items-center justify-center p-4"><span className="loading loading-dots loading-lg"></span></div> : <>
                    <div className="container md:flex justify-between md:p-0 p-4">
                        <div className="md:w-3/4 shadow-xl card md:me-4 md:mb-0 mb-4">
                            <GetOrderInfo
                                carts={carts}
                                setAddress={setAddress}

                                btnName={btnName}
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
                                                        <div className="text-sm opacity-50">{cart.price} x {cart.quantity}</div>
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
                                    <hr />
                                    <div className="flex items-center justify-between w-full">
                                        <p>Cash On delivary </p>
                                        <input type="checkbox"
                                            checked={selectedCheckbox === 1}
                                            onChange={() => handleCheckboxChange(1)}
                                            className="checkbox" />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <p>Payment Online</p>
                                        <input type="checkbox"
                                            checked={selectedCheckbox === 2}
                                            onChange={() => handleCheckboxChange(2)}
                                            className="checkbox" />
                                    </div>
                                    <div className="card-actions justify-end">
                                        {
                                            selectedCheckbox === 1 ? <>
                                                <button onClick={handelOrder} className="btn btn-primary w-full btn-sm">Proceed To Checkout</button>

                                            </> : <>
                                                <Link to='/payment' className="btn btn-primary w-full btn-sm">Proceed To Checkout</Link>

                                            </>
                                        }
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

export default PlaceOrder;