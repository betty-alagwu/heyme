import Head from "next/head"
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {


  return (
    <Layout>
      <Head>
        <title>Future Me</title>
        <meta
          name="description"
          content="This project that allows users to create a video message and schedule it to be
           sent to their future self at a specified date and time."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10 justify-center ">
        <div className="flex max-w-[980px] flex-col items-center  text-center gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Preserving memories     <br className="hidden sm:inline" />for the future.
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl  ">
            create a video message for your future self to be delivered at a chosen date and time.
          </p>
        </div>


      </section>
      <section className="container grid  items-center gap-6 pt-6 pb-8 md:py-10 justify-center ">
        <Link href={"/recording"}>

          <Button type="button" className="mt-5"  >
            Record a message
          </Button>
        </Link>

      </section>
    </Layout>
  )
}
