import { Button, Card, Badge } from "@/components/ui";

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-container px-2 py-10 lg:px-3">
      <div className="mb-10 border-b border-hairline-subtle pb-5">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-text">
          Architect Dark Design System
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Internal reference based on Stitch generation. Not deployed to production.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-muted">
          Colors
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Background", class: "bg-bg" },
            { label: "Card", class: "bg-bg-card" },
            { label: "Border", class: "bg-[#374151]" },
            { label: "Text Primary", class: "bg-text" },
            { label: "Text Muted", class: "bg-text-muted" },
            { label: "Accent", class: "bg-accent" },
            { label: "Accent Hover", class: "bg-accent-hover" },
          ].map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-1">
              <div className={`h-10 w-10 rounded-soft border-hairline-subtle ${c.class}`} />
              <span className="text-[10px] text-text-muted">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-muted">
          Typography (Inter)
        </h2>
        <div className="space-y-4 border-l border-hairline-subtle pl-4">
          <div>
            <p className="text-[10px] text-text-muted">Display Lg — 48px, 800, line-height 1.1, tracking -0.02em</p>
            <p className="font-heading text-[48px] font-extrabold leading-[1.1] tracking-[-0.02em] text-text">
              Build on the cloud
            </p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Headline Lg — 32px, 700, line-height 1.2, tracking -0.01em</p>
            <p className="font-heading text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-text">
              Learning Tracks
            </p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Title Md — 20px, 600, line-height 1.4</p>
            <p className="font-heading text-[20px] font-semibold leading-[1.4] text-text">
              Cloud Foundations
            </p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Body Lg — 18px, 400, line-height 1.6</p>
            <p className="max-w-lg text-[18px] font-normal leading-[1.6] text-text">
              The AWS Student Builder Group at HBTU Kanpur is a community of students who learn cloud computing together.
            </p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Label Sm — 14px, 500, line-height 1, tracking 0.05em</p>
            <p className="text-[14px] font-medium leading-none tracking-[0.05em] text-text-muted uppercase">
              AWS Service Tag
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-muted">
          Components
        </h2>
        
        <div className="mb-6">
          <p className="mb-2 text-xs text-text-muted">Buttons</p>
          <div className="flex gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-xs text-text-muted">Badges</p>
          <div className="flex gap-4">
            <Badge variant="default">Lambda</Badge>
            <Badge variant="accent">Highlighted</Badge>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-text-muted">Cards</p>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="font-heading text-[20px] font-semibold">Card Title</h3>
              <p className="mt-2 text-[16px] text-text-muted">
                Cards feature a flat background, hairline borders, and no box shadows.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
