import { Layout } from '@/components/layout'
import React from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { GrFacebookOption } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Success = () => {
    return (
        <>
            <Layout>
                <section className="container justify-center text-center items-center pt-6  md:pb-7  
                max-w-md border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-800 shadow-md my-12 rounded-xl pb-6 ">
                    <div className='text-center flex flex-row justify-center items-center'>
                        <GiCheckMark size={50} />
                    </div>
                    <h1 className='font-bold pt-10 text-lg'>Thank you for recording</h1>
                    <p className="text-sm pt-5">Your message to your future self has been uploaded.
                    </p>
                    <br />
                    <p className="text-sm">In the mean time, share our website to your friends 👇</p>

                    <div className="mt-10 flex justify-center space-x-5 ">
                        <button className="border rounded-full">
                            <GrFacebookOption className='m-3' />
                            <span className='sr-only'>Facebook</span>
                        </button>
                        <button className="border rounded-full">
                            <FaTwitter className='m-3' />
                            <span className='sr-only'>Twitter</span>
                        </button>
                        <button className="border rounded-full">
                            <FaInstagram className='m-3' />
                            <span className='sr-only'>Instagram</span>
                        </button>
                        <button className="border rounded-full">
                            <FaLinkedinIn className='m-3' />
                            <span className='sr-only'>LinkedIn</span>
                        </button>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Success