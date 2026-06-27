import Link from "next/link";
import { Container, Icon } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <div className="font-serif text-6xl text-txsn-mint font-medium mb-3">404</div>
      <h1 className="font-serif text-2xl text-txsn-teal-deep font-medium mb-2">Page not found</h1>
      <p className="text-[14px] text-txsn-slate mb-6">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/" className="inline-flex items-center gap-2 bg-txsn-teal text-white text-[14px] font-medium px-5 py-3 rounded-md hover:bg-txsn-teal-mid transition-colors">
        Back home <Icon name="arrow" size={16} />
      </Link>
    </Container>
  );
}
