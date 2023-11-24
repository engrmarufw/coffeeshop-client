import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faBell, faChartLine, faPercent, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import useCoffees from '../../../Hooks/useCoffees';

const DashboardHome = () => {
    const [coffee] = useCoffees();
    const [allOrders, setAllOrders] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/orders/all`)
            .then(response => response.json())
            .then(data => {
                setAllOrders(data);
                setLoading(false);
            })
    }, [allOrders])
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Home</a>
                </div>
                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">

                                <FontAwesomeIcon className='text-accent text-xl' icon={faBell} />
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://i.ibb.co/h17GtYn/French-Press-Blend.jpg" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* display */}

            <div className="md:flex m-4">


                <div className="md:w-3/4 md:mb-0 mb-4 md:m-3">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">


                                {/* .card 1 start */}
                                <div className="bg-base-200 shadow-xl md:h-[10rem] rounded-lg flex items-center justify-center ">
                                    <div className="md:py-0 py-4">
                                        <div className="flex items-center justify-center ">
                                            <div className="w-10 h-10 bg-info flex items-center justify-center rounded-full border-4 border-white"> <FontAwesomeIcon className='text-white text-xl' icon={faChartLine} /></div>
                                        </div>
                                        <div className=" text-center">
                                            <h3 className="my-2">Total Sell</h3>
                                            <h1 className="text-xl text-red-600 font-bold">31513$</h1>

                                        </div>
                                    </div>
                                </div>
                                {/* .card 1 end */}
                                {/* .card 2 start */}
                                <div className="bg-base-200 shadow-xl md:h-[10rem] rounded-lg flex items-center justify-center ">
                                    <div className="md:py-0 py-4">
                                        <div className="flex items-center justify-center ">
                                            <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-full border-4 border-white"> <FontAwesomeIcon className='text-white text-xl' icon={faPercent} /></div>
                                        </div>
                                        <div className=" text-center">
                                            <h3 className="my-2">Daily Sell</h3>
                                            <h1 className="text-xl text-red-600 font-bold">11513$</h1>

                                        </div>
                                    </div>
                                </div>
                                {/* .card 2 end */}
                                {/* .card 3 start */}
                                <div className="bg-base-200 shadow-xl md:h-[10rem] rounded-lg flex items-center justify-center ">
                                    <div className="md:py-0 py-4">
                                        <div className="flex items-center justify-center ">
                                            <div className="w-10 h-10 bg-warning flex items-center justify-center rounded-full border-4 border-white"> <FontAwesomeIcon className='text-black text-xl' icon={faUsers} /></div>
                                        </div>
                                        <div className=" text-center">
                                            <h3 className="my-2">Daily Users</h3>
                                            <h1 className="text-xl text-red-600 font-bold">652</h1>

                                        </div>
                                    </div>
                                </div>
                                {/* .card 3 end */}
                                {/* .card 4 start */}
                                <div className="bg-base-200 shadow-xl md:h-[10rem] rounded-lg flex items-center justify-center ">
                                    <div className="md:py-0 py-4">
                                        <div className="flex items-center justify-center ">
                                            <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-full border-4 border-white"> <FontAwesomeIcon className='text-white text-xl' icon={faProductHunt} /></div>
                                        </div>
                                        <div className=" text-center">
                                            <h3 className="my-2">Total Products</h3>
                                            <h1 className="text-xl text-red-600 font-bold">{coffee.length}</h1>

                                        </div>
                                    </div>
                                </div>
                                {/* .card 4 end */}


                            </div>



                        </div>
                    </div>
                </div>


                <div className="md:w-1/4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-center text-xl font-bold">Recent Orders</h2>

                            <p className='border-b-2 border-blue-600'></p>
                            {
                                allOrders.map(order => <>
                                    <div className="border-b-2 border-blue-600">
                                        <p>Email: {order.email}</p>
                                        <small>Item : {order.productinfo?.length}</small>
                                        <small className='ms-2'>Total: {order.totalPrice}</small>
                                        <small className='block font-bold'>Status : {order.orderStatus} <span className='text-red-600'>({order.paymathod})</span></small>
                                        <small className='block'>Date : {order.orderDateTime?.orderDate} / {order.orderDateTime?.orderTime}</small>
                                    </div>
                                </>)
                            }
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default DashboardHome;