"use client";
import React from 'react'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle';
import Link from 'next/link';
import { cn } from "@/lib/utils"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



function Nav() {
  
    return (
      <header className='m-5'>
          <ul className='flex items-center justify-between'>
          <li className='animate-fade-in-left-to-right'> 
            <Link href={'/'} legacyBehavior passHref>
              <div className="flex items-center">
                {/* <Image
                  src={logoSrc}
                  width={70}
                  height={70}
                  alt="Logo"
                /> */}
                <span className="ml-5 text-4xl font-bold">Shotota</span>
              </div>
            </Link>
          </li>
          <li className='animate-fade-in-right-to-left'>
            <NavigationMenu>
              <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuLink>
                      <ModeToggle/>
                    </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </li>
          </ul>
      </header>
    )
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Nav