import type { ReactNode } from "react";

type ContentShellProps = {
  children: ReactNode;
  maxWidthClassName?: string;
  paddingClassName?: string;
};

export function ContentShell({
  children,
  maxWidthClassName = "max-w-4xl",
  paddingClassName = "py-24",
}: ContentShellProps) {
  return (
    <div className="container relative">
      <section className={paddingClassName}>
        <div className={`mx-auto ${maxWidthClassName}`}>{children}</div>
      </section>
    </div>
  );
}
