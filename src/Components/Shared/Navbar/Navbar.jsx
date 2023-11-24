import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCarts from '../../../Hooks/useCarts';
import useOrders from '../../../Hooks/useOrders';
import { AuthContext } from '../../../providers/AuthProvider';
import ActiveLink from '../ActiveLink/ActiveLink';
import useSingleUserbyEmail from '../../../Hooks/useSingleUserbyEmail';

const Navbar = () => {
    const [carts] = useCarts()
    const { logOut, user } = useContext(AuthContext);
    const [singleUser, singleUserloadings] = useSingleUserbyEmail()
    let totalPrice = 0;

    for (let i = 0; i < carts.length; i++) {
        totalPrice += carts[i].price * carts[i].quantity;
    }
    const [orders] = useOrders()

    const handelLogout = () => {
        logOut()
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your have been log out successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    return (
        <>
            <div className="navbar bg-[url('https://i.ibb.co/zHq8z9H/15.jpg')] bg-cover bg-no-repeat bg-center sticky top-0 zindex">

                <div className="container">
                    <div className="flex-1">
                        <Link className='flex items-center' to='/'><div className="img me-1">
                            <img className='w-[3rem]' src="https://i.ibb.co/QHs6Cbc/logo1.png" alt="" />
                        </div>
                            <div className="text-3xl font-bold text-white">
                                <h1>Espresso Emporium</h1>
                            </div></Link>

                    </div>




                    <div className="flex-none md:block hidden">
                        <ActiveLink className='' to='/'><span className='text-white font-bold text-lg hover:text-primary ease-out duration-300'>Home</span></ActiveLink>

                        <ActiveLink className='' to='/allcoffees'><span className="text-white font-bold text-lg hover:text-primary ease-out duration-300 ms-3">All Coffee</span></ActiveLink>



                        {
                            user ? <ActiveLink className='' to='/dashboard/home'><span className=' font-bold text-white ms-3 hover:text-primary ease-out duration-300'>Dashboard</span></ActiveLink> : <>

                            </>
                        }
                        {
                            !user ? <ActiveLink className='' to='/login'><span className=' font-bold text-white ms-3 hover:text-primary ease-out duration-300'>Login</span></ActiveLink> : <>

                            </>
                        }


                    </div>


                    {/* cart  */}

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <FontAwesomeIcon className='text-white text-xl' icon={faCartShopping} />
                                <span className="badge badge-sm indicator-item">{carts.length}</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{carts.length} Items</span>
                                <span className="text-info">Subtotal: {totalPrice} TK</span>
                                <div className="card-actions">
                                    <Link to='/carts' className="btn btn-primary btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    {
                        user && <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {
                                        singleUser?.photo ? <img src={singleUser?.photo} /> : <div className='text-white text-3xl'>
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                    }

                                </div>

                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <p className='text-center text-xl font-bold'>
                                    {user.displayName}
                                </p>
                                <li>
                                    <Link to='/myorders' className="justify-between hover:font-bold ease-out duration-300">
                                        <span className=''>My Orders</span>
                                        <span className="badge">{orders?.length}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/profile-setting' className="hover:font-bold ease-out duration-300">
                                        <span className=''>Setting</span>
                                    </Link>
                                </li>

                                <li className='hover:font-bold ease-out duration-300'> <button className='' onClick={handelLogout}><span >Log Out</span></button></li>
                            </ul>
                        </div>
                    }


                    <div className="flex-none md:hidden">
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button text-white font-bold"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                    {/* Sidebar content here */}
                                    <li> <ActiveLink className='' to='/'><span className=' font-bold hover:text-primary ease-out duration-300'>Home</span></ActiveLink></li>
                                    <li> <ActiveLink className='' to='/allcoffees'><span className=" font-bold hover:text-primary ease-out duration-300 ">All Coffee</span></ActiveLink></li>

                                    <li><ActiveLink className='' to='/login'><span className=' font-bold hover:text-primary ease-out duration-300'>LogIn</span></ActiveLink></li>

                                    <li>  <ActiveLink className='' to='/dashboard/home'><span className=' font-bold  hover:text-primary ease-out duration-300'>Dashboard</span></ActiveLink></li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default Navbar;