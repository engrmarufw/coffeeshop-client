import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const UpdateCoffeeModal = ({ id }) => {
    const [newCoffee, setNewCoffee] = useState([])
    const [loading, setLoading] = useState(true)
    const handelEdit = (cid) => {
        document.getElementById('my_modal_4').showModal()

        fetch(`http://localhost:5000/coffees/${cid}`)
            .then(response => response.json())
            .then(data => {
                setNewCoffee(data);
                setLoading(false);
            })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button onClick={() => handelEdit(id)} className="btn btn-accent btn-sm md:mx-1 md:my-0 my-1"><FontAwesomeIcon className='text-white' icon={faPen} /></button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">


                    {/* start  */}
                    <div className="card w-100 bg-secondary shadow-xl mb-10">
                        <div className="card-body">


                            <div className="relative flex justify-center">
                                <h1 className="text-2xl font-bold text-acent drop-shadow-sm">Update Existing Coffee Details</h1>
                                <div className="absolute top-0 ">
                                    <h1 className="text-2xl font-bold text-acent blur-[0.09rem] ">Update Existing Coffee Details</h1>
                                </div>
                            </div>
                            <p className='md:px-[15rem] text-center'>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                            <div className="card-actions w-100">

                                {
                                    loading ? <> loading.....</> : <form className='w-full' onSubmit={handelSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Name</span>
                                                </label>
                                                <input required type="text" name='name' defaultValue={newCoffee?.coffeeName} placeholder="Name" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Chef</span>
                                                </label>
                                                <input required type="text" name='chef' defaultValue={newCoffee?.chef} placeholder="Chef" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Suplier</span>
                                                </label>
                                                <input required type="text" name='supplier' defaultValue={newCoffee?.supplier} placeholder="Suplier" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Taste</span>
                                                </label>
                                                <input required type="text" name='taste' defaultValue={newCoffee?.taste} placeholder="Taste" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Category</span>
                                                </label>
                                                <input required type="text" name='category' defaultValue={newCoffee?.category} placeholder="Category" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Details</span>
                                                </label>
                                                <input required type="text" name='details' defaultValue={newCoffee?.details} placeholder="Details" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Price</span>
                                                </label>
                                                <input required type="text" name='price' defaultValue={newCoffee?.price} placeholder="Price" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Photo</span>
                                                </label>
                                                {/* <input type="text" name='photo' placeholder="Photo" className="input input-bordered" /> */}
                                                <input required type="file" name='photo' className="file-input file-input-bordered w-full" />
                                            </div>

                                        </div>
                                        <div className="form-control">

                                            <input type="submit" className='btn btn-primary mt-5' value="Add Coffee" />
                                        </div>

                                    </form>
                                }





                            </div>
                        </div>
                    </div>

                    {/* end  */}


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>



        </div>
    );
};

export default UpdateCoffeeModal;