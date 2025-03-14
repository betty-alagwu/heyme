import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: Rs
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="px-6 md:px-4">{children}</main>
    </>
  )
}
