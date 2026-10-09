import { Reveal, WriteOn, writeOnDuration } from "@/components/motion";

import { HeroRipple } from "./hero-ripple";

const NAME = "Nils";

/*
 * The hero plays its own short sequence: the greeting, then the name written
 * out, then the full stop landing as the pen lifts.
 */
const NAME_DELAY = 0.2;
const DOT_DELAY = NAME_DELAY + writeOnDuration(NAME) - 0.15;

/** Seconds after which the rest of the page may follow: as the last letter is finishing. */
export const HERO_LEAD = NAME_DELAY + writeOnDuration(NAME) - 0.15;

/** Greeting and handwritten name. */
export function Hero() {
  return (
    <>
      <Reveal
        as="p"
        className="font-serif text-lg leading-none font-light text-muted-foreground italic sm:text-xl"
      >
        Hi, I&apos;m
      </Reveal>

      <h1 className="my-10 font-cursive text-[clamp(5rem,16vw,9.5rem)] leading-[0.9] text-foreground sm:my-12">
        <WriteOn text={NAME} delay={NAME_DELAY} />
        <span aria-hidden="true" className="relative inline-block">
          <Reveal as="span" variant="pop" delay={DOT_DELAY} className="inline-block text-primary">
            .
          </Reveal>
          <HeroRipple delay={DOT_DELAY + 0.08} />
        </span>
        <span className="sr-only"> Böttcher, a developer from Germany</span>
      </h1>
    </>
  );
}
