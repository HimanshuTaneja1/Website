import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BookingFlow } from "./BookingFlow";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = buildMetadata({
  title: "Book a consult",
  description:
    "Fill a one-minute intake and book a 30-minute strategy call. You walk in with ambiguity, you walk out with the first three bets.",
  path: "/book",
});

export default function BookPage() {
  return (
    <section className="pt-[12vh] pb-14">
      <div className="wrap">
        <SectionHeader
          eyebrow="Book"
          title={
            <>
              Thirty minutes. <span className="text-[color:var(--ink-dim)]">Enough to know if there&apos;s a fit.</span>
            </>
          }
          kicker="Drop a few details so I can show up prepared. Your calendar unlocks on the right as soon as the form is submitted."
        />
        <div className="mt-9">
          <BookingFlow />
        </div>
      </div>
    </section>
  );
}
