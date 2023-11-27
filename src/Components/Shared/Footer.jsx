import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");
        const mail = {
            name,
            email,
            message
        }
        axios.post('https://coffeeshop-server-sandy.vercel.app/sendemail', mail)
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "Your message has been send",
                    showConfirmButton: false,
                    timer: 1500
                  })
                e.target.reset();
            })
    }
    return (
        <div>
            <div className="bg-[url('https://i.ibb.co/fSpphww/13.jpg')] bg-cover bg-no-repeat bg-center pb-3">


                <div className="container p-4 ">
                    <div className=" w-100 grid grid-cols-1 md:grid-cols-2 gap-4 ">

                        <div className=" mt-10 ">
                            <img className='w-[3rem]' src="https://i.ibb.co/QHs6Cbc/logo1.png" alt="" />

                            <div className="relative z-0">
                                <h1 className="text-3xl font-bold text-acent drop-shadow-sm">Espresso Emporium</h1>
                                <div className="absolute top-0 ">
                                    <h1 className="text-3xl font-bold text-acent blur-[0.14rem] ">Espresso Emporium</h1>
                                </div>
                            </div>

                            <p className='text-neutral font-bold drop-shadow-sm mt-2'>
                                Always ready to be your friend. Come & Contact with us to share your memorable moments, to share with your best companion.
                            </p>

                            <div className="flex items-center">
                                <a className='text-[2rem] me-3 my-3' href="#" target='_blank'> <FontAwesomeIcon className='text-accent' icon={faFacebook} /></a>
                                <a className='text-[2rem] me-3 my-3' href="#" target='_blank'><FontAwesomeIcon className='text-accent' icon={faTwitter} /></a>
                                <a className='text-[2rem] me-3 my-3' href="#" target='_blank'><FontAwesomeIcon className='text-accent' icon={faInstagram} /></a>
                                <a className='text-[2rem] me-3 my-3' href="#" target='_blank'><FontAwesomeIcon className='text-accent' icon={faLinkedin} /></a>
                            </div>



                            <div className="relative z-0">
                                <h1 className="text-3xl font-bold text-acent drop-shadow-sm">Get in Touch</h1>
                                <div className="absolute top-0 ">
                                    <h1 className="text-3xl font-bold text-acent blur-[0.14rem] ">Get in Touch</h1>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center mb-3">
                                    <FontAwesomeIcon className='me-2 text-xlg accent' icon={faPhone} />
                                    <p className='text-neutral'>+8801315560101</p>
                                </div>
                                <div className="flex items-center mb-3">
                                    <FontAwesomeIcon className='me-2 text-xlg accent' icon={faEnvelope} />
                                    <p className='text-neutral'>engrmarufw@gmail.com</p>
                                </div>
                                <div className="flex items-center mb-3">
                                    <FontAwesomeIcon className='me-2 text-xlg accent' icon={faLocationDot} />
                                    <p className='text-neutral'>Ashulia, Savar, Dhaka</p>
                                </div>
                            </div>



                        </div>




                        <div className=" mt-10 ">

                            <div className="relative z-0">
                                <h1 className="text-3xl font-bold text-acent drop-shadow-sm">Connect with Us</h1>
                                <div className="absolute top-0 ">
                                    <h1 className="text-3xl font-bold text-acent blur-[0.14rem] ">Connect with Us</h1>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <input name='name' type="text" placeholder="Name" className="input input-bordered w-full  hover:border-primary hover:drop-shadow-xl mb-3" />
                                <input name='email' type="email" placeholder="Email" className="input input-bordered w-full hover:border-primary hover:drop-shadow-xl mb-3" />
                                <textarea name='message' className="textarea textarea-bordered textarea-lg w-full  hover:border-primary hover:drop-shadow-xl mb-3" placeholder="Message"></textarea>
                                <div className="">
                                    <button className="btn btn-primary" type='submit'>Send Message</button>
                                </div>


                            </form>



                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-[url('https://i.ibb.co/hCKM1D2/24.jpg')] h-10 bg-cover bg-no-repeat bg-center flex items-center justify-center">
                <p className="text-white">Copyright Espresso Emporium ! All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;