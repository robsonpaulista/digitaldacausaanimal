import type { ComponentType, ReactNode } from 'react';

export interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export type IconComponent = ComponentType<IconProps>;

interface StrokeIconProps extends IconProps {
  children: ReactNode;
}

function StrokeIcon({ size = 24, strokeWidth = 2, className, children }: StrokeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function PetBowlIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 12.5h18l-1.7 5.3a2 2 0 0 1-1.9 1.4H6.6a2 2 0 0 1-1.9-1.4z" />
      <path d="M6.5 12.5a5.5 3.6 0 0 1 11 0" />
      <path d="M10 6.5h.01" />
      <path d="M13.5 5h.01" />
      <path d="M15 7.8h.01" />
    </StrokeIcon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </StrokeIcon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0" />
      <path d="M16.5 7.5v.01" />
    </StrokeIcon>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7" />
    </StrokeIcon>
  );
}

interface PawShapeProps {
  className?: string;
}

export function PawShape({ className }: PawShapeProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="currentColor">
      <ellipse cx="14" cy="26" rx="6" ry="8" transform="rotate(-22 14 26)" />
      <ellipse cx="25" cy="13" rx="6.2" ry="8.4" transform="rotate(-6 25 13)" />
      <ellipse cx="39" cy="13" rx="6.2" ry="8.4" transform="rotate(6 39 13)" />
      <ellipse cx="50" cy="26" rx="6" ry="8" transform="rotate(22 50 26)" />
      <path d="M32 31c-8.5 0-17 10-17 18 0 6 5 9 10 7.6 3-.8 4.6-1.9 7-1.9s4 1.1 7 1.9c5 1.4 10-1.6 10-7.6 0-8-8.5-18-17-18z" />
    </svg>
  );
}

interface DecorProps {
  className?: string;
}

export function Sparks({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M6 22 L16 26" />
      <path d="M14 6 L20 16" />
      <path d="M32 2 L30 13" />
    </svg>
  );
}

export function Scribble({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 220 18" className={className} aria-hidden="true" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <path d="M4 12C50 5 120 3 216 8" />
      <path d="M30 15c40-4 90-5 150-3" strokeWidth="3" opacity=".7" />
    </svg>
  );
}

export function BrazilFlag({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
      <rect width="28" height="20" rx="3" fill="#009c3b" />
      <path d="M14 3 25 10 14 17 3 10z" fill="#ffdf00" />
      <circle cx="14" cy="10" r="4.2" fill="#002776" />
      <path d="M10 9.2c2.6-.6 5.4-.2 7.8 1" stroke="#fff" strokeWidth="0.9" fill="none" />
    </svg>
  );
}

export function CurvedArrow({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 80 70" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 6c-6 22 4 46 52 52" />
      <path d="M50 48l13 10-15 6" />
    </svg>
  );
}
