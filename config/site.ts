import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: "hey Me",
  description:
    "This project  allows users to create a video message and schedule it to be sent to their future self at a specified date and time.",
  mainNav: [
    {
      title: "",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/bettyalagwu",
    github: "https://github.com/betty-alagwu"
  },
}
