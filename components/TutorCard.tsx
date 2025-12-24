import Image from "next/image";
import Badge from "./Badge";
import { Accordion } from "./Accordion";

export type Tutor = {
  slug: string;
  name: string;
  role: string;
  subjects: string;
  highlights: string[];
  bio: string[];
  image: string;
};

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="relative h-24 w-24 overflow-hidden rounded-3xl ring-1 ring-white/10 md:h-28 md:w-28">
          <Image src={tutor.image} alt={tutor.name} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight">{tutor.name}</h3>
            <span className="text-sm text-white/60">•</span>
            <span className="text-sm text-white/70">{tutor.role}</span>
          </div>
          <div className="mt-2 text-sm text-white/65">{tutor.subjects}</div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tutor.highlights.map((h) => (
              <Badge key={h}>{h}</Badge>
            ))}
          </div>

          <div className="mt-6">
            <Accordion
              items={[
                {
                  id: tutor.slug,
                  title: "Read full profile",
                  content: (
                    <div className="space-y-3">
                      {tutor.bio.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
