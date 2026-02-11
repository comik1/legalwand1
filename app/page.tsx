import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to sign-in as the entry point
  redirect("/sign-in")
}
