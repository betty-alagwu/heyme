import { Layout } from "@/components/layout"
import { NextSeo } from 'next-seo'

export default function BillingPage() {
  return (
    <Layout>
      <NextSeo title="Billing - Heyme" />
      <section className="gap-6 pt-6 pb-2 md:pt-10">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter">
          billing
        </h1>
      </section>
    </Layout>
  )
}
