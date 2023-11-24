import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const InputCoffee = ({ setNewCoffee, newCoffee }) => {
    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const coffeeData = {};

        formData.forEach((value, key) => {
            coffeeData[key] = value;
        });

        // Upload the image to ImgBB
        const image = formData.get('photo');
        formData.append('image', image);
        if (image) {
            axios.post(`https://api.imgbb.com/1/upload?key=2a55d4892836932d2e39cadb5508ce97`, formData)
                .then(response => {
                    coffeeData.photo = response.data.data.url;

                    axios.post('http://localhost:5000/coffees', coffeeData)
                        .then(response => {
                            Swal.fire({
                                icon: 'success',
                                title: 'A Coffee Has Been Added',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong! Problem with your data',
                            })
                        });
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Image format is not supported',
                    })
                });
        }

        setNewCoffee(coffeeData);

    }

    return (
        <form className='w-full' onSubmit={handelSubmit}>
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
                    <input required type="file" name='photo' className="file-input file-input-bordered w-full" />
                </div>

            </div>
            <div className="form-control">

                <input type="submit" className='btn btn-primary mt-5' value="Add Coffee" />
            </div>

        </form>
    );
};

export default InputCoffee;