import React, { ReactElement } from "react";
const electron = (window as any).require("electron");

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
        const link = (e.target as any).href;
        electron.shell.openExternal(link);
      }}
    >
      {children}
    </a>
  );
}
