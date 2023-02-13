import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <Head />
      <body className="min-h-screen  bg-slate-100 font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
