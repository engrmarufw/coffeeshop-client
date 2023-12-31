import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ActiveLink from '../../Shared/ActiveLink/ActiveLink';
import { AuthContext } from '../../../providers/AuthProvider';

const Dashboard = () => {
    const { logOut, user } = useContext(AuthContext);
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
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <div className="flex justify-between bg-accent items-center lg:hidden">

                        <div className="ms-3">
                            <Link className='flex items-center' to='/dashboard/home'><div className="img me-1">
                                <img className='w-[3rem]' src="https://i.ibb.co/QHs6Cbc/logo1.png" alt="" />
                            </div>
                                <div className="text-2xl font-bold text-white">
                                    <h1>Espresso Emporium</h1>
                                </div></Link>

                        </div>
                        <label htmlFor="my-drawer-2" className="btn bg-transparent text-white	 border-0 drawer-button lg:hidden"> <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg></label>

                    </div>
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <div className="mb-3">
                            <Link className='flex items-center justify-center' to='/dashboard/home'><div className="img me-1">
                                <img className='w-[2rem]' src="https://i.ibb.co/QHs6Cbc/logo1.png" alt="" />
                            </div>
                                <div className="text-xl font-bold text-accent">
                                    <h1>Espresso Emporium</h1>
                                </div></Link>

                        </div>
                        {/* Sidebar content here */}
                        <li> <ActiveLink className='active' to='/dashboard/home'><span className=' font-bold hover:text-primary ease-out duration-300'>Dashboard</span></ActiveLink></li>
                        <li> <ActiveLink className='' to='/dashboard/managecoffees'><span className=' font-bold hover:text-primary ease-out duration-300'>Manage Coffees</span></ActiveLink></li>
                        <li> <ActiveLink className='' to='/dashboard/addcoffee'><span className=' font-bold hover:text-primary ease-out duration-300'>Add New Coffee</span></ActiveLink></li>
                        <li> <ActiveLink className='' to='/dashboard/manageorders'><span className=' font-bold hover:text-primary ease-out duration-300'>Manage Oeders</span></ActiveLink></li>
                        <li> <ActiveLink className='' to='/dashboard/manageusers'><span className=' font-bold hover:text-primary ease-out duration-300'>Manage Users</span></ActiveLink></li>
                        <li> <ActiveLink className='' to='/'><span className=' font-bold hover:text-primary ease-out duration-300'>Home</span></ActiveLink></li>

                        <li className='hover:font-bold ease-out duration-300'> <button className=' font-bold hover:text-primary ease-out duration-300' onClick={handelLogout}><span >Log Out</span></button></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;