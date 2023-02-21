import { Layout } from '@/components/layout'
import React, { useState, useEffect } from 'react'
import { HiCheck } from "react-icons/hi2";
import { GrFacebookOption } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { runFireworks } from '@/lib/utils';
import Image from 'next/image';
import emailGif from '../public/assets/emailGif.gif'
import Link from 'next/link'





const Success = () => {
    const [isShareSupported, setIsShareSupported] = useState(false);

    useEffect(() => {
        runFireworks()
    }, [])


    // check if Web Share API is supported by the browser
    useEffect(() => {
        if (navigator.share) {
            setIsShareSupported(true);
        }
    }, [])

    const handleShareClick = async () => {
        try {
            await navigator.share({
                title: 'Check out this awesome site!',
                text: 'I just sent a message to my future self using this cool website!',
                url: window.location.href,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

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
                        <Link className=" rounded-full bg-blue-500 " href={'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2F'} target="_blank" onClick={handleShareClick}>
                            <GrFacebookOption className='m-3 text-white' size={20} />
                            <span className='sr-only'>Facebook</span>
                        </Link>
                        <Link className="bg-sky-800 rounded-full" href={'https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fexample.com%2F&title=Check%20out%20this%20awesome%20site!&summary=I%20just%20sent%20a%20message%20to%20my%20future%20self%20using%20this%20cool%20website!'} target="_blank" onClick={handleShareClick}>
                            <FaLinkedinIn className='m-3 text-white' size={20} />
                            <span className='sr-only'>LinkedIn</span>
                        </Link>
                        <Link className="rounded-full bg-blue-400" href={'https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com%2F&text=Check%20out%20this%20awesome%20site!%20I%20just%20sent%20a%20message%20to%20my%20future%20self%20using%20this%20cool%20website!'} target="_blank" onClick={handleShareClick}>
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