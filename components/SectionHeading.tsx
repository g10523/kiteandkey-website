import Badge from "./Badge";

export default function SectionHeading({
  kicker,
  title,
  subtitle
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker ? (
        <div className="mb-4">
          <Badge>{kicker}</Badge>
        </div>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {subtitle ? <p className="mt-5 text-base text-white/70 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
