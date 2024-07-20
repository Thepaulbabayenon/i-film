import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../db/auth";
import { redirect } from "next/navigation";


import Footer from "../components/Footer";
import Vertical from "@/components/navbar/vertical";
import Navbar from "../components/Navbar";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <>
     <Vertical />
      <main className="w-full max-w-10xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
     <Footer />
    </>
  );
}