import Link from "next/link";
import { siteConfig, navigation } from "@/lib/site";
import { TexasMark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-txsn-teal-deep text-white mt-auto">
      <div className="mx-auto max-w-content px-5 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <TexasMark size={28} color="#9FE1CB" />
              <span className="font-serif text-lg">Texas Society of Nephrology</span>
            </div>
            <p className="text-txsn-mint-soft text-[13px] leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] tracking-wide text-txsn-mint mb-3 font-medium">
              EXPLORE
            </h3>
            <ul className="space-y-2">
              {navigation.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-wide text-txsn-mint mb-3 font-medium">
              CONNECT
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-[13px] text-white/80 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-[13px] text-white/80 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-[12px] text-txsn-mint-soft">
            © {new Date().getFullYear()} Texas Society of Nephrology.
          </p>
          <p className="text-[12px] text-txsn-mint-soft">
            Serving nephrology across Texas.
          </p>
        </div>
      </div>
    </footer>
  );
}
