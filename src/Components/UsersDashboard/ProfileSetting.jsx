import React, { useContext, useState } from 'react';
import useUsers from '../../Hooks/useUsers';
import { AuthContext } from '../../providers/AuthProvider';
import GetOrderInfo from './Carts/Orders/GetOrderInfo';
const ProfileSetting = () => {
    const { user, loading } = useContext(AuthContext);
    const [users, loadings] = useUsers()
    let filteredArray = users.filter(obj => obj.role === "Admin" && obj.email === user?.email);
    console.log(filteredArray[0]);
    const [address, setAddress] = useState([])
    const [updateA, setUpdateA] = useState(false)
    const updateUser = {
        address
    }
    const handelUpdate = () => {
        setUpdateA(true)


        // axios.put(`http://localhost:5000/users/email/${user.email}`, updateUser)
        // Swal.fire({
        //     title: 'Thank you. Your order has been placed',
        //     confirmButtonText: 'OK',
        // })
    }
    const handelSave = () => {
        setUpdateA(false)


        // axios.put(`http://localhost:5000/users/email/${user.email}`, updateUser)
        // Swal.fire({
        //     title: 'Thank you. Your order has been placed',
        //     confirmButtonText: 'OK',
        // })
    }

    const btnName = 'Update Your Address';
    return (
        <div>
            {
                loadings ? <div className="w-full h-screen flex items-center justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div> : <>
                    <div className="container">


                        <div className="card card-side bg-base-100 shadow-xl">
                            <figure><img src={filteredArray[0]?.photo} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title"> {filteredArray[0]?.displayName}</h2>
                                <p>Click the button to watch on Jetflix app.</p>
                                <div>
                                    <button onClick={handelUpdate} className="cursor-pointer	font-bold btn">Update Address</button>
                                </div>
                                {
                                    updateA && <>
                                        <GetOrderInfo
                                            setAddress={setAddress}
                                            btnName={btnName}
                                        ></GetOrderInfo>
                                        <button onClick={handelSave} className="btn">Save</button>
                                    </>
                                }

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Watch</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ProfileSetting;