"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader, Container, Icon } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";

export default function MemberPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <Container className="py-24 text-center">
        <p className="text-[14px] text-txsn-slate">Loading...</p>
      </Container>
    );
  }

  if (!user) return null;

  const name = (user.user_metadata?.full_name as string) || user.email;

  return (
    <>
      <PageHeader eyebrow="MEMBER AREA" title="Your account" />
      <Container className="py-14">
        <div className="max-w-xl">
          <div className="bg-txsn-wash rounded-xl p-7 mb-5">
            <div className="w-12 h-12 rounded-full bg-txsn-teal flex items-center justify-center text-white mb-3">
              <Icon name="users" size={22} />
            </div>
            <h2 className="font-serif text-xl text-txsn-teal-deep font-medium mb-1">
              Welcome, {name}
            </h2>
            <p className="text-[14px] text-txsn-slate">
              You&apos;re signed in to your TxSN member account.
            </p>
          </div>

          <div className="bg-white border border-txsn-mint-soft/50 rounded-xl p-6 mb-5">
            <h3 className="text-[14px] font-medium text-txsn-teal-deep mb-3">Account details</h3>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-txsn-slate">Email</span>
                <span className="text-txsn-teal-deep font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-txsn-slate">Member since</span>
                <span className="text-txsn-teal-deep font-medium">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => signOut().then(() => router.push("/"))}
            className="inline-flex items-center gap-2 border border-txsn-mint text-txsn-teal text-[14px] font-medium px-5 py-2.5 rounded-md hover:bg-txsn-wash transition-colors"
          >
            Sign out
          </button>
        </div>
      </Container>
    </>
  );
}
