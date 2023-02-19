import { Layout } from '@/components/layout'
import React, { useEffect } from 'react'
import { HiCheck } from "react-icons/hi2";
import { GrFacebookOption } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { runFireworks } from '@/lib/utils';
import Image from 'next/image';
import emailGif from '../public/assets/emailGif.gif'
import Link from 'next/link'





const Success = () => {

    useEffect(() => {
        runFireworks()
    }, [])

    return (
        <>
            <Layout>
                <section className="container justify-center text-center items-center pt-6  md:pb-7  
                max-w-md border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-800 shadow-md my-12 rounded-xl pb-6 	">
                    <div>
                        <Image src={emailGif} alt="My GIF" className='rounded-lg' />
                    </div>
                    <h1 className='font-bold pt-10 text-2xl'>Woo-hoo! </h1>
                    <p className='text-sm pt-5'> Your message to your future self is on its way to the future.</p>
                    <p className="text-sm">Share our site with friends and spread the word! 👇
                    </p>

                    <div className="mt-10 flex justify-center space-x-5 ">
                        <Link className=" rounded-full bg-blue-500 " href={''}>
                            <GrFacebookOption className='m-3 text-white' size={20} />
                            <span className='sr-only'>Facebook</span>
                        </Link>
                        <Link className="bg-sky-800 rounded-full" href={''}>
                            <FaLinkedinIn className='m-3 text-white' size={20} />
                            <span className='sr-only'>LinkedIn</span>
                        </Link>
                        <Link className="rounded-full bg-blue-400" href={''}>
                            <FaTwitter className='m-3 text-white' size={20} />
                            <span className='sr-only'>Twitter</span>
                        </Link>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Success