import React, { ReactElement } from "react";
import { electron } from "./electron";

export interface LinkProps {
  children: string | ReactElement<any>;
  href: string;
  className?: string;
}
export default function Link({ className, children, href }: LinkProps) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      onClick={e => {
        e.preventDefault();
        electron.shell.openExternal(href);
      }}
    >
      {children}
    </a>
  );
}
