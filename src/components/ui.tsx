import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-base text-brand md:text-2xl ${className}`}>{children}</p>;
}

export function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag className={`font-display text-[28px] leading-tight ${className}`}>
      {children}
    </Tag>
  );
}

export function ArrowLink({
  href,
  children,
  className = "text-brand",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 text-lg font-medium md:text-[22px] ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="icon-[akar-icons--arrow-up-right] size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export function OutlineButton({
  children,
  href,
  onClick,
  className = "px-14",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const classes = `inline-flex h-12 items-center justify-center rounded-full border border-brand text-lg font-medium text-brand transition-colors hover:bg-brand hover:text-white md:text-xl ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function ResponsibleLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-center text-[10px] leading-snug md:text-[13px] ${className}`}>
      18+ | Play responsibly | Stodlinjen.se | Spelpaus.se
    </p>
  );
}
