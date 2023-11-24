import React, { useContext, useState } from 'react';
import useUsers from '../../Hooks/useUsers';
import { AuthContext } from '../../providers/AuthProvider';
import GetOrderInfo from './Carts/Orders/GetOrderInfo';
import useSingleUserbyEmail from '../../Hooks/useSingleUserbyEmail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const ProfileSetting = () => {
    const { user, loading } = useContext(AuthContext);
    const [users, loadings] = useUsers()
   
    // console.log(singleUser);
    const [address, setAddress] = useState([])
    const [updateA, setUpdateA] = useState(false)
    const [singleUser, singleUserloadings] = useSingleUserbyEmail()
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
    const [img, setPhoto] = useState('');
    const [loading2, setLoading2] = useState(false);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setLoading2(true)
            const formData = new FormData();
            formData.append('image', selectedFile);
            try {

                await axios.post('http://localhost:5000/imguploadimgbb', formData)
                    .then((response) => {
                        setPhoto(response.data);
                        axios.put(`http://localhost:5000/users/${singleUser._id}`, { photo: response.data })
                            .then((res) => {
                                setLoading2(false)
                            })
                    })



            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {

        }
    };
    const triggerHiddenInput = () => {
        document.getElementById('fileInput').click();
    };
    const btnName = 'Update Your Address';
    return (
        <div>
            {
                loadings ? <div className="w-full h-screen flex items-center justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div> : <>
                    <div className="container">

                    <div className="card-body my-0 py-0">
                            <div className="">
                                <div className="mask mask-squircle w-24 h-24 relative">
                                    {
                                        img ? <img className='absolute' src={img} alt="Teacher photo" /> : <img className='absolute' src={singleUser?.photo} alt="Teacher photo" />
                                    }
                                    {
                                        loading && <div className="w-full h-screen flex items-center justify-center">
                                        <span className="loading loading-dots loading-lg"></span>
                                    </div>
                                    }
                                    {/* <Image fill={true} src={viewStudent2?.photo} alt="Teacher photo" /> */}
                                    <div onClick={triggerHiddenInput} className="absolute bg-gray-600 opacity-40 w-24 h-24 btn">
                                        <FontAwesomeIcon className='text-2xl absolute bottom-2 right-3 text-white font-bold' icon={faCameraRetro} />
                                        <input
                                            type="file"
                                            id="fileInput"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>



                            </div>
                        </div>
                        <div className="card card-side bg-base-100 shadow-xl">
                            {/* <figure><img src={singleUser?.photo} alt="" /></figure> */}
                            <div className="card-body">
                                <h2 className="card-title"> {singleUser?.displayName}</h2>
                               
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
                                    <button onClick={()=>{setUpdateA(false)}} className="btn btn-primary">Close</button>
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