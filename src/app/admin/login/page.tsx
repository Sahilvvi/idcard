import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/admin/AuthForm";
import { AuthShell } from "@/components/admin/AuthShell";
import { isSignupOpen } from "@/lib/cms";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const signupOpen = await isSignupOpen();
  return (
    <AuthShell
      title="Welcome back"
      sub="Sign in to manage articles, pages and leads."
      footer={
        signupOpen ? (
          <>
            Setting up the console?{" "}
            <Link href="/admin/signup" className="font-semibold text-brand hover:underline">
              Create the owner account
            </Link>
          </>
        ) : (
          <>Access is by invitation from the site owner.</>
        )
      }
    >
      <Suspense>
        <AuthForm mode="login" />
      </Suspense>
    </AuthShell>
  );
}
