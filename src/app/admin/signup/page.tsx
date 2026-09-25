import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/admin/AuthForm";
import { AuthShell } from "@/components/admin/AuthShell";
import { isSignupOpen } from "@/lib/cms";

export const metadata: Metadata = { title: "Create account" };
export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const open = await isSignupOpen();

  if (!open) {
    return (
      <AuthShell
        title="Admin signup is closed"
        sub="An admin account already exists for this site. Ask the owner to add you, or sign in if you already have access."
        footer={
          <>
            Have an account?{" "}
            <Link href="/admin/login" className="font-semibold text-brand hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <Link
          href="/admin/login"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[14.5px] font-semibold text-white shadow-[0_16px_30px_-14px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep"
        >
          Go to sign in <span aria-hidden>→</span>
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your admin account"
      sub="Set up the owner account for the iDM content console. Signup closes automatically once this account exists."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/admin/login" className="font-semibold text-brand hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <Suspense>
        <AuthForm mode="signup" />
      </Suspense>
    </AuthShell>
  );
}
