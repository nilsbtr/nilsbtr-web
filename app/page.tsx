import { BackgroundPattern } from "@/components/social/BackgroundPattern";
import { SocialHeader } from "@/components/social/SocialHeader";
import { SocialLinkCard } from "@/components/social/SocialLinkCard";
import { socialLinks } from "@/content/socialLinks";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: siteConfig.socialProfiles,
    description: siteConfig.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="bg-theme-canvas text-theme-ink selection:bg-theme-ink selection:text-theme-canvas relative min-h-screen overflow-hidden p-4 font-sans sm:p-8 md:p-12 lg:p-24">
        <BackgroundPattern />
        <div className="relative z-10 mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center">
          <SocialHeader />
          <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {socialLinks.map((link) => (
              <SocialLinkCard key={link.id} link={link} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
