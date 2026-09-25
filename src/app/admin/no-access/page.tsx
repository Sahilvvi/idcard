import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { AuthShell } from "@/components/admin/AuthShell";

export default function NoAccessPage() {
  return (
    <AuthShell
      title="No admin access"
      sub="This account is signed in but is not registered for the iDM console. Sign out and create an account from the sign-up page."
      footer={
        <Link href="/" className="font-semibold text-brand hover:underline">
          Back to website
        </Link>
      }
    >
      <form action={signOut}>
        <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-navy text-[14.5px] font-semibold text-white hover:bg-navy-soft">
          Sign out
        </button>
      </form>
    </AuthShell>
  );
}
