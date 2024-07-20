import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./db/auth";


export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
      return redirect("/sign-in");
  } else {
      return redirect("/home")
  }
}
