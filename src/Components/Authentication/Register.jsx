import axios from 'axios';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
const Register = () => {

    const { createuser, updateuserProfile, logOut, googleLogin } = useContext(AuthContext);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const onSubmit = (data) => {
        createuser(data.email, data.password)
            .then(result => {
                const user = result.user;
                const usersinfo = {
                    displayName: data.fullName,
                    email: data.email
                }
                updateuserProfile(data.fullName)
                    .then(() => {
                        axios.post('http://localhost:5000/users', usersinfo)
                            .then(response => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'User Created Successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                logOut()
                                    .then(() => {
                                        navigate('/login')
                                    })
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });


                    })

            })
    };
    const handelGloin = () => {

        googleLogin()
            .then(result => {
                const user = result.user;
                const usersinfo = {
                    displayName: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }
                axios.post('http://localhost:5000/users', usersinfo)
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'loged in Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });


            })
    }
    return (
        <div>
            <div>
                <div className="hero  py-10 bg-base-200">
                    <div className="hero-content md:flex-row flex-col">
                        <div className="text-center lg:text-left">
                            <div className="relative flex md:justify-start justify-center">
                                <h1 className="text-5xl font-bold text-acent drop-shadow-sm">Login now!</h1>
                                <div className="absolute top-0 ">
                                    <h1 className="text-5xl font-bold text-acent blur-[0.09rem] ">Login now!</h1>
                                </div>
                            </div>

                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <Controller
                                            name="fullName"
                                            control={control}
                                            rules={{
                                                required: "Full Name is required",
                                            }}
                                            render={({ field }) => (
                                                <input type="text" {...field} placeholder="Full Name" className="input input-bordered" />
                                            )}
                                        />
                                        {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
                                    </div>
                                    <div className="form-control">

                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            }}
                                            render={({ field }) => (
                                                <input type="email" {...field} placeholder="email" className="input input-bordered" />
                                            )}
                                        />
                                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters long"
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                    message: "1. Password must contain at least one uppercase letter. 2. one lowercase letter. 3. one number. 4.one special character."
                                                }
                                            }}
                                            render={({ field }) => (
                                                <input type="password" {...field} placeholder="password" className="input input-bordered" />
                                            )}
                                        />
                                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                                    </div>
                                    <div className="form-control mt-6">
                                        <input type='submit' className="btn btn-sm btn-primary" value='Register' />
                                    </div>
                                </form>
                                <div className="divider">OR</div>
                                <button onClick={handelGloin} className="btn btn-warning btn-sm">Login With Google</button>
                                <p className="text-center">Already have an account <b><Link to='/login' className=""> Login</Link></b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;