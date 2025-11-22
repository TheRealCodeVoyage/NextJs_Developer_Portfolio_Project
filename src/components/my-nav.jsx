"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/components/ui/spinner"

export default function MyNavBar() {
    const { user, isLoading } = useUser();


    return (
        <div className="z-50 w-full flex items-center justify-center p-2 sticky top-0 bg-white dark:bg-gray-900 shadow-md">
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href={'/'}>Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Resume</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>LATEX</NavigationMenuLink>
                            <NavigationMenuLink>PDF</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href={'/projects'}>Projects</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {user &&
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href={'/projects/new'}>+</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    }
                    {
                        isLoading ? (
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Spinner />
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ) : (
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    {user ? (
                                        <a
                                            href="/auth/logout"
                                            className="button logout"
                                        >
                                            Log Out
                                        </a>
                                    ) : (
                                        <a
                                            href="/auth/login"
                                            className="button login"
                                        >
                                            Log In
                                        </a>
                                    )}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    }
                    <NavigationMenuItem>
                        {user && !isLoading &&
                            <NavigationMenuLink asChild>
                                <Link href={'/dashboard'}>{user.nickname}</Link>
                            </NavigationMenuLink>}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div >
    )
}
