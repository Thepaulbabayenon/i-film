import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import GithubSignInButton from "@/app/components/GithubSignInButton"
import GoogleSignInButton from "@/app/components/GoogleSignInButton"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/db/auth"
import { redirect } from "next/navigation"

export default async function SignUp() {
    const session = await getServerSession(authOptions)
   
   if (session) {
    return redirect("/home")
   }
   
    return (
        <div className="mt-24 rounded bg-black/60
        py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
            <form method="post" action="/api/auth/signin">
                <h1 className="text-3xl font-semibold text-white">
                    Sign-up
                    <div className="space-y-4 mt-5">
                        <Input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        className="bg-[#333] placeholder:text-gray-500 w-full inline-block"
                        />
                        <Button 
                        type="submit"
                        className="w-full bg-gray-500"
                        variant="ghost">
                            Sign-up
                        </Button>
                    </div>
                </h1>
            </form>
            <div className="text-sm text-gray-500 mt-2">
                        Already have an account? <Link 
                        className="text-white hover:underline" 
                    href="/sign-in">Sign-in now!</Link> 
                </div>
          <div className="flex w-full justify-center items-center gap-x-3 mt-6">
          <GithubSignInButton />
          <GoogleSignInButton />
             </div>
          </div>
    )
}