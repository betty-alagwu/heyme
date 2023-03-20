/** @type {import('next').NextConfig} */
import { withHighlightConfig } from '@highlight-run/next'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },
  images: {
    domains: ["www.refactoringui.com", "twitter.com", "pbs.twimg.com"],
  },
}

export default withHighlightConfig(nextConfig)
