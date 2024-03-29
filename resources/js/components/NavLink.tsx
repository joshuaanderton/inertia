import React, { PropsWithChildren } from 'react'
import { Link } from '.'
import { NavLink as NavLinkProps } from '../types'

export function NavLink({ active, children, ...props }: PropsWithChildren<NavLinkProps>) {

  if (typeof active === 'undefined') {
    if (route && route().current(href)) {
      active = true
    } else {
      active = false
    }
  }

  return (
    <Link
      href={href}
      className={
        active
          ? 'inline-flex items-center px-1 pt-1 border-b-2 border-theme-400 text-sm font-medium leading-5 text-chrome-900 focus:outline-none focus:border-theme-700 transition duration-150 ease-in-out'
          : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-chrome-500 hover:text-chrome-700 hover:border-chrome-300 focus:outline-none focus:text-chrome-700 focus:border-chrome-300 transition duration-150 ease-in-out'
      }
      {...props}
    >
      {children}
    </Link>
  )
}
