import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type BackgroundImageProps = {
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  variant?: 'default' | 'dark' | 'light' | 'primary';
  height?: 'full' | 'half' | 'third' | 'quarter';
  imageClassName?: string;
};

export function BackgroundImage({
  children,
  className,
  overlay = true,
  variant = 'default',
  height = 'half',
  imageClassName,
}: BackgroundImageProps) {
  const heightClasses = {
    full: 'h-screen',
    half: 'h-[50vh]',
    third: 'h-[33vh]',
    quarter: 'h-[25vh]',
  };

  const variantClasses = {
    default: 'bg-background/80',
    dark: 'bg-background/90',
    light: 'bg-background/40',
    primary: 'bg-primary/20',
  };

  const filterClasses = {
    default: 'brightness-[0.9] contrast-[1.1]',
    dark: 'brightness-[0.5] contrast-[1.2]',
    light: 'brightness-[1.1] contrast-[1.05] saturate-[0.9]',
    primary: 'brightness-[0.9] contrast-[1.1] hue-rotate-[345deg]',
  };

  return (
    <div className={cn('relative overflow-hidden', heightClasses[height], className)}>
      <Image
        src="/architectural-background.jpg"
        alt=""
        fill
        priority
        className={cn(
          'object-cover object-center scale-105 select-none z-0',
          filterClasses[variant],
          imageClassName
        )}
        style={{ 
          filter: `blur(0.5px) ${variant === 'dark' ? 'grayscale(30%)' : ''}` 
        }}
      />
      
      {overlay && (
        <div 
          className={cn(
            'absolute inset-0 z-10',
            variantClasses[variant]
          )}
        />
      )}
      
      {children && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-full max-w-7xl px-5 py-16">
            {children}
          </div>
        </div>
      )}
    </div>
  );
} 