import React from 'react'
import Image from 'next/image';
import frantz from '../public/assets/frantz.jpeg'
import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';


interface Testimonial {
    name: string
    profilePicture: string
    link: string
    username: string
    review: string
}

interface TestimonialProps {
    testimonial: Testimonial
}
const Testimonial = ({ testimonial }: TestimonialProps) => {
    return (
        <div className="bg-white p-7 w-96 h-auto rounded-lg dark:bg-slate-800 ">
            <figure className="flex flex-col-reverse">
                <blockquote className="mt-6 space-y-4 leading-7 text-slate-700 dark:text-slate-100">
                    <p>
                        {testimonial.review}
                    </p>
                </blockquote>
                <figcaption className="flex items-center">
                    <Image src={testimonial.profilePicture} alt="profile picture" className=' rounded-full mr-3' width={35} height={35} />
                    <div className="ml-4 dark:text-slate-100">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {testimonial.name}
                        </div>
                        <div className="text-slate-500 ">
                            {testimonial.username}
                        </div>
                    </div>

                    <Link target="_blank" href={testimonial.link} className="ml-auto text-slate-300  ">
                        <span className='sr-only'>Twitter</span>
                        <FaTwitter className='m-3 text-white fill-slate-400' size={20} />
                    </Link>
                </figcaption>
            </figure>
        </div>
    )
}


const Testimonials = () => {
    const testimonials = [{
        name: 'beatnik_ambrosia',
        profilePicture: 'https://pbs.twimg.com/profile_images/1606339361049645063/yfTyH6SV_400x400.jpg',
        username: '@wannyjazzy',
        link: 'https://twitter.com/wannyjazzy/status/1628768118494437377',
        review: 'I’ve had the privilege of trying out @bettyalagwu #HeyMe website. Not only is the website epigrammatic, it is also a timeless video time capsule that could be used as a self motivational and encouragement tool or by a group.'
    }]

    return (
        <div className="w-full flex flex-wrap gap-6 justify-center ">
            {[testimonials.map(testimonial => (
                <Testimonial testimonial={testimonial} key={testimonial.username} />
            ))]}
        </div>
    )

}

export default Testimonials