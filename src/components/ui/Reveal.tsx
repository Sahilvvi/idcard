"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
};

export function Reveal({ children, className = "", style, delay = 0, y = 24, x = 0, scale = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const inline: CSSProperties = {
    ...style,
    transitionDelay: `${delay}ms`,
    transform: visible ? "none" : `translate(${x}px, ${y}px) scale(${scale})`,
  };

  return (
    <div ref={ref} className={`opacity-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${visible ? "!opacity-100" : ""} ${className}`} style={inline}>
      {children}
    </div>
  );
}
