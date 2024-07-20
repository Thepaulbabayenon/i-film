'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserNav() {
    const { data: session } = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                variant="ghost"
                className="relative h-10 w-10 rounded-sm" >
                    <Avatar className="h-10 w-10 rounded-sm">
                    <AvatarImage src={session?.user?.image && session?.user?.image !== null ? session?.user?.image : ''}/>
                        <AvatarFallback className="rounded-sm">
                            {session?.user?.name?.[0] ?? 'U'}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <Link href="/home/user">
                        <p className="text-sm font-medium leading-none">
                            {session?.user?.name ?? 'User Name'}
                        </p>
                        </Link>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session?.user?.email ?? 'user@example.com'}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>            
        </DropdownMenu>
    );
}
