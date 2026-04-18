import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SOCIALS } from "@/config/socials";
import { HOME_HIGHLIGHTS } from "@/config/tech-stack";

const INLINE_LINK_CLASS =
  "text-foreground underline decoration-1 decoration-foreground/30 underline-offset-4 transition-all duration-300 ease-out hover:text-primary hover:decoration-primary hover:underline-offset-[7px]";

const MARK_LINK_CLASS =
  "inline-flex items-center justify-center text-muted-foreground/85 transition-all duration-300 ease-out hover:scale-110 hover:text-primary focus-visible:rounded-sm focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/60 motion-reduce:transition-none motion-reduce:hover:scale-100";

const CATEGORY_LABEL_CLASS =
  "mb-4 text-[10px] font-medium tracking-[0.28em] text-muted-foreground/55 uppercase";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 pt-24 pb-20">
      <p
        className="animate-in font-serif text-lg leading-none font-light text-muted-foreground italic duration-700 fade-in-0 slide-in-from-bottom-1 sm:text-xl"
        style={{ animationFillMode: "backwards" }}
      >
        Hi, I&apos;m
      </p>

      <h1
        className="my-10 animate-in font-cursive text-[clamp(5rem,16vw,9.5rem)] leading-[0.9] text-foreground duration-1000 fade-in-0 slide-in-from-bottom-2 sm:my-12"
        style={{ animationDelay: "220ms", animationFillMode: "backwards" }}
      >
        Nils<span className="text-primary">.</span>
        <span className="sr-only"> Böttcher — a developer from Germany</span>
      </h1>

      <div className="flex flex-col gap-5 text-[0.9375rem] leading-[1.75] text-pretty text-muted-foreground sm:text-base">
        <p
          className="animate-in duration-700 fade-in-0 slide-in-from-bottom-2"
          style={{ animationDelay: "500ms", animationFillMode: "backwards" }}
        >
          A developer from Germany. I spend my days writing{" "}
          <span className="text-foreground">TypeScript</span> and{" "}
          <span className="text-foreground">Go</span>, training at the gym, listening to music, and
          fussing over the small details that make software feel considered.
        </p>

        <p
          className="animate-in duration-700 fade-in-0 slide-in-from-bottom-2"
          style={{ animationDelay: "660ms", animationFillMode: "backwards" }}
        >
          The rest of the site goes a little deeper —{" "}
          <Link href="/stack" className={INLINE_LINK_CLASS}>
            what I build with
          </Link>
          , or{" "}
          <Link href="/social" className={INLINE_LINK_CLASS}>
            where else to find me
          </Link>
          . Say hi any time.
        </p>
      </div>

      <TooltipProvider delay={250} closeDelay={100}>
        <div
          className="mt-12 animate-in duration-700 fade-in-0"
          style={{ animationDelay: "820ms", animationFillMode: "backwards" }}
        >
          <p className={CATEGORY_LABEL_CLASS}>Stack</p>
          <ul
            aria-label="What I build with"
            className="flex max-w-80 flex-wrap items-center gap-x-6 gap-y-4 sm:max-w-none sm:gap-y-3"
          >
            {HOME_HIGHLIGHTS.map((tech) => {
              const mark = tech.marks?.[0];
              if (!mark) return null;
              const Mark = mark.Component;
              const iconNode = <Mark aria-hidden="true" className="size-5" title={tech.name} />;
              const trigger = tech.href ? (
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tech.name}
                  className={MARK_LINK_CLASS}
                >
                  {iconNode}
                </a>
              ) : (
                <span aria-label={tech.name} className={MARK_LINK_CLASS}>
                  {iconNode}
                </span>
              );
              return (
                <li key={tech.id} className="flex">
                  <Tooltip>
                    <TooltipTrigger render={trigger} />
                    <TooltipContent sideOffset={8}>{tech.name}</TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="mt-8 animate-in duration-700 fade-in-0"
          style={{ animationDelay: "960ms", animationFillMode: "backwards" }}
        >
          <p className={CATEGORY_LABEL_CLASS}>Socials</p>
          <ul aria-label="Where to find me" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {SOCIALS.map((social) => (
              <li key={social.name} className="flex">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={MARK_LINK_CLASS}
                      >
                        <HugeiconsIcon icon={social.icon} strokeWidth={1.5} className="size-5" />
                      </a>
                    }
                  />
                  <TooltipContent sideOffset={8}>{social.name}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </TooltipProvider>
    </div>
  );
}
