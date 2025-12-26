import { Layout } from "@/components/layout"
import { NextSeo } from 'next-seo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const seoOptions = {
  url: 'https://heyme.io/faq',
  name: 'Heyme',
  image: 'https://res.cloudinary.com/dq5e0bbl8/image/upload/v1678431588/websites-production/heyme-social-preview-card.png',
}

const faqItems = [
  {
    id: "item-1",
    question: "How do I record a video message?",
    answer: "To record a video message, click the 'Record a message' button on the homepage. You'll be prompted to allow camera and microphone access. Once granted, you can start recording by clicking the record button. You can record up to 5 minutes of video. If your browser doesn't support recording, you can also upload a pre-recorded video file."
  },
  {
    id: "item-2",
    question: "How does scheduling work for future delivery?",
    answer: "After recording or uploading your video, you'll be asked to specify a delivery date and the recipient's email address. On the scheduled date, the recipient will receive an email with a link to watch your video message. You can schedule messages days, months, or even years into the future."
  },
  {
    id: "item-3",
    question: "What browsers are supported?",
    answer: "Heyme works best on modern browsers like Chrome, Firefox, Safari, and Edge. For the best recording experience, we recommend using Chrome or Firefox on desktop. On iOS devices, you may need to upload a pre-recorded video instead of recording directly in the browser due to platform limitations."
  },
  {
    id: "item-4",
    question: "How is my data stored and what about privacy?",
    answer: "Your videos are securely stored on Cloudinary's cloud infrastructure. We only collect the email addresses necessary for delivering your messages. Your videos are private and can only be accessed through the unique link sent to the recipient. We do not share your data with third parties."
  },
  {
    id: "item-5",
    question: "How can I share Heyme with others?",
    answer: "You can share Heyme by sending friends and family the link to our website at heyme.io. You can also follow us on Twitter @bettyalagwu for updates and share our posts. If you'd like to see how the project is built, check out our GitHub repository linked in the navigation."
  },
]

export default function FAQPage() {
  return (
    <Layout>
      <NextSeo
        title='FAQ - Heyme'
        description="Frequently asked questions about Heyme - Learn how to record video messages, schedule deliveries, supported browsers, privacy information, and more."
        openGraph={{
          images: [{
            url: seoOptions.image
          }],
          siteName: seoOptions.name
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: seoOptions.url,
          handle: '@bettyalagwu'
        }}
      />
      <section className="gap-6 pt-6 pb-2 md:pt-10">
        <div className="flex md:max-w-4xl mx-auto flex-col items-center text-center gap-2">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl mt-20">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl text-slate-700 dark:text-slate-400 text-base md:text-xl px-0 text-center">
            Find answers to common questions about using Heyme to send video messages to the future.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto mt-10 mb-20">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-400">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Layout>
  )
}
