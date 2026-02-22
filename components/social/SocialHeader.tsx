export function SocialHeader() {
  return (
    <header className="border-theme-stroke mb-16 flex w-full flex-col items-center justify-between gap-8 border-b-8 pb-8 md:flex-row">
      <h1 className="border-theme-stroke bg-theme-surface border-4 px-6 py-2 text-center text-6xl font-black tracking-tight uppercase shadow-[8px_8px_0_rgba(0,0,0,1)] sm:text-7xl md:text-left md:text-8xl">
        Nils Btr.
      </h1>
      <div className="border-theme-stroke bg-theme-surface flex -rotate-2 border-4 px-6 py-2 shadow-[4px_4px_0_rgba(0,0,0,1)]">
        <span className="font-mono text-xl font-bold uppercase">Connect</span>
      </div>
    </header>
  );
}
