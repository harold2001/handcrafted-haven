import React from 'react';

interface Props {
  children: React.ReactNode;
  top?: boolean;
  className?: string;
  gap?: string;
}

export default function CenteredSection({
  children,
  top = false,
  className,
  gap,
}: Props) {
  const justify = top ? '' : 'justify-center';
  const gapValue = gap ?? 'gap-8';

  return (
    <section
      className={`flex flex-col ${gapValue} items-center min-h-[calc(100vh_-_70px)] max-w-[800px] max-h-[1200px] m-auto p-4 ${justify} ${className}`}
    >
      {children}
    </section>
  );
}
