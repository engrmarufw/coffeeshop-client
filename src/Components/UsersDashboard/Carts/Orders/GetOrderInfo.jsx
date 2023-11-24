import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import useSingleUserbyEmail from '../../../../Hooks/useSingleUserbyEmail';
import { AuthContext } from '../../../../providers/AuthProvider';

const GetOrderInfo = ({ carts, setAddress, btnName }) => {

    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext)
    const [singeUser, refatch, loading] = useSingleUserbyEmail()


    const theAddress = singeUser[0]?.address


    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const address = {};

        formData.forEach((value, key) => {
            address[key] = value;
            setShowModal(false)
        });
        setAddress(address)


    }

    return (
        <>
            <button onClick={() => setShowModal(true)} className="btn btn-accent text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 my-2">
                <FontAwesomeIcon className='me-1' icon={faPlus} /> <p>{btnName}</p>
            </button>
            {showModal ? (
                <>
                    {
                        loading ? <>
                            <div className="w-full h-screen flex items-center justify-center">
                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        </> : <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-scroll md:fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto md:w-3/4">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Add New Delivery Address
                                            </h3>
                                            <button
                                                className="p-1 text-accent"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span className="text-3xl font-bold">
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto ">

                                            <form onSubmit={handelSubmit} >

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Full Name</span>
                                                        </label>
                                                        <input required type="text" defaultValue={singeUser[0].displayName} name='fullName' placeholder="Name" className="input input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Mobile Number</span>
                                                        </label>
                                                        <input required type="text" defaultValue={theAddress?.phone} name='phone' placeholder="Mobile Number" className="input input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Division</span>
                                                        </label>
                                                        <input required type="text" name='division' placeholder="Division" defaultValue={theAddress?.division} className="input input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">City</span>
                                                        </label>
                                                        <input required type="text" name='city' placeholder="City" defaultValue={theAddress?.city} className="input input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Post Office</span>
                                                        </label>
                                                        <input required type="text" name='postoffice' placeholder="Post Office" defaultValue={theAddress?.postoffice} className="input input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Address</span>
                                                        </label>
                                                        <input required type="text" name='area' defaultValue={theAddress?.area} placeholder="House no. / building / street / area" className="input input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Landmark (Optional)</span>
                                                        </label>
                                                        <input type="text" defaultValue={theAddress?.landmark} name='landmark' placeholder="Landmark" className="input input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Select a label for effective delivery:</span>
                                                        </label>
                                                        <select name='delivaryPlace' className="select select-bordered w-full" defaultValue={theAddress?.delivaryPlace}>
                                                            <option selected>Home</option>
                                                            <option>Office</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-control my-3">
                                                    <input type="submit" defaultValue='Submit' className="btn btn-primary w-100" />
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default GetOrderInfo;