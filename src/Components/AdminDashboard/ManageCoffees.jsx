import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCoffees from '../../Hooks/useCoffees';
const ManageCoffees = () => {



    const [coffee, loading] = useCoffees();

    const handleDelete = (id) => {

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
                axios.delete(`http://localhost:5000/coffees/${id}`);
                Swal.fire(
                    'Deleted!',
                    'Your coffee has been deleted.',
                    'success'
                )
            }
        })



    };
    const navigate = useNavigate();
    const handelview = (id) => {

        navigate(`/allcoffees/${id}`)
    }



    // update
    const [newCoffee, setNewCoffee] = useState([])
    const [openModl, setOpenModal] = useState(true)
    const handelEdit = (cid) => {

        fetch(`http://localhost:5000/coffees/${cid}`)
            .then(response => response.json())
            .then(data => {
                setNewCoffee(data);
                document.getElementById('my_modal_4').showModal()
            })


    }
    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const coffeeData = {};

        formData.forEach((value, key) => {
            coffeeData[key] = value;
        });

        // Upload the image to ImgBB
        let image = formData.get('photo');
        formData.append('image', image);

        if (image.size != 0) {
            axios.post(`https://api.imgbb.com/1/upload?key=2a55d4892836932d2e39cadb5508ce97`, formData)
                .then(response => {
                    coffeeData.photo = response.data.data.url;
                    axios.put(`http://localhost:5000/coffees/${newCoffee._id}`, coffeeData)
                        .then(response => {

                            setOpenModal(false)
                            // Add any further handling or feedback here
                            e.target.reset()
                            Swal.fire({
                                icon: 'success',
                                title: 'Your coffee has been updated',
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result) {
                                    setOpenModal(true)
                                }
                            })

                        })
                        .catch(error => {
                            console.error(error);
                            // Add error handling or feedback here
                        });
                })

        }

        else {

            coffeeData.photo = newCoffee.photo;


            axios.put(`http://localhost:5000/coffees/${newCoffee._id}`, coffeeData)
                .then(response => {
                    setOpenModal(false)
                    // Add any further handling or feedback here
                    Swal.fire({
                        icon: 'success',
                        title: 'Your coffee has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            setOpenModal(true)
                        }
                    })
                })
                .catch(error => {
                    console.error(error);
                    // Add error handling or feedback here
                });
        }

    }
    return (
        <div>
            {
                loading ? <>
                    <div className="h-screen w-100 flex items-center justify-center ">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                </> : <div className="flex justify-center">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-center'>
                                <th>Coffee Name & Price</th>
                                <th>Chef</th>
                                <th>Operations</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody  >
                            {
                                coffee.map(coffees => (
                                    <tr className='hover' key={coffees._id}>

                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={coffees.photo} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{coffees.coffeeName}</div>
                                                    <div className="text-sm opacity-50">{coffees.price}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center'>
                                            {coffees.chef}
                                        </td>
                                        <td className=' md:flex justify-center'>

                                            <button onClick={() => handelview(coffees._id)} className="btn btn-primary btn-sm md:mx-1 md:my-0 my-1"><FontAwesomeIcon className='text-black' icon={faEye} /></button>
                                            <button onClick={() => handelEdit(coffees._id)} className="btn btn-accent btn-sm md:mx-1 md:my-0 my-1"><FontAwesomeIcon className='text-white' icon={faPen} /></button>
                                            <button onClick={() => handleDelete(coffees._id)} className="btn btn-error btn-sm md:mx-1 md:my-0 my-1"><FontAwesomeIcon className='text-black' icon={faTrash} /></button>
                                            {
                                                openModl ? <>

                                                    <dialog id="my_modal_4" className="modal ">
                                                        <div className="modal-box w-11/12 max-w-5xl bg-secondary">

                                                            {/* start  */}
                                                            <div className="card w-100">
                                                                <div className="card-body relative">


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
                                                                                        <input required type="text" name='coffeeName' defaultValue={newCoffee?.coffeeName} placeholder="Name" className="input input-bordered" />
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
                                                                                        <input type="file" name='photo' className="file-input file-input-bordered w-full" />
                                                                                    </div>

                                                                                </div>
                                                                                <div className="form-control">

                                                                                    <input type="submit" className='btn btn-primary mt-5' value="Submit" />
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
                                                                    <button className="btn btn-primary">Close</button>
                                                                </form>
                                                            </div>

                                                        </div>
                                                    </dialog>

                                                </> : ''
                                            }
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            }
        </div>
    );
};

export default ManageCoffees;