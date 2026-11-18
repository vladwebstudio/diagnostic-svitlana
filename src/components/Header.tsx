import { config } from "../config";
import Photo from "./Photo";
import CasesLink from "./CasesLink";

export default function Header() {
  const { expert } = config;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-3">
          <Photo
            src={expert.photo}
            alt={expert.name}
            initials={expert.initials}
            className="h-9 w-9 rounded-full bg-white object-top text-xs ring-1 ring-line"
          />
          <span className="font-display text-xl font-semibold leading-none tracking-tight">{expert.name}</span>
        </div>

        <div className="flex items-center gap-5">
        <CasesLink />
        </div>
      </div>
    </header>
  );
}
