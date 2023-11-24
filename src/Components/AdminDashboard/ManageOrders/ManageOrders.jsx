import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useOrders from '../../../Hooks/useOrders';


const ManageOrders = () => {
    const [orders, refetch, loading] = useOrders();

    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        fetch(`https://coffeeshop-server-sandy.vercel.app/orders/all`)
            .then(response => response.json())
            .then(data => {
                setAllOrders(data);
            })
    }, [allOrders])
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
                axios.put(`https://coffeeshop-server-sandy.vercel.app/orders/${id}`, OrderData)
                    .then(() => {
                        refetch()
                        Swal.fire(
                            'Deleted!',
                            'Your cart order has been cancelled.',
                            'success'
                        )
                    })

            }
        })




    };
    const handelDeleteOrder = (id) => {
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
                axios.delete(`https://coffeeshop-server-sandy.vercel.app/orders/${id}`)
                    .then(() => {
                        refetch()
                        Swal.fire(
                            'Deleted!',
                            'Your cart order has been deleted.',
                            'success'
                        )
                    })

            }
        })


    }

    return (
        <div className="">
            <h1 className="text-center text-3xl font-bold mt-3">Manage All Orders</h1>
            <div className="overflow-x-scroll md:w-full w-screen md:px-3">
                <div className='my-5 w-100'>
                    <div >
                        {
                            allOrders.map(order =>
                                <table className="table mt-3">
                                    {/* head */}
                                    <thead className='bg-yellow-400 text-black font-bold'>
                                        <tr>

                                            <th className='text-center'>Product Name, Price</th>
                                            <th className='text-center'>Name</th>
                                            <th className='text-center'>Phone</th>
                                            <th className='text-center'>Order Date/Time</th>
                                            <th className='text-center'>Address</th>


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
                                                            {order.address?.fullName}
                                                        </td>
                                                        <td className='text-center'>
                                                            {order.address?.phone}
                                                        </td>
                                                        <td className='text-center'>
                                                            {order.orderDateTime.orderDate}-
                                                            {order.orderDateTime.orderTime}
                                                        </td>
                                                        <td className='text-center'>
                                                            {order.address?.division}/
                                                            {order.address?.city}/
                                                            {order.address?.postoffice}/
                                                            {order.address?.landmark}/
                                                            {order.address?.area}

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
                                        <th className='text-center'>Delivary Place : {order.paymathod}</th>
                                        <th className='text-center'>Delivary Place : {order.address?.delivaryPlace}</th>
                                        <th className='text-center'>Order Status :
                                            <select onChange={(e) => handelChange(order._id, e.target.value)} name='delivaryPlace' className=" text-black w-20 rounded cursor-pointer ms-2">
                                                <option selected>{order.orderStatus}</option>
                                                <option >Pending</option>
                                                <option >Confirmed</option>
                                                <option >On the way</option>
                                                <option >delivered</option>
                                                <option>Canceled</option>


                                            </select>

                                        </th>
                                        <th className='text-center'><button onClick={() => { handelDeleteOrder(order._id) }} className="btn btn-error btn-xs text-black">
                                            <FontAwesomeIcon icon={faTrash} />Delete
                                        </button>
                                        </th>

                                    </tfoot>

                                </table>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageOrders;