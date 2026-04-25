"use client";

import { useEffect, useState, cloneElement, isValidElement, Children } from "react";
import { PopupModal } from "react-calendly";
import { site } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  prefill?: { name?: string; email?: string };
};

export function CalendlyPopup({ children, prefill }: Props) {
  const [open, setOpen] = useState(false);
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootEl(document.body);
  }, []);

  const triggers = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const childProps = (child.props as any) ?? {};
    return cloneElement(child as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        childProps.onClick?.(e);
        setOpen(true);
      },
    });
  });

  return (
    <>
      {triggers}
      {rootEl && (
        <PopupModal
          url={site.calendlyUrl}
          onModalClose={() => setOpen(false)}
          open={open}
          rootElement={rootEl}
          prefill={prefill}
          pageSettings={{
            backgroundColor: "0b0d13",
            primaryColor: "7c5cff",
            textColor: "e7e9ee",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
          }}
        />
      )}
    </>
  );
}
