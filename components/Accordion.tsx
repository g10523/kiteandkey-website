"use client";

import React from "react";

export function Accordion({
  items
}: {
  items: { id: string; title: string; content: React.ReactNode }[];
}) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((it) => {
        const open = it.id === openId;
        return (
          <div key={it.id} className="glass rounded-3xl p-5">
            <button
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenId(open ? null : it.id)}
              type="button"
            >
              <div className="text-sm font-medium">{it.title}</div>
              <div className="text-white/60">{open ? "−" : "+"}</div>
            </button>
            {open ? <div className="mt-4 text-sm text-white/70 leading-relaxed">{it.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
