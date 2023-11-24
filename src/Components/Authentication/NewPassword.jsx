import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const NewPassword = () => {
    const { setNewpassword } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const oobCode = queryParams.get("oobCode")
    const navigate = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = e.target;
        const password = formData.password.value;

        setNewpassword(oobCode, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your password have been reset successfully',
                    confirmButtonText: 'Okay',

                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                })
            })


    }
    return (
        <div>
            <div className="flex items-center justify-center h-96">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Reset Password</h2>
                        <form onSubmit={handelSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">New Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Enter your new password" className="input input-bordered" />
                            </div>
                            <div className="card-actions justify-end mt-2">
                                <input type='submit' value="Reset" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;