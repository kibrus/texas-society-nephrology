"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EmptySpace, PageHeader, Container, Icon } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function MemberResourcesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-txsn-slate text-[14px]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <Icon name="briefcase" size={36} className="text-txsn-mint mx-auto mb-4" />
          <h2 className="font-serif text-[1.5rem] text-txsn-teal-deep font-medium mb-2">
            Members Only
          </h2>
          <p className="text-[13.5px] text-txsn-slate mb-5">
            You need to be signed in to access member resources.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[13px] font-medium px-5 py-2.5 rounded-md transition-colors"
            >
              Sign in
            </Link>
            <a
              href="http://localhost:3001/sign-up"
              className="inline-flex items-center gap-2 border border-txsn-mint text-txsn-teal text-[13px] font-medium px-5 py-2.5 rounded-md hover:bg-txsn-wash transition-colors"
            >
              Join TxSN
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="RESOURCES" title="Member Resources" />
      <Container className="py-12">
        <EmptySpace />
      </Container>
    </>
  );
}
