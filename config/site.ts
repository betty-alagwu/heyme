import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    // docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Hey Me",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/bettyalagwu",
    github: "https://github.com/betty-alagwu",
    // docs: "https://ui.shadcn.com",
  },
}
