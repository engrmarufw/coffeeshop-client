import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useOrders from '../../../../../Hooks/useOrders';
const DisplayOrders = () => {
    const [orders] = useOrders();
    const handelChange = (id, selectedvalue) => {

        const OrderData = {
            orderStatus: selectedvalue
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/orders/${id}`, OrderData);
                Swal.fire(
                    'Canceled',
                    'Your cart order has been cancelled.',
                    'success'
                )
            }
        })




    };


    return (
        <>
            {
                orders.length === 0 ? <>
                    <div className=" w-full h-screen flex items-center justify-center my-4 bg-base-100 shadow-xl container opacity-30">
                        <h1 className='text-5xl font-bold'> Your Order List Is Empty!</h1>
                    </div>
                </> :
                    <div className='container my-5'>
                        <div className="overflow-x-auto">
                            <h1 className="text-center text-3xl font-bold">My Orders</h1>
                            {
                                orders.map(order =>
                                    <table className="table mt-3">
                                        {/* head */}
                                        <thead className='bg-yellow-400 text-black font-bold'>
                                            <tr>

                                                <th className='text-center'>Product Name, Price</th>
                                                <th className='text-center'>Address</th>
                                                <th className='text-center'>Phone</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                order.productinfo.map(product =>

                                                    <>
                                                        <tr>

                                                            <td>
                                                                <Link to={`/allcoffees/${product?.productID}`} className="flex items-center space-x-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                            <img src={product?.photo} alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold">{product?.coffeeName}</div>
                                                                        <div className="text-sm opacity-50">{product?.price} x <b>{product?.quantity}</b></div>
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                            <td className='text-center'>
                                                                {order.address?.area}

                                                            </td>
                                                            <td className='text-center'>
                                                                {order.address?.phone}

                                                            </td>

                                                        </tr>

                                                    </>
                                                )
                                            }


                                            {/* row 1 */}

                                        </tbody>
                                        <tfoot className='bg-accent text-white w-full'>
                                            <th>Total ({order.productinfo.length} items) =

                                                {order.totalPrice} TK
                                            </th>
                                            <th className='text-center'>Delivary Place : {order.address?.delivaryPlace}</th>
                                            <th className='text-center'>Order Status :
                                                <select onChange={(e) => handelChange(order._id, e.target.value)} name='delivaryPlace' className=" text-black w-20 rounded cursor-pointer ms-2">
                                                    <option selected>{order.orderStatus}</option>
                                                    {
                                                        order.orderStatus != 'Pending' ? <>
                                                        </> : <>
                                                            <option >Pending</option>
                                                            <option>Canceled</option>
                                                        </>
                                                    }


                                                </select>

                                            </th>

                                        </tfoot>

                                    </table>
                                )
                            }

                        </div>
                    </div>
            }
        </>
    );
};

export default DisplayOrders;