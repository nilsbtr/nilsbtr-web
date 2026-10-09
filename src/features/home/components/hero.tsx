import { Reveal, RevealItem, WriteOn } from "@/components/motion";

/** Greeting and handwritten name. Must be rendered inside a RevealGroup. */
export function Hero() {
  return (
    <>
      <RevealItem
        as="p"
        className="font-serif text-lg leading-none font-light text-muted-foreground italic sm:text-xl"
      >
        Hi, I&apos;m
      </RevealItem>

      <h1 className="my-10 font-cursive text-[clamp(5rem,16vw,9.5rem)] leading-[0.9] text-foreground sm:my-12">
        <WriteOn delay={0.25}>Nils</WriteOn>
        <Reveal as="span" variant="pop" delay={1.15} className="inline-block text-primary">
          .
        </Reveal>
        <span className="sr-only"> Böttcher — a developer from Germany</span>
      </h1>
    </>
  );
}
