import { faTrash, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import useUsers from '../../../Hooks/useUsers';
import { AuthContext } from '../../../providers/AuthProvider';
const ManageUsers = () => {
    const [users] = useUsers();
    const { user } = useContext(AuthContext);
    const handelChange = (id, value) => {
        const userrole = {
            role: value
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
                axios.put(`https://coffeeshop-server-sandy.vercel.app/users/${id}`, userrole);
                Swal.fire(
                    'Yes!',
                    `User set to ${value}`,
                    'success'
                )
            }
        })

    }

    const handelDeleteUser = (id) => {
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
                axios.delete(`https://coffeeshop-server-sandy.vercel.app/users/${id}`);
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                )
            }
        })


    }

    return (
        <div className='w-100'>
            <div className="overflow-x-scroll md:w-full w-screen md:px-3">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <>
                                <tr>

                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    {

                                                        user.photo ? <>
                                                            <img src={user.photo} />
                                                        </> : <>
                                                            <FontAwesomeIcon className='w-full  text-5xl' icon={faUserTie} />
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>Dhaka/Dhaka/EPZ/NRN/Ashulia, Savar, Dhaka</p>
                                    </td>
                                    <td>01315560101</td>
                                    <td>
                                        <select onChange={(e) => handelChange(user._id, e.target.value)} name='delivaryPlace' className=" text-black w-20 rounded cursor-pointer ms-2">
                                            <option selected>{user.role}</option>
                                            <option >Admin</option>
                                            <option >Customar</option>
                                            <option >Workers</option>
                                            <option >Delivery Man</option>

                                        </select>
                                    </td>
                                    <th>
                                        <button onClick={handelDeleteUser} className="btn btn-ghost btn-xs"><FontAwesomeIcon icon={faTrash} /></button>

                                    </th>
                                </tr>
                            </>)
                        }
                        {/* row 1 */}


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageUsers;