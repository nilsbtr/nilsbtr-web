import { RevealItem } from "@/components/motion";
import { TextLink } from "@/components/shared/text-link";

/** Short bio with links into the rest of the site. Must be rendered inside a RevealGroup. */
export function Intro() {
  return (
    <div className="flex flex-col gap-5 text-[0.9375rem] leading-[1.75] text-pretty text-muted-foreground sm:text-base">
      <RevealItem as="p">
        A developer from Germany. I spend my days writing{" "}
        <span className="text-foreground">TypeScript</span> and{" "}
        <span className="text-foreground">Go</span>, training at the gym, listening to music, and
        fussing over the small details that make software feel considered.
      </RevealItem>

      <RevealItem as="p">
        The rest of the site goes a little deeper —{" "}
        <TextLink href="/stack">what I build with</TextLink>, or{" "}
        <TextLink href="/social">where else to find me</TextLink>. Say hi any time.
      </RevealItem>
    </div>
  );
}
