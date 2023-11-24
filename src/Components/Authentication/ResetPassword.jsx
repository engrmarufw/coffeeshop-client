import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const ResetPassword = () => {
    const { createuser, resetPassowrd, logOut } = useContext(AuthContext);
    const [errorMSG, setErrorMSG] = useState();
    const navigate = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = e.target;
        const email = formData.email.value;
        resetPassowrd(email)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Please Check You Email For Reset Link',
                    confirmButtonText: 'Okay',

                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                // ..
            });



    }

    return (
        <div>
            <div className="flex items-center justify-center h-96">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Forgot Password?</h2>
                        <form onSubmit={handelSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="Enter your email" className="input input-bordered" />
                            </div>
                            <p>{errorMSG}</p>
                            <div className="card-actions justify-end mt-2">
                                <input type='submit' value="submit" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;