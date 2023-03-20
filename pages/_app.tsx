import type { AppProps } from "next/app"
import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "next-themes"
import { Analytics } from '@vercel/analytics/react'
import { H } from 'highlight.run'
import "@/styles/globals.css"
import Head from "next/head"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
})

H.init('4d7zk0eo')

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  )
}
