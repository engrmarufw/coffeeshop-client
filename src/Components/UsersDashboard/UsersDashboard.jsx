import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ActiveLink from '../Shared/ActiveLink/ActiveLink';
const UsersDashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <div className="flex justify-between bg-accent items-center lg:hidden">

                        <div className="ms-3">
                            <Link className='flex items-center' to='/userdashboard/home'><div className="img me-1">
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
                            <Link className='flex items-center justify-center' to='/userdashboard/home'><div className="img me-1">
                                <img className='w-[2rem]' src="https://i.ibb.co/QHs6Cbc/logo1.png" alt="" />
                            </div>
                                <div className="text-xl font-bold text-accent">
                                    <h1>Espresso Emporium</h1>
                                </div></Link>

                        </div>
                        {/* Sidebar content here */}
                        <li> <ActiveLink className='active' to='/userdashboard/home'><span className=' font-bold hover:text-primary ease-out duration-300'>Dashboard</span></ActiveLink></li>
                        <li> <ActiveLink className='' to='/userdashboard/carts'><span className=' font-bold hover:text-primary ease-out duration-300'>Carts</span></ActiveLink></li>
                        <li> <ActiveLink className='' to='/'><span className=' font-bold hover:text-primary ease-out duration-300'>Home</span></ActiveLink></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default UsersDashboard;