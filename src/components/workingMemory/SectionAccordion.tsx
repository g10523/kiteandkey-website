import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionAccordionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SectionAccordion({ title, subtitle, children, defaultOpen = false }: SectionAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="wm-accordion">
      <button className="wm-accordion-head" onClick={() => setOpen((v) => !v)}>
        <div>
          <h4>{title}</h4>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="wm-accordion-body">{children}</div>}
    </section>
  );
}
