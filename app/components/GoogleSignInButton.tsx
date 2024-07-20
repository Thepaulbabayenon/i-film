"use client";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleIcon from "../../public/google.svg"

export default function GoogleSignInButton() {
    return (
        <Button
        variant="outline"
        size="icon"
        onClick={() => signIn("google")}
        >
        <Image 
        src={GoogleIcon}
        alt="Google Icon"
        className="w-6 h-6"
        >
        </Image>
        </Button>
    )
}
