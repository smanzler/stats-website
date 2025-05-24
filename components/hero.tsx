import RocketLeagueLogo from "./rocket-league-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <RocketLeagueLogo className="w-32 h-32" />
      <h1 className="sr-only">Rocket League Stats</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The best way to track your Rocket League stats.
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
