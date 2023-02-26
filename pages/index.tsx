import Head from "next/head"
import NoSSR from 'react-no-ssr'
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/layout"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import { DefaultPlayer as Video } from 'react-html5video'


import 'react-html5video/dist/styles.css'

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>heyme</title>
        <meta
          name="description"
          content="This project  allows users to create a video message and schedule it to be
           sent to their future self at a specified date and time."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className=" items-center gap-6 pt-6 pb-2 md:pt-10 justify-center ">
        <div className="flex md:max-w-4xl mx-auto flex-col items-center  text-center gap-2">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mt-20">
            Say hello to <br /> the future you.
          </h1>
          <p className="max-w-2xl text-slate-700 dark:text-slate-400 text-base md:text-xl px-0 text-center">
            <span className="hidden md:inline">Have some goals planned for your future?</span> Send a message to the future, so you watch back and see where you're coming from.
          </p>
        </div>
      </section>

      <section className="items-center gap-6 mt-4 justify-center">
        <div className="flex flex-col sm:flex-row md:flex-row items-center justify-center mx-6 ">
          <Link href={"/recording"} className="w-full sm:max-w-[200px] sm:mr-4">
            <button type="button" className="w-full  items-center justify-center rounded-md text-sm font-medium transition-colors 
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50
             dark:focus:ring-slate-400  dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 bg-slate-900
             text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 h-10 py-2 px-4 mt-5 ">
              Record a message
            </button>
          </Link>

          <Link href={''} className="w-full sm:max-w-[200px] ">
            <button className="w-full mt-5 h-10 py-2 px-4 items-center justify-center rounded-md focus:outline-none
             focus:ring-2 dark:bg-slate-700 dark:hover:bg-slate-800  bg-white hover:bg-slate-200 text-black dark:text-white "
              type="button">
              Learn how it&apos;s built
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center text-center flex-wrap	gap-6 justify-center my-10 md:my-16">
          <NoSSR>
            <Video controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
              <source src="https://res.cloudinary.com/dq5e0bbl8/video/upload/v1677442397/future-me/s3azly4ptqiavdchyfoo.mp4" type="video/mp4" />
            </Video>
          </NoSSR>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center">
        <h4 className="font-bold text-2xl md:text-4xl mb-10 md:mb-16 text-center">Kind words from <br />some awesome people</h4>
        <Testimonials />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </Layout>


  )
}
