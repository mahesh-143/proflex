import Link from "next/link"
import { NavLinks } from "@/constant"
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {NavLinks.map((navlink) => {
        return (
          <Link
            key={navlink.key}
            href={navlink.href}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {navlink.text}
          </Link>
        )
      })}
    </nav>
  )
}
