import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const { signIn, googleLogin, logOut, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || "/";
    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = e.target;
        const email = formData.email.value
        const password = formData.password.value
        signIn(email, password)
            .then(result => {
                const user = result.user;

                Swal.fire({
                    icon: 'success',
                    title: 'Your have been logIn successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                if (errorCode === "auth/invalid-login-credentials") {
                    setError('Invalid email or password')
                }
            })
    }
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
                            <form onSubmit={handelSubmit}>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" name='email' placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <Link to="/reset-pw" className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                    <label className="label text-red-600">
                                        <p>{error}</p>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input type='submit' className="btn btn-sm btn-primary" value='Login' />
                                </div>
                            </form>
                            <div className="divider">OR</div>
                            <button onClick={handelGloin} className="btn btn-warning btn-sm">Login With Google</button>
                            <p className="text-center">Don't have any account <b><Link to='/register' className=""> Register</Link></b></p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;